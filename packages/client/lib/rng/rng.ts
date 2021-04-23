import sodium from 'libsodium-wrappers';

import { ISAAC } from './isaac';

export class RNG {
  private ready: Promise<void>;
  private isaac: ISAAC;

  constructor(seed: string) {
    this.ready = new Promise(async (resolve) => {
      await sodium.ready;

      const salt = this.generateSalt(seed);

      const hash = sodium.crypto_pwhash(
        256, // Length of key
        seed, // Clear text
        salt, // Deterministic seed
        sodium.crypto_pwhash_OPSLIMIT_MIN,
        sodium.crypto_pwhash_MEMLIMIT_MIN,
        sodium.crypto_pwhash_ALG_ARGON2ID13,
        'hex'
      );

      this.isaac = new ISAAC(hash);

      resolve();
    });
  }

  private generateSalt(seed: string, length = 16) {
    const saltIsaac = new ISAAC(seed);
    return this._getBytes(length, saltIsaac);
  }

  private _getBytes(length: number, isaac = this.isaac) {
    return new Uint8Array(new Array(length).fill(null).map(() => Math.floor(isaac.random() * 256)));
  }

  async getBytes(length: number) {
    await this.ready;
    return this._getBytes(length);
  }
}
