import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';
import { getModelToken } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { City } from './schema/city.schema';

describe('CityService', () => {
    let service: CityService;
    let httpService: HttpService;

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

        service = module.get<CityService>(CityService);
        httpService = module.get<HttpService>(HttpService);
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
            const mockWeatherData = [
                {
                  "coord": {
                    "lon": 77.4,
                    "lat": 23.2667
                  },
                  "weather": [
                    {
                      "id": 800,
                      "main": "Clear",
                      "description": "clear sky",
                      "icon": "01d"
                    }
                  ],
                  "base": "stations",
                  "main": {
                    "temp": 294.28,
                    "feels_like": 293.13,
                    "temp_min": 293.81,
                    "temp_max": 294.28,
                    "pressure": 1018,
                    "humidity": 26
                  },
                  "visibility": 6000,
                  "wind": {
                    "speed": 2.57,
                    "deg": 10
                  },
                  "clouds": {
                    "all": 0
                  },
                  "dt": 1705995293,
                  "sys": {
                    "type": 1,
                    "id": 9063,
                    "country": "IN",
                    "sunrise": 1705973594,
                    "sunset": 1706013027
                  },
                  "timezone": 19800,
                  "id": 1275841,
                  "name": "Bhopal",
                  "cod": 200
                },
                {
                  "coord": {
                    "lon": 79.9501,
                    "lat": 23.167
                  },
                  "weather": [
                    {
                      "id": 721,
                      "main": "Haze",
                      "description": "haze",
                      "icon": "50d"
                    }
                  ],
                  "base": "stations",
                  "main": {
                    "temp": 294.62,
                    "feels_like": 294.02,
                    "temp_min": 294.62,
                    "temp_max": 294.62,
                    "pressure": 1016,
                    "humidity": 46
                  },
                  "visibility": 2500,
                  "wind": {
                    "speed": 2.57,
                    "deg": 60
                  },
                  "clouds": {
                    "all": 0
                  },
                  "dt": 1705995207,
                  "sys": {
                    "type": 1,
                    "id": 9066,
                    "country": "IN",
                    "sunrise": 1705972972,
                    "sunset": 1706012424
                  },
                  "timezone": 19800,
                  "id": 1269633,
                  "name": "Jabalpur",
                  "cod": 200
                },
                {
                  "coord": {
                    "lon": 78.7833,
                    "lat": 22.9167
                  },
                  "weather": [
                    {
                      "id": 800,
                      "main": "Clear",
                      "description": "clear sky",
                      "icon": "01d"
                    }
                  ],
                  "base": "stations",
                  "main": {
                    "temp": 297.6,
                    "feels_like": 296.6,
                    "temp_min": 297.6,
                    "temp_max": 297.6,
                    "pressure": 1014,
                    "humidity": 19,
                    "sea_level": 1014,
                    "grnd_level": 974
                  },
                  "visibility": 10000,
                  "wind": {
                    "speed": 2.57,
                    "deg": 357,
                    "gust": 2.32
                  },
                  "clouds": {
                    "all": 0
                  },
                  "dt": 1705995293,
                  "sys": {
                    "country": "IN",
                    "sunrise": 1705973227,
                    "sunset": 1706012730
                  },
                  "timezone": 19800,
                  "id": 1271847,
                  "name": "Gādarwāra",
                  "cod": 200
                },
                {
                  "coord": {
                    "lon": 43.9659,
                    "lat": 15.3561
                  },
                  "weather": [
                    {
                      "id": 801,
                      "main": "Clouds",
                      "description": "few clouds",
                      "icon": "02d"
                    }
                  ],
                  "base": "stations",
                  "main": {
                    "temp": 287.65,
                    "feels_like": 286.12,
                    "temp_min": 287.65,
                    "temp_max": 287.65,
                    "pressure": 1021,
                    "humidity": 37,
                    "sea_level": 1021,
                    "grnd_level": 739
                  },
                  "visibility": 10000,
                  "wind": {
                    "speed": 1.25,
                    "deg": 241,
                    "gust": 0.99
                  },
                  "clouds": {
                    "all": 21
                  },
                  "dt": 1705995293,
                  "sys": {
                    "country": "YE",
                    "sunrise": 1705980863,
                    "sunset": 1706021809
                  },
                  "timezone": 10800,
                  "id": 70677,
                  "name": "Dhuma",
                  "cod": 200
                },
                {
                  "coord": {
                    "lon": 78.4744,
                    "lat": 17.3753
                  },
                  "weather": [
                    {
                      "id": 721,
                      "main": "Haze",
                      "description": "haze",
                      "icon": "50d"
                    }
                  ],
                  "base": "stations",
                  "main": {
                    "temp": 303.38,
                    "feels_like": 302.56,
                    "temp_min": 302.88,
                    "temp_max": 303.38,
                    "pressure": 1016,
                    "humidity": 35
                  },
                  "visibility": 5000,
                  "wind": {
                    "speed": 6.17,
                    "deg": 210
                  },
                  "clouds": {
                    "all": 20
                  },
                  "dt": 1705995117,
                  "sys": {
                    "type": 1,
                    "id": 9214,
                    "country": "IN",
                    "sunrise": 1705972767,
                    "sunset": 1706013338
                  },
                  "timezone": 19800,
                  "id": 1269843,
                  "name": "Hyderabad",
                  "cod": 200
                }
              ];
            jest.spyOn(service, 'getWeather').getMockImplementation();

            const result = await service.getWeather();

            expect(result).toEqual(mockWeatherData);
            expect(httpService.get).toHaveBeenCalledTimes(1);
            expect(httpService.get).toHaveBeenCalledWith('https://api.weather.com');
        });
    });
});
