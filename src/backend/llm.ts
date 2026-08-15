// This file is responsible for handling LLM interaction.
import { createMCPClient } from '@ai-sdk/mcp';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { Experimental_StdioMCPTransport as StdioClientTransport } from '@ai-sdk/mcp/mcp-stdio';
import { generateText, isLoopFinished, Output, stepCountIs, ToolSet } from 'ai';
import crypto from 'node:crypto';
import { z } from 'zod';

import { ISupportedModel } from './iface';
import { defaultEnabledModelId, getModelById } from './llm.model-catalogue';
import { ChildProcess, spawn } from 'node:child_process';

// Start the HTTP server that's built into the llamafile binary.
// This LLM is used by the monitor for analyzing metrics.
// Note: does not work in Docker w/ current config (not enough memory, me thinks).
export const startLlamafile = async (): Promise<ChildProcess> => {
  const llamafilePath = `${process.cwd()}/src/backend/Qwen3.5-9B-Q5_K_S.llamafile`;

  const child = spawn('sh', [
    llamafilePath,
    '--server',
    '--host', '127.0.0.1',
    '--port', '8083',
  ], {
    env: { ...process.env },
    detached: true,
    stdio: 'inherit',
  });

  return new Promise<ChildProcess>((resolve, reject) => {
    child.once('error', reject);

    setTimeout(() => {
      child.off('error', reject);

      resolve(child);
    }, 10_000);
  });
};

// Qwen models tend to need more tokens for reasoning before answering.
const maxOutputTokens = 4096;

export const analyzeMetrics = async () => {
  console.trace('analyzeMetrics');

  const sessionId = crypto.randomUUID(); // Always create a new session.

  const model = getModelById(defaultEnabledModelId);
  if (!model) { throw new Error('Invalid model!'); }
  if (!model.aiSdkModel) { throw new Error(`${model.id}: incompatible with AI SDK`); }

  const languageModelProvider = getLanguageModelProvider(model, sessionId);
  if (!languageModelProvider) { throw new Error(`${model.id}: no valid configuration`); }

  const shouldUseStructuredOutput = false; // Local models don't support structured output.

  console.debug('creating mcp client');

  const mcpClient = await createMCPClient({
    transport: new StdioClientTransport({
      command: 'npx',
      args: ['tsx', 'src/backend/monitoring.mcp.ts'],
      env: process.env as Record<string, string>,
      cwd: process.cwd()
    })
  });

  const tools = await mcpClient?.tools() as ToolSet;

  const systemPrompt = `
  You are a site reliability monitoring agent.
  `;

  const prompt = `
  You will be given raw metrics from a web service. Analyze them and escalate anything that looks "off". You're looking for:
  - Any anomalies, spikes, or drops
  - Metrics that look unhealthy or concerning
  - Any patterns worth flagging

  Use the available document tools before answering (list_metrics, get_last_hour_of_metric_values).

  Only return a JSON array that contains escalations in the format:

  {
    "escalations": [{
      "metricName": string;
      "reasonForEscalation": string;
    }]
  }

  If there are no escalations, return { "escalations": [] }
  `;

  console.debug('system prompt', systemPrompt, 'prompt', prompt);

  try {
    const result = await generateText({
      model: languageModelProvider(model.aiSdkModel),
      tools,
      stopWhen: isLoopFinished(),
      //maxOutputTokens,
      experimental_telemetry: {
        isEnabled: true,
        functionId: 'analyze_metrics',
        metadata: {
          sessionId: sessionId,
          provider: model.provider
        }
      },
      system: [
        systemPrompt,
      ].filter(Boolean).join('\n'),
      output: shouldUseStructuredOutput ? escalationsOutput : undefined,
      messages: [
        {
          role: 'user',
          content: [{ type: 'text', text: prompt }]
        }
      ]
    });
    console.debug('llm response', result);

    // Models that don't support structured output have responses that need to be parsed differently.
    const parsedOutput = parseOutput(result.output, result.text, escalationsSchema);
    console.debug('parsedOutput', parsedOutput);

    return parsedOutput.escalations;
  } catch (error) {
    console.error('llm failure', error);

    throw error;
  } finally {
    await mcpClient?.close();
  }
};

const getLanguageModelProvider = (model: ISupportedModel, sessionId?: string) => {
  let apiKey: string | undefined = undefined;

  if (getModelById(model.id)?.requiresApiKey) {
    apiKey = process.env[`${model.env_api_key_name}`];

    if (!apiKey) {
      throw new Error(`API key missing for ${model.id} - export ${model.env_api_key_name}`);
    }
  }

  const headers = sessionId ? { 'x-session-id': sessionId } : undefined;

  switch (model.provider) {
    case 'local':
      return createOpenAICompatible({
        name: 'llamafile',
        baseURL: 'http://0.0.0.0:8083/v1', //'http://127.0.0.1:8083/v1
        apiKey: 'llamafile',
        headers
      });
  }
};

const escalationsSchema = z.object({
  escalations: z.array(
    z.object({
      metricName: z.string(),
      reasonForEscalation: z.string(),
    })
  )
});

const escalationsOutput = Output.object({ schema: escalationsSchema });

const parseOutput = <T>(output: any, text: string, schema: z.ZodType<T>): T => {
  const raw =
    typeof output === 'object' &&
    output !== null &&
    'row' in output &&
    'column' in output
      ? output
      : JSON.parse(
        (
          typeof output === 'object' &&
          output !== null &&
          'content' in output &&
          typeof output.content === 'string'
            ? output.content
            : text
        ).match(/\{[\s\S]*\}/)?.[0] ??
          (
            typeof output === 'object' &&
            output !== null &&
            'content' in output &&
            typeof output.content === 'string'
              ? output.content
              : text
          )
      );

  return schema.parse(raw);
};
