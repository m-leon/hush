import { Inject } from '@nestjs/common';
import { Query, ResolveField, Resolver, Root } from '@nestjs/graphql';

import { GroupModel } from './group.model';
import { PublicDBService } from '@/database/public.service';

@Resolver(GroupModel)
export class GroupResolver {
  constructor(@Inject(PublicDBService) private publicDBService: PublicDBService) {}

  @ResolveField()
  members(@Root() group: GroupModel) {
    return this.publicDBService.group.findUnique({ where: { id: group.id } }).members();
  }

  @ResolveField()
  secrets(@Root() group: GroupModel) {
    return this.publicDBService.group.findUnique({ where: { id: group.id } }).secrets();
  }

  @Query(() => [GroupModel])
  groups() {
    return this.publicDBService.group.findMany();
  }
}
