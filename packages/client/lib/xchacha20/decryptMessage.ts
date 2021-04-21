import sodium from 'libsodium-wrappers';

import type { XChaCha20Key } from './generateKey';

export const decryptMessage = async (ciphertext: string, { key, nonce }: XChaCha20Key) => {
  await sodium.ready;
  const cipher = Buffer.from(ciphertext, 'hex');
  return sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(null, cipher, null, nonce, key, 'text');
};
