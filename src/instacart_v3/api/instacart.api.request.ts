import axios, { AxiosInstance } from 'axios';
import HTTPMethod from 'http-method-enum';

import { InstacartAuthApi } from './instacartAuth.api.request';

export class InstacartAPIRequest {
  private readonly instacartRequest: AxiosInstance;
  private readonly instacartAuthApi: InstacartAuthApi;

  // URLS
  private readonly pickUplocationV3: string = '/pickup_locations';

  constructor(instacartAuthApi: InstacartAuthApi) {
    this.instacartAuthApi = instacartAuthApi;

    this.instacartRequest = axios.create({
      baseURL: 'https://www.instacart.com/v3',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
      },
    });
  }

  /**
   * @description
   * Recieves an array of all available stores, based on the user's account location
   * @returns {AxiosResponse<any>} List of all Stores
   */
  public async getAllPickupLocations(): Promise<any> {
    let storeData: any;

    try {
      const data = await this.setupRequest(
        this.pickUplocationV3,
        HTTPMethod.GET,
        null
      );
      storeData = data;
    } catch (error) {
      throw new Error('Cannot fetch Stores');
    }

    return storeData;
  }

  /********* Private Methods **********/
  /**
   * @description
   * Initializes the login request before submitting subsequent HTTP requests.
   * Currently only working for NON-OAUTH logins
   * TODO: Add support for OAuth through FB and Google
   * @param {String} path URL Path
   * @param {HTTPMethod} method Available HTTP Method
   * @param {Object<any>} requestBody Request body for POST, PUT, DELETE, etc. Requests
   */
  private async setupRequest(
    path: string,
    method: HTTPMethod,
    requestBody?: any
  ): Promise<any> {
    let responseData;

    try {
      const { sessionToken } = await this.instacartAuthApi.loginUser();
      const { data } = await this.instacartRequest({
        method: method as any,
        url: path,
        data: requestBody ?? {},
        headers: {
          Cookie: `_instacart_session=${sessionToken};`,
        },
      });

      responseData = data;
    } catch (error) {
      throw new Error('Cannot make Intscart Request Succesfully');
    }

    return responseData;
  }
}
