import { Inject } from '@nestjs/common';
import { Query, ResolveField, Resolver, Root } from '@nestjs/graphql';

import { PublicDBService } from '@/database/public.service';
import { UserModel } from './user.model';

@Resolver(UserModel)
export class UserResolver {
  constructor(@Inject(PublicDBService) private publicDBService: PublicDBService) {}

  @ResolveField()
  groups(@Root() user: UserModel) {
    return this.publicDBService.user.findUnique({ where: { id: user.id } }).groups();
  }

  @ResolveField()
  secrets(@Root() user: UserModel) {
    return this.publicDBService.user.findUnique({ where: { id: user.id } }).secrets();
  }

  @Query(() => [UserModel])
  users() {
    return this.publicDBService.user.findMany();
  }
}
