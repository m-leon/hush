import lru from 'lru-cache';

import { getHash } from '@/lib/rng';

const cache = new lru<string, string>();

type Payload = MessageEvent<{
  length: number;
  seed: string;
}>;

const _getHash = async (seed: string) => {
  if (cache.has(seed)) {
    return cache.get(seed);
  }

  const hash = await getHash(seed);
  cache.set(seed, hash);
  return hash;
};

self.addEventListener('message', async (event: Payload) => {
  const hash = await _getHash(event.data.seed);
  return self.postMessage({ seed: event.data.seed, hash }, undefined);
});
