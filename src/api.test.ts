import Axios from 'axios';

import { Api } from './api';

jest.mock('axios');
const mockAxios = Axios as jest.Mocked<typeof Axios>;

beforeAll(() => {
  mockAxios.create.mockReturnThis();
});

describe('Api', () => {

  describe('getRooms', () => {
    it('should return a list with one room', async () => {
      const data = [
        {
          'uuid': '66b8a96a-d759-ec11-94f6-e42aac6e0f30',
          'hasDefaultValues': false,
          'name': 'Vardagsrum',
          'nodeUuid': '65b8a96a-d759-ec11-94f6-e42aac6e0f30',
          'targetTemperature': 20,
          'activeControl': true,
        },
      ];
      mockAxios.get.mockImplementationOnce(() => Promise.resolve({status: 200, data: data}));
      const api = new Api('https://app.ngenic.se/api/v3', 'test');
      await expect(api.getRooms('1')).resolves.toEqual(data);
      expect(mockAxios.get).toHaveBeenCalledWith('/tunes/1/rooms');
    });
  });

});