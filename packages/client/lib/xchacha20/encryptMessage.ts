import sodium from 'libsodium-wrappers';

import type { XChaCha20Key } from './generateKey';

export const encryptMessage = async (message: string, key: XChaCha20Key) => {
  await sodium.ready;
  const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
  const cipher = sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(message, null, null, nonce, key);

  return `${sodium.to_base64(nonce)}${sodium.to_base64(cipher)}`;
};
