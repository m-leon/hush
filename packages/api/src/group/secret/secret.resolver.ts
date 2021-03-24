import { Inject } from '@nestjs/common';
import { ResolveField, Resolver, Root } from '@nestjs/graphql';

import { GroupSecretModel } from './secret.model';
import { PublicDBService } from '@/database/public.service';

@Resolver(GroupSecretModel)
export class GroupSecretResolver {
  constructor(@Inject(PublicDBService) private publicDBService: PublicDBService) {}

  @ResolveField()
  group(@Root() secret: GroupSecretModel) {
    return this.publicDBService.groupSecret.findUnique({ where: { id: secret.id } }).group();
  }
}
