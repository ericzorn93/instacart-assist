import axios, { AxiosInstance } from 'axios';
import HTTPMethod from 'http-method-enum';

import { InstacartAuthApi } from './instacartAuth.api.request';
import { InstacartV3Urls } from '../enums/instacartV3.url.enum';
import { IRetailer } from '../types/allRetailer.types';

export class InstacartAPIRequest {
  private readonly instacartRequest: AxiosInstance;
  private readonly instacartAuthApi: InstacartAuthApi;

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
   * Fetches a list of all retailers that is provided from ther user's session
   * @returns {IRetailer[]} All original retailer objects from the Instacart API
   */
  public async getAllRetailLocations(): Promise<IRetailer[]> {
    let allRetailerData: any;

    try {
      const data = await this.setupRequest<any>(
        InstacartV3Urls.ALL_RETAILS,
        HTTPMethod.GET,
        null
      );
      allRetailerData = data.retailers;
    } catch (err) {
      throw new Error('Cannot Fetch All Instcart Retailer Locations');
    }

    return allRetailerData;
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
        InstacartV3Urls.PICKUP_LOCATIONS,
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
  private async setupRequest<T>(
    path: string,
    method: HTTPMethod,
    requestBody?: any
  ): Promise<T> {
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
