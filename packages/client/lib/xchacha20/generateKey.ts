import { RNG } from '@/lib/rng';

const KEY_LENGTH = 32;
const NONCE_LENGTH = 24;

export type XChaCha20Key = ReturnType<typeof generateKey>;

export const generateKey = (seed: string) => {
  const rng = new RNG(seed);

  return {
    key: rng.getBytes(KEY_LENGTH),
    nonce: rng.getBytes(NONCE_LENGTH)
  };
};
