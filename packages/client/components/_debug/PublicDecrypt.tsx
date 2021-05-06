import { useEffect, useState } from 'react';

import { decryptMessage, getXSalsa20Key } from '@/lib/xsalsa20';

const PublicDecrypt = () => {
  const [localSeed, setLocalSeed] = useState('');
  const [remoteSeed, setRemoteSeed] = useState('');
  const [cleartext, setCleartext] = useState('');
  const [ciphertext, setCiphertext] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { publicKey } = await getXSalsa20Key(localSeed);
        const { privateKey } = await getXSalsa20Key(remoteSeed);
        const cleartext = await decryptMessage(ciphertext, privateKey, publicKey);
        setCleartext(cleartext);
      } catch (e) {
        console.log(e);
        setCleartext('');
      }
    })();
  }, [localSeed, remoteSeed, ciphertext]);

  return (
    <div>
      <h1>PUBLIC DECRYPT</h1>
      <label>Local Seed</label>
      <input type="text" value={localSeed} onChange={(e) => setLocalSeed(e.target.value)} />
      <label>Remote Seed</label>
      <input type="text" value={remoteSeed} onChange={(e) => setRemoteSeed(e.target.value)} />
      <label>Cipher</label>
      <input type="text" value={ciphertext} onChange={(e) => setCiphertext(e.target.value)} />
      <label>Message</label>
      <span>{cleartext}</span>
    </div>
  );
};

export default PublicDecrypt;
