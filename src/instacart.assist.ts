import { InstacartAPIRequest } from './api/instacart.api.request';
import { InstacartAuthApi } from './api/instacartAuth.api.request';

class InstacartAssit {
  private instacartApi: InstacartAPIRequest | undefined;

  constructor(emailAddress: string, password: string) {
    const instacartAuthApi = new InstacartAuthApi();

    instacartAuthApi
      .loginUser(emailAddress, password)
      .then(res => {
        const { headers } = res;
        if (headers?.['set-cookie']) {
          console.log(res.headers);
          this.instacartApi = new InstacartAPIRequest(res.headers);
        }
      })
      .catch(() => {
        throw new Error('Cannot login to InstaCart');
      });
  }

  public async getAllStoresInArea() {
    if (!this.instacartApi) {
      return;
    }

    const data = await this.instacartApi.getAllStoresInArea();
    console.log(data);
  }
}

export default InstacartAssit;
