import bleno from 'bleno';

import { CHARACTERISTIC_LOCATION } from '../constants.js';

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

export class LocationCharacteristic extends bleno.Characteristic {
    notifyCallback = null;
    data = Buffer.from("50.935173;6.953101");
    
    constructor() {
        const options = {
            uuid: CHARACTERISTIC_LOCATION,
            properties: ['read', 'write'],
            value: ""
        };

        super(options);
    }

    onReadRequest (offset, callback) {
        console.log('LocationCharacteristic - onReadRequest:', bytesToString(this.data));
      
        callback(this.RESULT_SUCCESS, this.data);
    };

    onWriteRequest (data, offset, withoutResponse, callback) {
        this.data = data;
      
        console.log('LocationCharacteristic - onWriteRequest: value', bytesToString(this.data));
      
        if (this.notifyCallback) {
          console.log('LocationCharacteristic - onWriteRequest: notifying');
      
          this.notifyCallback(this.data);
        }
      
        callback(this.RESULT_SUCCESS);
      };
}