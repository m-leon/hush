import { useEffect, useState } from 'react';

import { useEd25519Key, verifyMessage } from '@/lib/ed25519';

const Verify = () => {
  const [seed, setSeed] = useState('');
  const [signedMessage, setSigned] = useState('');
  const [message, setMessage] = useState('');

  const { publicKey } = useEd25519Key(seed);

  useEffect(() => {
    (async () => {
      try {
        const message = await verifyMessage(signedMessage, publicKey);
        setMessage(message);
      } catch (e) {
        console.log(e);
        setMessage('');
      }
    })();
  }, [publicKey, signedMessage]);

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
