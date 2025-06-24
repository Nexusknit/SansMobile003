import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../config/api';

class ApiService {
  private client = axios.create({ baseURL: API_BASE_URL });

  private handleError(error: unknown) {
    console.error('API Error:', error);
    throw error;
  }

  private async request<T>(promise: Promise<AxiosResponse<T>>): Promise<AxiosResponse<T>> {
    try {
      return await promise;
    } catch (error) {
      this.handleError(error);
      throw error; // rethrow so callers can handle it
    }
  }

  public sendPhoneNumber(phone: string) {
    return this.request(this.client.post('/auth/login', { phone }));
  }

  public verifyCode(phone: string, code: string) {
    return this.request(this.client.post('/auth/verify', { phone, code }));
  }

  public completeProfile(token: string, firstName: string, lastName: string) {
    return this.request(
      this.client.post(
        '/auth/register',
        { firstName, lastName },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    );
  }

  public getProfile(token: string) {
    return this.request(
      this.client.get('/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
    );
  }
}

export default new ApiService();
