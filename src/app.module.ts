import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CityModule } from './weather/city.module';
import { BasicStrategy } from './auth/basic.stratergy';
import { AuthService } from './auth/auth.service'; // import AuthService

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    CityModule,
  ],
  providers: [BasicStrategy, AuthService], // add AuthService to providers
})
export class AppModule {}