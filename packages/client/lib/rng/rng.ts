import seedrandom from 'seedrandom';

import { sha512Hash } from '@/lib/utils/sha512';

export class RNG {
  private rng: ReturnType<seedrandom>;

  constructor(seed: string) {
    const hash = sha512Hash(seed);
    this.rng = seedrandom(hash);
  }

  getBytes(length: number) {
    return Buffer.from(new Array(length).fill(null).map(() => Math.floor(this.rng.double() * 255)));
  }
}
