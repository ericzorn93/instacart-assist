import axios, { AxiosInstance, AxiosResponse } from 'axios';

export class InstacartAPIRequest {
  private readonly instacartRequest: AxiosInstance;
  private readonly authToken: string;

  // URLS
  private readonly pickUplocationV3: string = '/pickup_locations';

  constructor(authToken: string) {
    if (!authToken) {
      throw new Error('Instacart auth token was not supplied');
    }

    this.authToken = authToken;
    this.instacartRequest = axios.create({
      baseURL: 'https://www.instacart.com/v3',
      headers: {
        Cookie: `remember_user_token=${this.authToken}`,
      },
    });
  }

  public async getAllStoresInArea(): Promise<AxiosResponse<any>> {
    const response = await this.instacartRequest.get(this.pickUplocationV3);
    return response.data;
  }
}
