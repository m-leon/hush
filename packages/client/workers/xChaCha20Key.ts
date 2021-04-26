import { generateKey } from '@/lib/xchacha20';

type Payload = MessageEvent<{
  seed: string;
}>;

self.addEventListener('message', async (event: Payload) => {
  const key = await generateKey(event.data.seed);
  return self.postMessage({ seed: event.data.seed, key }, undefined);
});
