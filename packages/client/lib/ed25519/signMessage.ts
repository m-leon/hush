import sodium from 'libsodium-wrappers';

import type { SignKeyPair } from './generateKey';

type PrivateKey = SignKeyPair['privateKey'];

export const signMessage = async (message: string, privateKey: PrivateKey) => {
  await sodium.ready;
  return sodium.crypto_sign(message, privateKey, 'base64');
};
