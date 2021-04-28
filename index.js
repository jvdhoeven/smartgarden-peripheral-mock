import bleno from 'bleno';
import { TemperatureCharacteristic } from './characteristics/temperature.js';
import { MoistureCharacteristic } from './characteristics/moisture.js';

const { PrimaryService} = bleno;

const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising('Smartgarden', [ SERVICE_UUID ]);
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

  if (!error) {
    bleno.setServices([
      new PrimaryService({
        uuid: SERVICE_UUID,
        characteristics: [
          new TemperatureCharacteristic(),
          new MoistureCharacteristic()
        ]
      })
    ]);
  }
});