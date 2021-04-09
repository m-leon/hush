import { XChaCha20 } from 'xchacha20-js';

import type { Key } from './generateKey';

const xcha20 = new XChaCha20();

const BLOCK_COUNTER = 1;

export const encryptMessage = async (cleartext: string, { key, nonce }: Key) => {
  const clear = new TextEncoder().encode(cleartext);
  const cipher = (await xcha20.encrypt(clear, nonce, key, BLOCK_COUNTER)) as Uint8Array;
  return fromBytes(cipher);
};

var Hex = '0123456789abcdef';
function fromBytes(bytes) {
  var result = [];
  for (var i = 0; i < bytes.length; i++) {
    var v = bytes[i];
    result.push(Hex[(v & 0xf0) >> 4] + Hex[v & 0x0f]);
  }
  return result.join('');
}
