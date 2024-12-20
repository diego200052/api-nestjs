export interface PlaceDetailsResponseDto {
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    place_id: string;
}

export interface GooglePlacesErrorResponse {
  status: string;
  error_message: string;
}