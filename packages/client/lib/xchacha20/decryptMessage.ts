import sodium from 'libsodium-wrappers';

import { hexToBytes } from '@/lib/utils';
import type { XChaCha20Key } from './generateKey';

export const decryptMessage = async (ciphertext: string, nonce: Uint8Array, key: XChaCha20Key) => {
  await sodium.ready;
  const cipher = hexToBytes(ciphertext);
  return sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(null, cipher, null, nonce, key, 'text');
};
