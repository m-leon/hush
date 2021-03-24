import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

import { PrismaClient } from '@hush/db-public';

@Injectable()
export class PublicDBService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
