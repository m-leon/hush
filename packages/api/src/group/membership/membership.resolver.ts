import { Inject } from '@nestjs/common';
import { ResolveField, Resolver, Root } from '@nestjs/graphql';

import { GroupMembershipModel } from './membership.model';
import { PublicDBService } from '@/database/public.service';

@Resolver(GroupMembershipModel)
export class GroupMembershipResolver {
  constructor(@Inject(PublicDBService) private publicDBService: PublicDBService) {}

  @ResolveField()
  user(@Root() membership: GroupMembershipModel) {
    return this.publicDBService.groupMembership.findUnique({ where: { id: membership.id } }).user();
  }

  @ResolveField()
  group(@Root() membership: GroupMembershipModel) {
    return this.publicDBService.groupMembership.findUnique({ where: { id: membership.id } }).group();
  }
}
