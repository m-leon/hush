import sodium from 'libsodium-wrappers';

import { getBytes } from '@/lib/rng';

export type SignKeyPair = ThenArg<ReturnType<typeof generateKey>>;

export const generateKey = async (seed: string) => {
  await sodium.ready;
  const bytes = await getBytes(sodium.crypto_sign_SEEDBYTES, seed);
  return sodium.crypto_sign_seed_keypair(bytes);
};
