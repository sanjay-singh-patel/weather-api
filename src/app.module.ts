import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CityModule } from './city/city.module';
import { BasicStrategy } from './auth/basic.stratergy';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
    MongooseModule.forRoot(process.env.DB_URI),
    CityModule,
  ],  

})
export class AppModule {}