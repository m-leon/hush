import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { GroupModule } from './group/group.module';
import { SecretModule } from './secret/secret.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    DatabaseModule,
    GroupModule,
    SecretModule,
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'generated/schema.gql')
    })
  ]
})
export class AppModule {}
