import { XChaCha20 } from 'xchacha20-js';

import type { Key } from './generateKey';

const xcha20 = new XChaCha20();

const BLOCK_COUNTER = 1;

export const decryptMessage = async (ciphertext: string, { key, nonce }: Key) => {
  try {
    const cipher = Uint8Array.from(toBytes(ciphertext));
    const clear = (await xcha20.decrypt(cipher, nonce, key, BLOCK_COUNTER)) as Uint8Array;
    return new TextDecoder().decode(clear);
  } catch {
    return '';
  }
};

function toBytes(text) {
  var result = [];
  for (var i = 0; i < text.length; i += 2) {
    result.push(parseInt(text.substr(i, 2), 16));
  }

  return result;
}
