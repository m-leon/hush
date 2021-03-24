import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';

import type { Secret } from '@hush/db-public';
import { UserModel } from '@/user/user.model';

@ObjectType()
export class SecretModel implements Secret {
  @Field(() => ID)
  id: string;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
  @Field(() => UserModel)
  owner: UserModel;
  @HideField()
  ownerId: string;
  @Field()
  cipher: string;
}
