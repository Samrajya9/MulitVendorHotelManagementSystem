import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalInterceptors } from './Interceptors/gobal.interceptors';
import { HotelsModule } from './hotels/hotels.module';
import { HotelEmployeesModule } from './hotel-employees/hotel-employees.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => DatabaseConfig(),
    }),
    HotelsModule,
    HotelEmployeesModule,
    AuthModule,
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
