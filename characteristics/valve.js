import bleno from 'bleno';

import { CHARACTERISTIC_VALVE } from '../constants.js';

export class ValveCharacteristic extends bleno.Characteristic {
    notifyCallback = null;
    data = Buffer.from("0");
    interval = null;
    valveState = 0;
    i = 0;

    constructor() {
        const options = {
            uuid: CHARACTERISTIC_VALVE,
            properties: ['read', 'write', 'notify'],
            value: null
        };

        super(options);
    }

    onReadRequest (offset, callback) {
        console.log('ValveCharacteristic - onReadRequest: value');
      
        const fake = this.i % 2;
        this.data = Buffer.from(`${fake}`)
        this.i++;

        callback(this.RESULT_SUCCESS, this.data);
    };

    onSubscribe (maxValueSize, notifyCallback) {
        console.log('ValveCharacteristic subscribe');

        this.interval = setInterval(() => {
            notifyCallback(Buffer.from(`${this.valveState}`));
        }, 10000);

        this.notifyCallback = notifyCallback;
    }

    onUnsubscribe () {
        console.log('ValveCharacteristic unsubscribe');

        clearInterval(this.interval);
        this.notifyCallback = null;
    };

    onWriteRequest (data, offset, withoutResponse, callback) {
        this.data = data;
      
        console.log('ValveCharacteristic - onWriteRequest: value', data);
      
        if (this.notifyCallback) {
          console.log('ValveCharacteristic - onWriteRequest: notifying');
      
          this.notifyCallback(this.data);
        }
      
        callback(this.RESULT_SUCCESS);
      };
}