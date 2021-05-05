import { useEffect, useState } from 'react';

import { generateKey, XChaCha20Key } from './generateKey';
import { useHashWorker } from '@/lib/rng';

export const useXChaCha20Key = (seed: string) => {
  const { hash } = useHashWorker(seed);
  const [key, setKey] = useState<XChaCha20Key>(new Uint8Array());

  useEffect(() => {
    (async () => {
      const key = await generateKey(hash);
      setKey(key);
    })();
  }, [hash]);

  return key;
};
