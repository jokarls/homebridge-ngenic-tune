import { API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic } from 'homebridge';

import { PLATFORM_NAME, PLUGIN_NAME } from './settings';
import { NodeAccessory } from './nodeAccessory';
import { NgenicApi } from './api';

/**
 * HomebridgePlatform
 * This class is the main constructor for your plugin, this is where you should
 * parse the user config and discover/register accessories with Homebridge.
 */
export class NgenicTunePlatform implements DynamicPlatformPlugin {

  public readonly Service: typeof Service = this.api.hap.Service;
  public readonly Characteristic: typeof Characteristic = this.api.hap.Characteristic;
  public readonly ngenicApi: NgenicApi;
  public readonly accessories: PlatformAccessory[] = [];

  constructor(
    public readonly log: Logger,
    public readonly config: PlatformConfig,
    public readonly api: API,
  ) {
    this.log.debug('Finished initializing platform:', this.config.name);

    this.ngenicApi = new NgenicApi('https://app.ngenic.se/api/v3', config.pat);

    this.api.on('didFinishLaunching', () => {
      log.debug('Executed didFinishLaunching callback');
      this.discoverDevices();
    });
  }

  configureAccessory(accessory: PlatformAccessory) {
    this.log.info('Loading accessory from cache:', accessory.displayName);
    this.accessories.push(accessory);
  }

  async discoverDevices() {

    const tunes = await this.ngenicApi.getTunes();
    for (const tune of tunes) {
      const rooms = await this.ngenicApi.getRooms(tune.tuneUuid);
      for (const room of rooms) {
        const existingAccessory = this.accessories.find(accessory => accessory.UUID === room.nodeUuid);

        if (existingAccessory) {
          this.log.info('Restoring existing accessory from cache:', existingAccessory.displayName);
          new NodeAccessory(this, existingAccessory);
        } else {
          const displayName = `${tune.tuneName} ${room.name}`;
          this.log.info('Adding new accessory:', displayName);

          const accessory = new this.api.platformAccessory(displayName, room.nodeUuid);
          accessory.context.tune = tune;
          accessory.context.room = room;

          new NodeAccessory(this, accessory);

          this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
        }
      }
    }
  }
}
