import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { CitySchema } from './schema/city.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'City', schema: CitySchema }]),HttpModule],
  controllers: [CityController],
  providers: [CityService],

})
export class CityModule {}
