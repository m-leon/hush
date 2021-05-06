import { generateKey } from './generateKey';
import { getHashWorker } from '@/lib/rng';

export const getXSalsa20Key = async (seed: string) => {
  const hash = await getHashWorker(seed);
  return generateKey(hash);
};
