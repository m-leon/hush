import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';
import { SecretResolver } from './secret.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [SecretResolver]
})
export class SecretModule {}
