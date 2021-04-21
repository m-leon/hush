import seedrandom from 'seedrandom';

import { sha512Hash } from '@/lib/utils/sha512';

export class RNG {
  private rng: ReturnType<seedrandom>;

  constructor(seed: string) {
    const hash = sha512Hash(seed);
    this.rng = seedrandom(hash);
  }

  getBytes(length: number) {
    return Buffer.from(new Array(length).fill(null).map(() => this.getRandomInt(0, 255)));
  }

  getRandomInt(min: number, max: number) {
    return Math.floor(this.rng.double() * (max - min + 1) + min);
  }
}
