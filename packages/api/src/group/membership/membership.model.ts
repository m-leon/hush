import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';

import type { GroupMembership } from '@hush/db-public';
import { GroupModel } from '@/group/group.model';
import { UserModel } from '@/user/user.model';

@ObjectType()
export class GroupMembershipModel implements GroupMembership {
  @Field(() => ID)
  id: string;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
  @Field(() => UserModel)
  user: UserModel;
  @HideField()
  userId: string;
  @Field(() => GroupModel)
  group: GroupModel;
  @HideField()
  groupId: string;
}
