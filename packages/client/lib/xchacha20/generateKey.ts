import { RNG } from '@/lib/rng';

const KEY_LENGTH = 32;

export type XChaCha20Key = ThenArg<ReturnType<typeof generateKey>>;

export const generateKey = async (seed: string) => {
  const rng = new RNG(seed);
  return rng.getBytes(KEY_LENGTH);
};
