import { useEffect, useState } from 'react';

import { getEd25519Key, verifyMessage } from '@/lib/ed25519';

const Verify = () => {
  const [seed, setSeed] = useState('');
  const [signedMessage, setSigned] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { publicKey } = await getEd25519Key(seed);
        const message = await verifyMessage(signedMessage, publicKey);
        setMessage(message);
      } catch (e) {
        console.log(e);
        setMessage('');
      }
    })();
  }, [seed, signedMessage]);

  return (
    <div>
      <h1>VERIFY</h1>
      <label>Seed</label>
      <input type="text" value={seed} onChange={(e) => setSeed(e.target.value)} />
      <label>Signature</label>
      <input type="text" value={signedMessage} onChange={(e) => setSigned(e.target.value)} />
      <label>Message</label>
      <span>{message}</span>
    </div>
  );
};

export default Verify;
