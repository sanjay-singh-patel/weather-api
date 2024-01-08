import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CityModule } from 'src/module/city/city.module';
import { WeatherModule } from 'src/module/weather/weather.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    CityModule,
    WeatherModule,
  ],
})
export class AppModule {}