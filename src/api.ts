import axios, { AxiosInstance } from 'axios';
import { Room, Tune } from './model';

export class Api {

  private client: AxiosInstance;

  constructor(baseUrl: string, pat: string) {
    this.client = axios.create({
      baseURL: baseUrl,
      headers: { 'Authorization': `Bearer ${pat}`},
    });
  }

  public async getTunes(): Promise<Tune[]> {
    const response = await this.client.get<Tune[]>('/tunes');
    return response.data;
  }

  public async getRooms(tuneId: string): Promise<Room[]> {
    const response = await this.client.get<Room[]>(`/tunes/${tuneId}/rooms`);
    return response.data;
  }
}
