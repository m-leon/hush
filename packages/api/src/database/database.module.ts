import { Module } from '@nestjs/common';

import { PublicDBService } from './public.service';

@Module({
  exports: [PublicDBService],
  providers: [PublicDBService]
})
export class DatabaseModule {}
