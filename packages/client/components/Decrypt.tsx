import { useEffect, useState } from 'react';

import { decryptMessage, useXChaCha20KeyWorker } from '@/lib/xchacha20';

const Decrypt = () => {
  const [seed, setSeed] = useState('');
  const [clear, setClear] = useState('');
  const [ciphertext, setCipher] = useState('');
  const [error, setError] = useState('');

  const key = useXChaCha20KeyWorker(seed);

  useEffect(() => {
    (async () => {
      try {
        const clear = await decryptMessage(ciphertext, key);
        setClear(clear);
        setError('');
      } catch (e) {
        setClear('');
        setError(e.toString());
      }
    })();
  }, [seed, key, ciphertext]);

  return (
    <div>
      <h1>DECRYPT</h1>
      <label>Seed</label>
      <input type="text" value={seed} onChange={(e) => setSeed(e.target.value)} />
      <label>Cipher</label>
      <input type="text" value={ciphertext} onChange={(e) => setCipher(e.target.value)} />
      <label>Message</label>
      <span>{clear}</span>
      <label>Error</label>
      <span>{error}</span>
    </div>
  );
};

export default Decrypt;
