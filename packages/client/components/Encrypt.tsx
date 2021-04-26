import { useEffect, useState } from 'react';

import { encryptMessage, generateKey } from '@/lib/xchacha20';

const Encrypt = () => {
  const [seed, setSeed] = useState('');
  const [clear, setClear] = useState('');
  const [cipher, setCipher] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const key = await generateKey(seed);
        const cipher = await encryptMessage(clear, key);
        setCipher(cipher);
        setError('');
      } catch (e) {
        setCipher('');
        setError(e.toString());
      }
    })();
  }, [seed, clear]);

  return (
    <div>
      <h1>ENCRYPT</h1>
      <label>Seed</label>
      <input type="text" value={seed} onChange={(e) => setSeed(e.target.value)} />
      <label>Message</label>
      <input type="text" value={clear} onChange={(e) => setClear(e.target.value)} />
      <label>Cipher</label>
      <span>{cipher}</span>
      <label>Error</label>
      <span>{error}</span>
    </div>
  );
};

export default Encrypt;
