import { useEffect, useState } from 'react';

import { generateKey, SignKeyPair } from './generateKey';
import { useHashWorker } from '@/lib/rng';

const emptyKey: SignKeyPair = {
  publicKey: new Uint8Array(),
  privateKey: new Uint8Array(),
  keyType: 'ed25519'
};

export const useEd25519Key = (seed: string) => {
  const { hash } = useHashWorker(seed);
  const [key, setKey] = useState<SignKeyPair>(emptyKey);

  useEffect(() => {
    (async () => {
      const key = await generateKey(hash);
      setKey(key);
    })();
  }, [hash]);

  return key;
};
