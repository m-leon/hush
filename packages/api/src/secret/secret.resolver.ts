import { Inject } from '@nestjs/common';
import { Query, ResolveField, Resolver, Root } from '@nestjs/graphql';

import { SecretModel } from './secret.model';
import { PublicDBService } from '@/database/public.service';

@Resolver(SecretModel)
export class SecretResolver {
  constructor(@Inject(PublicDBService) private publicDBService: PublicDBService) {}

  @ResolveField()
  owner(@Root() secret: SecretModel) {
    return this.publicDBService.secret.findUnique({ where: { id: secret.id } }).owner();
  }

  @Query(() => [SecretModel])
  secrets() {
    return this.publicDBService.secret.findMany();
  }
}
