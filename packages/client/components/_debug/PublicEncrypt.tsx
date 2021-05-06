import { useEffect, useState } from 'react';

import { encryptMessage, getXSalsa20Key } from '@/lib/xsalsa20';

const PublicEncrypt = () => {
  const [localSeed, setLocalSeed] = useState('');
  const [remoteSeed, setRemoteSeed] = useState('');
  const [clear, setClear] = useState('');
  const [ciphertext, setCiphertext] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { privateKey } = await getXSalsa20Key(localSeed);
        const { publicKey } = await getXSalsa20Key(remoteSeed);
        const cipher = await encryptMessage(clear, privateKey, publicKey);
        setCiphertext(cipher);
      } catch (e) {
        console.log(e);
        setCiphertext('');
      }
    })();
  }, [localSeed, remoteSeed, clear]);

  return (
    <div>
      <h1>PUBLIC ENCRYPT</h1>
      <label>Local Seed</label>
      <input type="text" value={localSeed} onChange={(e) => setLocalSeed(e.target.value)} />
      <label>Remote Seed</label>
      <input type="text" value={remoteSeed} onChange={(e) => setRemoteSeed(e.target.value)} />
      <label>Message</label>
      <input type="text" value={clear} onChange={(e) => setClear(e.target.value)} />
      <label>Cipher</label>
      <span>{ciphertext}</span>
    </div>
  );
};

export default PublicEncrypt;
