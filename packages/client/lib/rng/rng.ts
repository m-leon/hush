import isaac from 'isaac';
import sodium from 'libsodium-wrappers';

export const getBytes = async (length: number, seed: string) => {
  // Reseed isaac with expanded seed
  isaac.seed(seed);

  // Return next n bytes from isaac
  return _getBytes(length);
};

const _getBytes = (length: number) => {
  return new Uint8Array(new Array(length).fill(null).map(() => Math.floor(isaac.random() * 256)));
};

export const getHash = async (seed: string) => {
  const salt = await _getSalt(seed);

  await sodium.ready;

  return sodium.crypto_pwhash(
    4096, // Length of key
    seed, // Clear text
    salt, // Deterministic seed
    12, // Rounds
    16 * 1024 * 1024, // Memory
    sodium.crypto_pwhash_ALG_ARGON2ID13,
    'hex'
  );
};

const _getSalt = async (seed: string) => {
  await sodium.ready;
  isaac.seed(seed);
  return _getBytes(sodium.crypto_pwhash_SALTBYTES);
};
