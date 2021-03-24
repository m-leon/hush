import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';
import { GroupMembershipResolver } from './membership/membership.resolver';
import { GroupResolver } from './group.resolver';
import { GroupSecretResolver } from './secret/secret.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [GroupMembershipResolver, GroupResolver, GroupSecretResolver]
})
export class GroupModule {}
