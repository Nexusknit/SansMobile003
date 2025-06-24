import axios from 'axios';
import { API_BASE_URL, API_PATHS } from '../config/api';

class ApiService {
  private client = axios.create({ baseURL: API_BASE_URL });

  public async sendPhoneNumber(phone: string) {
    return this.client.post(API_PATHS.LOGIN, { phone });
  }

  public async verifyCode(phone: string, code: string) {
    return this.client.post(API_PATHS.VERIFY, { phone, code });
  }

  public async completeProfile(token: string, firstName: string, lastName: string) {
    return this.client.post(
      API_PATHS.REGISTER,
      { firstName, lastName },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  public async getProfile(token: string) {
    return this.client.get(API_PATHS.PROFILE, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new ApiService();
