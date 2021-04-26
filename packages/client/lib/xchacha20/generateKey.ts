import { getBytes } from '@/lib/rng';

const KEY_LENGTH = 32;

export type XChaCha20Key = ThenArg<ReturnType<typeof generateKey>>;

export const generateKey = (seed: string) => {
  return getBytes(KEY_LENGTH, seed);
};
