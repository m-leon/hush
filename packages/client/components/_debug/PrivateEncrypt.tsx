import { useEffect, useState } from 'react';

import { encryptMessage, getXChaCha20Key } from '@/lib/xchacha20';

const PrivateEncrypt = () => {
  const [seed, setSeed] = useState('');
  const [cleartext, setCleartext] = useState('');
  const [ciphertext, setCiphertext] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const key = await getXChaCha20Key(seed);
        const cipher = await encryptMessage(cleartext, key);
        setCiphertext(cipher);
      } catch (e) {
        console.log(e);
        setCiphertext('');
      }
    })();
  }, [seed, cleartext]);

  return (
    <div>
      <h1>PRIVATE ENCRYPT</h1>
      <label>Seed</label>
      <input type="text" value={seed} onChange={(e) => setSeed(e.target.value)} />
      <label>Message</label>
      <input type="text" value={cleartext} onChange={(e) => setCleartext(e.target.value)} />
      <label>Cipher</label>
      <span>{ciphertext}</span>
    </div>
  );
};

export default PrivateEncrypt;
