import { useEffect, useState } from 'react';

import { getEd25519Key, signMessage } from '@/lib/ed25519';

const Signature = () => {
  const [seed, setSeed] = useState('');
  const [clear, setClear] = useState('');
  const [signature, setSignature] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { privateKey } = await getEd25519Key(seed);
        const signature = await signMessage(clear, privateKey);
        setSignature(signature);
      } catch (e) {
        console.log(e);
        setSignature('');
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
