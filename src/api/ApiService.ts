import axios from 'axios';
import { API_BASE_URL } from '../config/api';

class ApiService {
  private client = axios.create({ baseURL: API_BASE_URL });

  public async sendPhoneNumber(phone: string) {
    return this.client.post('/auth/login', { phone });
  }

  public async verifyCode(phone: string, code: string) {
    return this.client.post('/auth/verify', { phone, code });
  }

  public async completeProfile(token: string, firstName: string, lastName: string) {
    return this.client.post(
      '/auth/register',
      { firstName, lastName },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  public async getProfile(token: string) {
    return this.client.get('/user/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new ApiService();
