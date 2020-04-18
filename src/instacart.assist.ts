import { InstacartAPIRequest } from './api/instacart.api.request';
import { InstacartAuthApi } from './api/instacartAuth.api.request';

class InstacartAssit {
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
  public async getAllStoresInArea(milesRadius?: number) {
    if (!this.instacartApi) {
      return;
    }
    const data = await this.instacartApi.getAllStoresInArea();

    return { data, milesRadius };
  }
}

export default InstacartAssit;
