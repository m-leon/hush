import sodium from 'libsodium-wrappers';

import type { SignKeyPair } from './generateKey';

type PublicKey = SignKeyPair['publicKey'];

export const verifyMessage = async (signedMessage: string, publicKey: PublicKey) => {
  await sodium.ready;
  const signature = sodium.from_base64(signedMessage);
  return sodium.crypto_sign_open(signature, publicKey, 'text');
};
