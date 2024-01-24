import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { City } from './schema/city.schema';
import mongoose from 'mongoose';


describe('CityService', () => {
    let service: CityService;
    let httpService: HttpService;
    beforeAll(async () => {
        await mongoose.connect('mongodb://db:27017/weather-api-citydb');
      });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CityService,
                {
                    provide: getModelToken('City'),
                    useValue: {
                        find: jest.fn(),
                        create: jest.fn(),
                    },
                },
                {
                    provide: HttpService,
                    useValue: {
                        get: jest.fn(),
                    },
                },
            ],
        }).compile();
        await mongoose.connect('mongodb://db:27017/weather-api-citydb');
        service = module.get<CityService>(CityService);
        httpService = module.get<HttpService>(HttpService);
    });

    test('MongoDB Connection Successful', async () => {
        const isConnected = mongoose.connection.readyState;
        expect(isConnected).toBe(1);
      });

    describe('getAllCities', () => {
        it('should return all the cities', async () => {
            const mockCities: City[] = [
                { name: 'City 1'},
            ];

            jest.spyOn(service['cityModel'], 'find').mockReturnValueOnce({
                exec: jest.fn().mockResolvedValueOnce(mockCities),
            } as any);

            const result = await service.getAllCities();

            // expect(result).toEqual(mockCities);
            expect(service['cityModel'].find).toHaveBeenCalledTimes(1);
            console.log(result);
        });
    });

    describe('createCity', () => {
        it('should add a new city to mongodb', async () => {
            const mockCity: City = { name: 'New City' };

            jest.spyOn(service['cityModel'], 'create').mockResolvedValueOnce(mockCity as any);

            const result = await service.createCity(mockCity);

            expect(result).toEqual(mockCity);
            expect(service['cityModel'].create).toHaveBeenCalledTimes(1);
            expect(service['cityModel'].create).toHaveBeenCalledWith(mockCity);
        });
    });

   describe('getWeather', () => {
    it('should get weather data of a city', async () => {
        const mockCities = [{ name: 'Jabalpur' }, { name: 'Bhopal' }]; // Replace with your actual city data
        const mockWeatherData = { City: expect.any(String), 
            Country: expect.any(String), 
            Temperature: expect.any(Number), 
            Weather: expect.any(String), 
            Sky: expect.any(String) };

        jest.spyOn(service['cityModel'], 'find').mockResolvedValue(mockCities);

        const result = await service.getWeather();
        expect(result.at(0)).toEqual(mockWeatherData);
        expect(httpService.get).toHaveBeenCalledWith('https://api.weather.com');
    });
});
    afterAll(async () => {
        await mongoose.connection.close();
      });
});
