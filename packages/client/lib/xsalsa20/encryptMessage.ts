import sodium from 'libsodium-wrappers';

import type { XSalsa20PrivateKey, XSalsa20PublicKey } from './generateKey';

export const encryptMessage = async (message: string, privateKey: XSalsa20PrivateKey, publicKey: XSalsa20PublicKey) => {
  await sodium.ready;

  const publicNonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);
  const { ciphertext, mac } = sodium.crypto_box_detached(message, publicNonce, publicKey, privateKey);

  return `${sodium.to_base64(publicNonce)}.${sodium.to_base64(ciphertext)}.${sodium.to_base64(mac)}`;
};
