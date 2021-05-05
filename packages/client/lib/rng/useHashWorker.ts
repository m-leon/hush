import { useEffect, useRef, useState } from 'react';

export const useHashWorker = (seed: string) => {
  const workerRef = useRef<Worker>();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [hash, setHash] = useState<string>('');

  useEffect(() => {
    workerRef.current = new Worker(new URL('../../workers/hash.ts', import.meta.url));

    return () => {
      workerRef.current.terminate();
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    workerRef.current.postMessage({ seed });

    workerRef.current.onmessage = (event) => {
      if (seed === event.data.seed) {
        setLoading(false);
        setHash(event.data.hash);
      }
    };
  }, [seed, workerRef]);

  return {
    isLoading,
    hash
  };
};
