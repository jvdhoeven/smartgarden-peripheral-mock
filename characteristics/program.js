import bleno from 'bleno';

import { CHARACTERISTIC_PROGRAM } from '../constants.js';

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
        console.log('ProgramCharacteristic - onReadRequest: value');
      
        callback(this.RESULT_SUCCESS, this.data);
    };

    onWriteRequest (data, offset, withoutResponse, callback) {
        this.data = data;
      
        console.log('ProgramCharacteristic - onWriteRequest: value', data);
      
        if (this.notifyCallback) {
          console.log('ProgramCharacteristic - onWriteRequest: notifying');
      
          this.notifyCallback(this.data);
        }
      
        callback(this.RESULT_SUCCESS);
      };
}