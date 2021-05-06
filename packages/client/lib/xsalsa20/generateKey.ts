import sodium from 'libsodium-wrappers';

import { getBytes } from '@/lib/rng';

export type XSalsa20Key = ThenArg<ReturnType<typeof generateKey>>;
export type XSalsa20PublicKey = XSalsa20Key['publicKey'];
export type XSalsa20PrivateKey = XSalsa20Key['privateKey'];

export const generateKey = async (seed: string) => {
  await sodium.ready;
  const bytes = await getBytes(sodium.crypto_box_SEEDBYTES, seed);
  return sodium.crypto_box_seed_keypair(bytes);
};
