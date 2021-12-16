import axios, { AxiosInstance } from 'axios';
import { Measurement, Room, Tune } from './model';

export class NgenicApi {

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

  public async getMeasurement(tuneId: string, nodeId: string): Promise<Measurement> {
    const response = await this.client.get<Measurement>(`/tunes/${tuneId}/measurements/${nodeId}/latest?type=temperature_C`);
    return response.data;
  }
}
