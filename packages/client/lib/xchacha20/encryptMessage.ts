import sodium from 'libsodium-wrappers';

import type { XChaCha20Key } from './generateKey';

export const encryptMessage = async (message: string, key: XChaCha20Key) => {
  await sodium.ready;

  const publicNonce = sodium.randombytes_buf(sodium.crypto_aead_xchacha20poly1305_ietf_NPUBBYTES);
  const { ciphertext, mac } = sodium.crypto_aead_xchacha20poly1305_ietf_encrypt_detached(
    message,
    null,
    null,
    publicNonce,
    key
  );

  return `${sodium.to_base64(publicNonce)}.${sodium.to_base64(ciphertext)}.${sodium.to_base64(mac)}`;
};
