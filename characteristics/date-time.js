import bleno from 'bleno';

import { CHARACTERISTIC_DATE_TIME } from '../constants.js';

const stringToBytes = (data) => {
    var array = new Uint8Array(data.length);
    for (var i = 0, l = data.length; i < l; i++) {
        array[i] = data.charCodeAt(i);
     }
     return array.buffer;
};

function bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

export class DateTimeCharacteristic extends bleno.Characteristic {
    notifyCallback = null;
    data = Buffer.from("0");;
    
    constructor() {
        const options = {
            uuid: CHARACTERISTIC_DATE_TIME,
            properties: ['read', 'write'],
            value: null
        };

        super(options);
    }

    onReadRequest (offset, callback) {
        console.log('DateTimeCharacteristic - onReadRequest:', bytesToString(this.data));
      
        callback(this.RESULT_SUCCESS, this.data);
    };

    onWriteRequest (data, offset, withoutResponse, callback) {
        this.data = data;
      
        console.log('DateTimeCharacteristic - onWriteRequest:', bytesToString(this.data));
      
        if (this.notifyCallback) {
          console.log('DateTimeCharacteristic - onWriteRequest: notifying');
      
          this.notifyCallback(this.data);
        }
      
        callback(this.RESULT_SUCCESS);
      };
}