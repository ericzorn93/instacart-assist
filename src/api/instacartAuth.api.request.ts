import axios, { AxiosInstance } from 'axios';

export class InstacartAuthApi {
  private readonly instacartAuthRequest: AxiosInstance;

  private readonly loginUserV3: string =
    '/dynamic_data/authenticate/login?source=web';

  constructor() {
    this.instacartAuthRequest = axios.create({
      baseURL: 'https://www.instacart.com/v3',
    });
  }

  public async loginUser(emailAddress: string, password: string) {
    const loginResponse = await this.instacartAuthRequest.post(
      this.loginUserV3,
      {
        email: emailAddress,
        password,
        grant_type: 'email',
        scope: '',
        signup_v3_endpoints_web: null,
      },
      {
        withCredentials: false,
      }
    );

    return loginResponse;
  }
}
