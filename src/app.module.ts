import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config';
import { UsersModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalInterceptors } from './Interceptors/gobal.interceptors';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => DatabaseConfig(),
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalInterceptors,
    },
  ],
})
export class AppModule {
  constructor() {}
}
