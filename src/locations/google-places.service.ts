import { HttpService } from '@nestjs/axios';
import { PlaceDetailsResponseDto } from './interfaces/place-details-response.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GooglePlacesService {
  private readonly apiKey = process.env.APIKEY_PLACES_GOOGLE;

  constructor(private readonly httpService: HttpService) {}

  async getPlaceDetails(placeId: string): Promise<PlaceDetailsResponseDto> {
    // Call Places API from Google.
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${this.apiKey}`;

    try {
      const { data } = await firstValueFrom(this.httpService.get(url));

      if (!data.result) {
        throw new NotFoundException(
          `Place details not found for the provided place_id: ${placeId}.`,
        );
      }

      // Return the information that we need to create the location
      const { formatted_address, geometry, place_id } = data.result;
      return {
        formatted_address,
        geometry,
        place_id,
      };
    } catch (error) {
      throw error;
    }
  }
}
