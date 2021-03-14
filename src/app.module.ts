import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ['dist/auth/entities'],
      entitiesTs: ['src/auth/entities'],
      dbName: 'testdb.sqlite3',
      type: 'sqlite',
      debug: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
