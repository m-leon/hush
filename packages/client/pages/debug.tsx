import PrivateDecrypt from '@/components/_debug/PrivateDecrypt';
import PrivateEncrypt from '@/components/_debug/PrivateEncrypt';
import PublicDecrypt from '@/components/_debug/PublicDecrypt';
import PublicEncrypt from '@/components/_debug/PublicEncrypt';

const DebugPage = () => (
  <div>
    <PrivateEncrypt />
    <PrivateDecrypt />
    <PublicEncrypt />
    <PublicDecrypt />
  </div>
);

export default DebugPage;
