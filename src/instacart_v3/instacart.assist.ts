import { InstacartAPIRequest } from './api/instacart.api.request';
import { InstacartAuthApi } from './api/instacartAuth.api.request';
import {
  IPickupLocation,
  IFilteredPickupLocation,
} from './types/pickupLocation.interface';

class InstacartAssitV3 {
  private instacartApi: InstacartAPIRequest;

  /**
   * @description
   * Please enter your Instacart credentials that are not OAUTH compatible (FB, Google).
   * Oauth is coming soon.
   * @param {String} emailAddress User's Instacart Email Address
   * @param {String} password User's Instacart Password
   */
  constructor(emailAddress: string, password: string) {
    const instacartAuthApi = new InstacartAuthApi(emailAddress, password);
    this.instacartApi = new InstacartAPIRequest(instacartAuthApi);
  }

  /**
   * @description
   * Fetches a list of stores in your area, based on your current location.
   * Your location is fetched from instacart
   * @param {Number} milesRadius Number of Stores in the surrounding radius
   * @returns {Promise<any>} List of local stores
   */
  public async getAllPickupLocations(milesRadius?: number) {
    if (!this.instacartApi) {
      return;
    }
    const response = await this.instacartApi.getAllPickupLocations();
    const { guess_zip, pickup_locations: pickupLocations = [] } = response;

    const data = {
      area: {
        zipCode: guess_zip.zip_code,
        lat: guess_zip.lat,
        lon: guess_zip.lon,
      },
      locations: [] as IFilteredPickupLocation[],
    };

    const filteredLocations: IFilteredPickupLocation[] = (pickupLocations as IPickupLocation[])
      .filter(location => {
        const distance = parseInt(
          location.distance_from_location.replace(/miles away/gim, '').trim(),
          10
        );

        if (milesRadius && distance <= milesRadius) {
          return location;
        }

        return false;
      })
      .map(location => {
        const { id, name, address, warehouse } = location;
        return {
          locationId: id,
          name: name,
          urlSlug: warehouse.slug,
          address: {
            streetOne: address.address_line_1,
            streetTwo: address.address_line_2 ?? null,
            city: address.city,
            state: address.state,
            zipCode: address.zip_code,
            latitude: address.lat,
            longitude: address.lon,
          },
        };
      });

    data.locations = [...filteredLocations];

    return { data, milesRadius };
  }
}

export default InstacartAssitV3;
