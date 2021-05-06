import { generateKey } from './generateKey';
import { getHashWorker } from '@/lib/rng';

export const getEd25519Key = async (seed: string) => {
  const hash = await getHashWorker(seed);
  return generateKey(hash);
};
