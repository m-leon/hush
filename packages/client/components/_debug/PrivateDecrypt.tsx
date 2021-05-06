import { useEffect, useState } from 'react';

import { decryptMessage, getXChaCha20Key } from '@/lib/xchacha20';

const PrivateDecrypt = () => {
  const [seed, setSeed] = useState('');
  const [cleartext, setCleartext] = useState('');
  const [ciphertext, setCiphertext] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const key = await getXChaCha20Key(seed);
        const cleartext = await decryptMessage(ciphertext, key);
        setCleartext(cleartext);
      } catch (e) {
        console.log(e);
        setCleartext('');
      }
    })();
  }, [seed, ciphertext]);

  return (
    <div>
      <h1>PRIVATE DECRYPT</h1>
      <label>Seed</label>
      <input type="text" value={seed} onChange={(e) => setSeed(e.target.value)} />
      <label>Cipher</label>
      <input type="text" value={ciphertext} onChange={(e) => setCiphertext(e.target.value)} />
      <label>Message</label>
      <span>{cleartext}</span>
    </div>
  );
};

export default PrivateDecrypt;
