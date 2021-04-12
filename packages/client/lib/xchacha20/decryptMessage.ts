import { XChaCha20 } from 'xchacha20-js';

import { hexToBytes } from '@/lib/utils';
import type { XChaCha20Key } from './generateKey';

const xcha20 = new XChaCha20();

const BLOCK_COUNTER = 1;

export const decryptMessage = async (ciphertext: string, { key, nonce }: XChaCha20Key) => {
  const cipher = hexToBytes(ciphertext);
  const clear = (await xcha20.decrypt(cipher, nonce, key, BLOCK_COUNTER)) as Uint8Array;
  return new TextDecoder().decode(clear);
};
