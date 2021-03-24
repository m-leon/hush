import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';

import { GroupModel } from '@/group/group.model';
import type { GroupSecret } from '@hush/db-public';

@ObjectType()
export class GroupSecretModel implements GroupSecret {
  @Field(() => ID)
  id: string;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
  @Field(() => GroupModel)
  group: GroupModel;
  @HideField()
  groupId: string;
  @Field()
  cipher: string;
}
