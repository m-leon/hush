import { useEffect, useState } from 'react';

import { decryptMessage, useXChaCha20Key } from '@/lib/xchacha20';

const Decrypt = () => {
  const [seed, setSeed] = useState('');
  const [clear, setClear] = useState('');
  const [ciphertext, setCipher] = useState('');

  const key = useXChaCha20Key(seed);

  useEffect(() => {
    (async () => {
      try {
        const clear = await decryptMessage(ciphertext, key);
        setClear(clear);
      } catch (e) {
        console.log(e);
        setClear('');
      }
    })();
  }, [key, ciphertext]);

  return (
    <div>
      <h1>DECRYPT</h1>
      <label>Seed</label>
      <input type="text" value={seed} onChange={(e) => setSeed(e.target.value)} />
      <label>Cipher</label>
      <input type="text" value={ciphertext} onChange={(e) => setCipher(e.target.value)} />
      <label>Message</label>
      <span>{clear}</span>
    </div>
  );
};

export default Decrypt;
