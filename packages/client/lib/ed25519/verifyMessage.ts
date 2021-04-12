import forge from 'node-forge';

import type { Ed25519Key } from './generateKey';
import { hexToBytes } from '@/lib/utils';

const { ed25519 } = forge.pki;

export const verifyMessage = (message: string, signature: string, { publicKey }: Ed25519Key) => {
  const signatureBytes = hexToBytes(signature);

  return ed25519.verify({
    message,
    encoding: 'utf8',
    signature: signatureBytes,
    publicKey
  });
};
