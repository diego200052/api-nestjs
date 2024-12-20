import { Module } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationsSchema } from './schema/locations.schema';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GooglePlacesService } from './google-places.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Locations', schema: LocationsSchema}]),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('HTTP_TIMEOUT'),
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [LocationsController],
  providers: [
    LocationsService,
    GooglePlacesService
  ],
  exports: [
    LocationsService
  ]
})
export class LocationsModule {}
