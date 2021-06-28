import bleno from 'bleno';

import { CHARACTERISTIC_VALVE } from '../constants.js';

export class ValveCharacteristic extends bleno.Characteristic {
    notifyCallback = null;
    data = Buffer.from("0");
    interval = null;
    valveState = 0;

    constructor() {
        const options = {
            uuid: CHARACTERISTIC_VALVE,
            properties: ['read', 'write', 'notify'],
            value: null
        };

        super(options);
    }

    onReadRequest (offset, callback) {
        console.log('EchoCharacteristic - onReadRequest: value');
      
        callback(this.RESULT_SUCCESS, this.data);
    };

    onSubscribe (maxValueSize, notifyCallback) {
        console.log('SensorACharacteristic subscribe');

        this.interval = setInterval(() => {
            notifyCallback(Buffer.from(`${this.valveState}`));
        }, 1000);

        this.notifyCallback = notifyCallback;
    }

    onUnsubscribe () {
        clearInterval(this.interval);
        this.notifyCallback = null;
    };

    onWriteRequest (data, offset, withoutResponse, callback) {
        this.data = data;
      
        console.log('EchoCharacteristic - onWriteRequest: value', data);
      
        if (this.notifyCallback) {
          console.log('EchoCharacteristic - onWriteRequest: notifying');
      
          this.notifyCallback(this.data);
        }
      
        callback(this.RESULT_SUCCESS);
      };
}