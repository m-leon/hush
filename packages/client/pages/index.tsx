import Decrypt from '@/components/Decrypt';
import Encrypt from '@/components/Encrypt';
import Sign from '@/components/Sign';
import Verify from '@/components/Verify';

const IndexPage = () => (
  <div>
    <Encrypt />
    <Decrypt />
    <Sign />
    <Verify />
  </div>
);

export default IndexPage;
