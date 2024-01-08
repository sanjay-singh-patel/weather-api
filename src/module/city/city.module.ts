import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './schema/city.schema';
import { CityService } from './city.service';
import { CityController } from './city.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: City.name, schema: CitySchema }])],
  providers: [CityService],
  controllers: [CityController],
})
export class CityModule {}
