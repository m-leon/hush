import sodium from 'libsodium-wrappers';

import type { XSalsa20PrivateKey, XSalsa20PublicKey } from './generateKey';

export const decryptMessage = async (
  ciphertext: string,
  privateKey: XSalsa20PrivateKey,
  publicKey: XSalsa20PublicKey
) => {
  await sodium.ready;

  const [publicNonce, cipher, mac] = ciphertext.split('.').map((b64) => {
    return sodium.from_base64(b64);
  });

  return sodium.crypto_box_open_detached(cipher, mac, publicNonce, publicKey, privateKey, 'text');
};
