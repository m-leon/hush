import { useEffect, useState } from 'react';

import { generateKey, XChaCha20Key } from './generateKey';
import { getHashWorker } from '@/lib/rng';

export const useXChaCha20Key = (seed: string) => {
  const [key, setKey] = useState<XChaCha20Key>(new Uint8Array());

  useEffect(() => {
    (async () => {
      const hash = await getHashWorker(seed);
      const key = await generateKey(hash);
      setKey(key);
    })();
  }, [seed]);

  return key;
};
