import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module as NestModule } from '@nestjs/common';

import { HttpModule } from '@http/http.module';

import { Page } from '@http/modules/models/page.model';
import { Module } from '@http/modules/models/module.model';
import { Company } from '@http/companies/models/company.model';

@NestModule({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as any,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      // logging: false,
      models: [
        Company,
        Module,
        Page,
      ],
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
      },
    }),
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
