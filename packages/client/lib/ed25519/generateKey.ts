import forge from 'node-forge';

import { RNG } from '@/lib/rng';

const SEED_LENGTH = 32;

const { ed25519 } = forge.pki;

export type Ed25519Key = ThenArg<ReturnType<typeof generateKey>>;

export const generateKey = async (seed: string) => {
  const rng = new RNG(seed);
  const seedBytes = await rng.getBytes(SEED_LENGTH);

  return ed25519.generateKeyPair({ seed: seedBytes });
};
