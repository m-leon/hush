import sodium from 'libsodium-wrappers';

import { RNG } from '@/lib/rng';

export type SignKeyPair = ThenArg<ReturnType<typeof generateKey>>;

export const generateKey = async (seed: string) => {
  const rng = new RNG(seed);
  await sodium.ready;
  const bytes = await rng.getBytes(sodium.crypto_sign_SEEDBYTES);
  return sodium.crypto_sign_seed_keypair(bytes);
};
