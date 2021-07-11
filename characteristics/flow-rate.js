import bleno from 'bleno';

import { CHARACTERISTIC_FLOW_RATE } from '../constants.js';

function bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

export class FlowRateCharacteristic extends bleno.Characteristic {
    notifyCallback = null;
    data = Buffer.from("3");
    
    constructor() {
        const options = {
            uuid: CHARACTERISTIC_FLOW_RATE,
            properties: ['read', 'write'],
            value: null
        };

        super(options);
    }

    onReadRequest (offset, callback) {
        console.log('FlowRateCharacteristic - onReadRequest:', bytesToString(this.data));
      
        callback(this.RESULT_SUCCESS, this.data);
    };

    onWriteRequest (data, offset, withoutResponse, callback) {
        this.data = data;
      
        console.log('FlowRateCharacteristic - onWriteRequest: value', bytesToString(data));
      
        if (this.notifyCallback) {
          console.log('FlowRateCharacteristic - onWriteRequest: notifying');
      
          this.notifyCallback(this.data);
        }
      
        callback(this.RESULT_SUCCESS);
      };
}