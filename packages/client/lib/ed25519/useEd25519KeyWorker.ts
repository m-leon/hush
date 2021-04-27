import { useEffect, useRef, useState } from 'react';

import { SignKeyPair } from './generateKey';

const emptyKey: SignKeyPair = {
  publicKey: new Uint8Array(),
  privateKey: new Uint8Array(),
  keyType: 'ed25519'
};

export const useEd25519KeyWorker = (seed: string) => {
  const workerRef = useRef<Worker>();

  const [key, setKey] = useState<SignKeyPair>(emptyKey);

  useEffect(() => {
    workerRef.current = new Worker(new URL('../../workers/ed25519Key.ts', import.meta.url));

    return () => {
      workerRef.current.terminate();
    };
  }, []);

  useEffect(() => {
    workerRef.current.postMessage({ seed });

    workerRef.current.onmessage = (event) => {
      if (seed === event.data.seed) {
        setKey(event.data.key);
      }
    };
  }, [seed, workerRef]);

  return key;
};
