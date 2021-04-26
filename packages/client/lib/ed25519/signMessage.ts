import sodium from 'libsodium-wrappers';

import type { SignKeyPair } from './generateKey';

type PrivateKey = SignKeyPair['privateKey'];

export const signMessage = async (message: string, privateKey: PrivateKey) => {
  await sodium.ready;
  const signedMessage = sodium.crypto_sign(message, privateKey);
  return sodium.to_base64(signedMessage);
};
