export const getHashWorker = (seed: string) => {
  return new Promise<string>((resolve) => {
    const worker = new Worker(new URL('../../workers/hash.ts', import.meta.url));

    worker.postMessage({ seed });

    worker.onmessage = (event) => {
      resolve(event.data.hash);
      worker.terminate();
    };
  });
};
