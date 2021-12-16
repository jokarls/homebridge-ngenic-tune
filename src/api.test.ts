import Axios from 'axios';

import { Api } from './api';

jest.mock('axios');
const mockAxios = Axios as jest.Mocked<typeof Axios>;

const tunesData = [
  {
    'isInstalled': true,
    'isNetworkConnected': true,
    'name': 'Jonas Lundblad',
    'priceArea': 3,
    'tuneName': 'Skogshemsvägen 9',
    'tuneUuid': 'e3f05058-efcf-4184-a51e-25840c9461e5',
    'userName': 'jonas.lmk@gmail.com',
  },
];

const roomsData = [
  {
    'uuid': '66b8a96a-d759-ec11-94f6-e42aac6e0f30',
    'hasDefaultValues': false,
    'name': 'Vardagsrum',
    'nodeUuid': '65b8a96a-d759-ec11-94f6-e42aac6e0f30',
    'targetTemperature': 20,
    'activeControl': true,
  },
];

const measurementData = {
  'hasValue': true,
  'time': '2021-12-13T11:12:02 Europe/Stockholm',
  'value': 20.625,
};

beforeAll(() => {
  mockAxios.create.mockReturnThis();
  mockAxios.get.mockImplementation((url) => {
    switch(url) {
      case '/tunes':
        return Promise.resolve({status: 200, data: tunesData});
      case '/tunes/1/rooms':
        return Promise.resolve({status: 200, data: roomsData});
      case '/tunes/1/measurements/2/latest?type=temperature_C':
        return Promise.resolve({status: 200, data: measurementData});
      default:
        return Promise.reject(new Error('not found'));
    }
  });
});

describe('Api', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTunes', () => {
    it('should return a list with of tunes', async () => {
      const api = new Api('https://app.ngenic.se/api/v3', 'test');
      await expect(api.getTunes()).resolves.toEqual(tunesData);
      expect(mockAxios.get).toHaveBeenCalledWith('/tunes');
    });
  });

  describe('getRooms', () => {
    it('should return a list of rooms', async () => {
      const api = new Api('https://app.ngenic.se/api/v3', 'test');
      await expect(api.getRooms('1')).resolves.toEqual(roomsData);
      expect(mockAxios.get).toHaveBeenCalledWith('/tunes/1/rooms');
    });

  });

  describe('getMeasurement', () => {
    it('should return a measurement', async () => {
      const api = new Api('https://app.ngenic.se/api/v3', 'test');
      await expect(api.getMeasurement('1', '2')).resolves.toEqual(measurementData);
      expect(mockAxios.get).toHaveBeenCalledWith('/tunes/1/measurements/2/latest?type=temperature_C');
    });
  });

});