import { useEffect, useRef, useState } from 'react';

import { XChaCha20Key } from './generateKey';

export const useXChaCha20KeyWorker = (seed: string) => {
  const workerRef = useRef<Worker>();

  const [key, setKey] = useState<XChaCha20Key>(new Uint8Array());

  useEffect(() => {
    workerRef.current = new Worker(new URL('../../workers/xChaCha20Key.ts', import.meta.url));

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
