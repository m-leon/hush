import seedrandom from 'seedrandom';

const KEY_LENGTH = 32;
const NONCE_LENGTH = 24;

export type Key = ReturnType<typeof generateKey>;

export const generateKey = (seed: string) => {
  const random = seedrandom(seed);

  return {
    key: Buffer.from(new Array(KEY_LENGTH).fill(null).map(() => Math.floor(random.double() * 255))),
    nonce: Buffer.from(new Array(NONCE_LENGTH).fill(null).map(() => Math.floor(random.double() * 255)))
  };
};
