import { useEffect, useState } from 'react';

import { generateKey, SignKeyPair } from './generateKey';
import { getHashWorker } from '@/lib/rng';

const emptyKey: SignKeyPair = {
  publicKey: new Uint8Array(),
  privateKey: new Uint8Array(),
  keyType: 'ed25519'
};

export const useEd25519Key = (seed: string) => {
  const [key, setKey] = useState<SignKeyPair>(emptyKey);

  useEffect(() => {
    (async () => {
      const hash = await getHashWorker(seed);
      const key = await generateKey(hash);
      setKey(key);
    })();
  }, [seed]);

  return key;
};
