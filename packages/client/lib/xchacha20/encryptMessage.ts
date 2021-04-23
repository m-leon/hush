import sodium from 'libsodium-wrappers';

import type { XChaCha20Key } from './generateKey';

export const encryptMessage = async (message: string, nonce: Uint8Array, key: XChaCha20Key) => {
  await sodium.ready;
  return sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(message, null, null, nonce, key, 'hex');
};
