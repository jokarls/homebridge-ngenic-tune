import { Service, PlatformAccessory, CharacteristicValue } from 'homebridge';

import { NgenicTunePlatform } from './platform';

export class NodeAccessory {
  private service: Service;

  constructor(
    private readonly platform: NgenicTunePlatform,
    private readonly accessory: PlatformAccessory,
  ) {

    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Ngenic')
      .setCharacteristic(this.platform.Characteristic.Model, 'Tune')
      .setCharacteristic(this.platform.Characteristic.SerialNumber, 'v3');

    this.service = this.accessory.getService(this.platform.Service.TemperatureSensor)
      || this.accessory.addService(this.platform.Service.TemperatureSensor);

    this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.displayName);

    this.service.getCharacteristic(this.platform.Characteristic.CurrentTemperature)
      .onGet(this.getCurrentTemperature.bind(this));
  }

  async getCurrentTemperature(): Promise<CharacteristicValue> {
    const tuneUuid = this.accessory.context.tune.tuneUuid;
    const nodeUuid = this.accessory.context.room.nodeUuid;
    const measurement = await this.platform.ngenicApi.getMeasurement(tuneUuid, nodeUuid);
    return measurement.value;
  }
}
