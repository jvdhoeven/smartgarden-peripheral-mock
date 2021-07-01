import bleno from 'bleno';
import { TemperatureCharacteristic } from './characteristics/temperature.js';
import { MoistureCharacteristic } from './characteristics/moisture.js';
import { TemperatureGroundCharacteristic } from './characteristics/temperature_ground.js';
import { ValveCharacteristic } from './characteristics/valve.js';
import { ProgramCharacteristic } from './characteristics/program.js';
import { DateTimeCharacteristic } from './characteristics/date-time.js';
import { LocationCharacteristic } from './characteristics/location.js';
import { FlowRateCharacteristic } from './characteristics/flow-rate.js';

import { SERVICE_UUID } from './constants.js';

const { PrimaryService} = bleno;

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising('SmartgardenMock', [ SERVICE_UUID ]);
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
          new TemperatureGroundCharacteristic(),
          new MoistureCharacteristic(),
          new ValveCharacteristic(),
          new ProgramCharacteristic(),
          new DateTimeCharacteristic(),
          new LocationCharacteristic(),
          new FlowRateCharacteristic()
        ]
      })
    ]);
  }
});