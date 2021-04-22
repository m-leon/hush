import { ISAAC } from './isaac';
import { sha512Hash } from '@/lib/utils/sha512';

export class RNG {
  private rng: ISAAC;

  constructor(seed: string) {
    const hash = sha512Hash(seed);
    this.rng = new ISAAC(hash);
  }

  getBytes(length: number) {
    return Buffer.from(new Array(length).fill(null).map(() => this.getRandomInt(0, 255)));
  }

  getRandomInt(min: number, max: number) {
    return Math.floor(this.rng.random() * (max - min + 1) + min);
  }
}
