import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';

import { GroupModel } from '@/group/group.model';
import { SecretModel } from '@/secret/secret.model';
import type { User } from '@hush/db-public';

@ObjectType()
export class UserModel implements User {
  @Field(() => ID)
  id: string;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
  @Field(() => [GroupModel])
  groups: GroupModel[];
  @Field(() => [SecretModel])
  secrets: SecretModel[];
  @Field()
  username: string;
  @HideField()
  password: string;
  @Field()
  publicKey: string;
}
