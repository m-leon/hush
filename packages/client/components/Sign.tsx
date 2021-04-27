import { useEffect, useState } from 'react';

import { signMessage, useEd25519KeyWorker } from '@/lib/ed25519';

const Signature = () => {
  const [seed, setSeed] = useState('');
  const [clear, setClear] = useState('');
  const [signature, setSignature] = useState('');

  const { privateKey } = useEd25519KeyWorker(seed);

  useEffect(() => {
    (async () => {
      try {
        const signature = await signMessage(clear, privateKey);
        setSignature(signature);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [seed, clear]);

  return (
    <div>
      <h1>SIGN</h1>
      <label>Seed</label>
      <input type="text" value={seed} onChange={(e) => setSeed(e.target.value)} />
      <label>Message</label>
      <input type="text" value={clear} onChange={(e) => setClear(e.target.value)} />
      <label>Signature</label>
      <span>{signature}</span>
    </div>
  );
};

export default Signature;
