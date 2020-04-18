import axios, { AxiosInstance } from 'axios';
import cookieParser from 'cookie';

interface IAuthCreds {
  emailAddress: string | null;
  password: string | null;
}

export class InstacartAuthApi {
  private readonly authCreds: IAuthCreds = {
    emailAddress: null,
    password: null,
  };

  private readonly instacartAuthRequest: AxiosInstance;

  private readonly loginUserV3: string =
    '/dynamic_data/authenticate/login?source=web';

  // private readonly facebookLoginV2: string =
  //   'https://www.instacart.com/api/v2/user/facebook_auth_client?source=web';

  constructor(emailAddress: string, password: string) {
    // Assign Auth credentials and lock these credentials
    Object.assign(this.authCreds, { emailAddress, password });
    Object.freeze(this.authCreds);
    Object.seal(this.authCreds);

    this.instacartAuthRequest = axios.create({
      baseURL: 'https://www.instacart.com/v3',
    });
  }

  /**
   * @description
   * This method is used to initialize the user's access, to the API before making any continuous requests.
   * This does not yet support OAUTH login. Fetches the session cookie and possible remember_user_token
   * @param {String} emailAddress Instacart Email Address for Authentication
   * @param {String} password Instacart Password
   */
  public async loginUser() {
    let sessionToken: string = '';
    let rememberUserToken: string = '';

    try {
      const res = await this.instacartAuthRequest.post(
        this.loginUserV3,
        {
          email: this.authCreds.emailAddress,
          password: this.authCreds.password,
          grant_type: 'email',
          scope: '',
          signup_v3_endpoints_web: null,
        },
        {
          withCredentials: false,
        }
      );

      const { headers } = res;

      if (headers?.['set-cookie']) {
        for (const cookie of headers['set-cookie']) {
          const parsedCookie = cookieParser.parse(cookie);
          if (parsedCookie?._instacart_session) {
            sessionToken = parsedCookie._instacart_session as string;
          } else if (parsedCookie?.remember_user_token) {
            sessionToken = parsedCookie.remember_user_token as string;
          }
        }
      }

      if (!sessionToken) {
        throw new Error('Cannot fetch user session for InstaCart Account');
      }
    } catch (error) {
      throw new Error('Cannot make request to login to Instcart successfully');
    }

    return { sessionToken, rememberUserToken };
  }
}
