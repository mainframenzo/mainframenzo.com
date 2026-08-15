import { ISupportedModel, TProviderId } from './iface';

export const supportedModels: ISupportedModel[] = [
  { id: 'qwen3.5-9b-llamafile', provider: 'local', aiSdkModel: 'Qwen3.5-9B-Q5_K_S', name: 'qwen - 3.5', label: 'Qwen · 3.5 · 9B', contextWindow: 'TODO', owner: 'Llamafile', env_api_key_name: 'llamafile', requiresApiKey: false }
];

export const modelProviderFormalNames: Record<TProviderId, string> = {
  local: 'Llamafile'
};

export const defaultEnabledModelId = 'qwen3.5-9b-llamafile';

export const getModelById = (id: string): ISupportedModel | undefined => {
  return supportedModels.find((model) => model.id === id);
};
