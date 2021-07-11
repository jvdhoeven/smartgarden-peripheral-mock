import bleno from 'bleno';

import { CHARACTERISTIC_PROGRAM } from '../constants.js';

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

export class ProgramCharacteristic extends bleno.Characteristic {
    notifyCallback = null;
    data = Buffer.from("0");
    
    constructor() {
        const options = {
            uuid: CHARACTERISTIC_PROGRAM,
            properties: ['read', 'write'],
            value: null
        };

        super(options);
    }

    onReadRequest (offset, callback) {
        console.log('ProgramCharacteristic - onReadRequest:', bytesToString(this.data));
      
        callback(this.RESULT_SUCCESS, this.data);
    };

    onWriteRequest (data, offset, withoutResponse, callback) {
        this.data = data;
      
        console.log('ProgramCharacteristic - onWriteRequest: value', bytesToString(this.data));
      
        if (this.notifyCallback) {
          console.log('ProgramCharacteristic - onWriteRequest: notifying');
      
          this.notifyCallback(this.data);
        }
      
        callback(this.RESULT_SUCCESS);
      };
}