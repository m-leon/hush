import sodium from 'libsodium-wrappers';

import type { XChaCha20Key } from './generateKey';

export const decryptMessage = async (ciphertext: string, key: XChaCha20Key) => {
  await sodium.ready;

  // Formula {4(n) / 3} used to calculate the # of characters required to represent n bytes as base64
  // https://stackoverflow.com/questions/13378815/base64-length-calculation
  const NONCE_LENGTH = (4 * sodium.crypto_secretbox_NONCEBYTES) / 3;

  const nonce = sodium.from_base64(ciphertext.substring(0, NONCE_LENGTH));
  const cipher = sodium.from_base64(ciphertext.substring(NONCE_LENGTH));
  return sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(null, cipher, null, nonce, key, 'text');
};
