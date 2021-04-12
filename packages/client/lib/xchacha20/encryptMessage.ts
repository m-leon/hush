import { XChaCha20 } from 'xchacha20-js';

import { bytesToHex } from '@/lib/utils';
import type { XChaCha20Key } from './generateKey';

const xcha20 = new XChaCha20();

const BLOCK_COUNTER = 1;

export const encryptMessage = async (cleartext: string, { key, nonce }: XChaCha20Key) => {
  const clear = new TextEncoder().encode(cleartext);
  const cipher = (await xcha20.encrypt(clear, nonce, key, BLOCK_COUNTER)) as Uint8Array;
  return bytesToHex(cipher);
};
