import forge from 'node-forge';

import { bytesToHex } from '@/lib/utils';
import type { Ed25519Key } from './generateKey';

const { ed25519 } = forge.pki;

export const signMessage = (message: string, { privateKey }: Ed25519Key) => {
  const signature = ed25519.sign({
    message,
    encoding: 'utf8',
    privateKey
  });

  return bytesToHex(signature);
};
