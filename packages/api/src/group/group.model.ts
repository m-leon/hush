import { Field, ID, ObjectType } from '@nestjs/graphql';

import type { Group } from '@hush/db-public';
import { GroupMembershipModel } from './membership/membership.model';
import { GroupSecretModel } from './secret/secret.model';

@ObjectType()
export class GroupModel implements Group {
  @Field(() => ID)
  id: string;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
  @Field(() => [GroupMembershipModel])
  members: GroupMembershipModel[];
  @Field(() => [GroupSecretModel])
  secrets: GroupSecretModel[];
  @Field()
  name: string;
  @Field()
  color: string;
  @Field()
  privateKey: string;
}
