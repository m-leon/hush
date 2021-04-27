import sodium from 'libsodium-wrappers';

import type { XChaCha20Key } from './generateKey';

export const decryptMessage = async (ciphertext: string, key: XChaCha20Key) => {
  await sodium.ready;

  const [nonce, cipher] = ciphertext.split('.').map((b64) => {
    return sodium.from_base64(b64);
  });

  return sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(null, cipher, null, nonce, key, 'text');
};
