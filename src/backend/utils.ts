import * as crypto from 'crypto';

// Constant-time string comparison to avoid leaking timing info about how many
//  leading characters of username/password matched.
export const isEqual = (a: string, b: string): boolean => {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);

  // Pad to equal length so timingSafeEqual doesn't throw or short-circuit on length.
  const maxLength = Math.max(bufferA.length, bufferB.length);
  const paddedA = Buffer.alloc(maxLength);
  const paddedB = Buffer.alloc(maxLength);
  bufferA.copy(paddedA);
  bufferB.copy(paddedB);

  // Still compare actual lengths so "abc" !== "ab" even though padded buffers are equal length.
  return bufferA.length === bufferB.length && crypto.timingSafeEqual(paddedA, paddedB);
};
