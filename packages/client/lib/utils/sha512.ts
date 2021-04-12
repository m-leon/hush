import forge from 'node-forge';

const { sha512 } = forge.md;

export const sha512Hash = (message: string) => {
  const md = sha512.create();
  md.update(message);
  return md.digest().toHex();
};
