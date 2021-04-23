import { useEffect, useState } from 'react';

import { generateKey, verifyMessage } from '@/lib/ed25519';

const Verify = () => {
  const [seed, setSeed] = useState('');
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    (async () => {
      const key = await generateKey(seed);
      try {
        const verified = verifyMessage(message, signature, key);
        setVerified(verified);
      } catch (e) {
        setVerified(false);
      }
    })();
  }, [seed, message, signature]);

  return (
    <div>
      <h1>VERIFY</h1>
      <label>Seed</label>
      <input type="text" value={seed} onChange={(e) => setSeed(e.target.value)} />
      <label>Message</label>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <label>Signature</label>
      <input type="text" value={signature} onChange={(e) => setSignature(e.target.value)} />
      <label>Verified</label>
      <span>{`${verified}`}</span>
    </div>
  );
};

export default Verify;
