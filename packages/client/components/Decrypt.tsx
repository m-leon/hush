import { useEffect, useState } from 'react';

import { decryptMessage, generateKey } from '@/lib/xchacha20';
import { hexToBytes } from '@/lib/utils';

const Decrypt = () => {
  const [seed, setSeed] = useState('');
  const [clear, setClear] = useState('');
  const [nonceHex, setNonceHex] = useState('');
  const [cipher, setCipher] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const key = await generateKey(seed);
        const nonce = hexToBytes(nonceHex);
        const clear = await decryptMessage(cipher, nonce, key);
        setClear(clear);
        setError('');
      } catch (e) {
        setClear('');
        setError(e.toString());
      }
    })();
  }, [seed, nonceHex, cipher]);

  return (
    <div>
      <h1>DECRYPT</h1>
      <label>Seed</label>
      <input type="text" value={seed} onChange={(e) => setSeed(e.target.value)} />
      <label>Nonce</label>
      <input type="text" value={nonceHex} onChange={(e) => setNonceHex(e.target.value)} />
      <label>Cipher</label>
      <input type="text" value={cipher} onChange={(e) => setCipher(e.target.value)} />
      <label>Message</label>
      <span>{clear}</span>
      <label>Error</label>
      <span>{error}</span>
    </div>
  );
};

export default Decrypt;
