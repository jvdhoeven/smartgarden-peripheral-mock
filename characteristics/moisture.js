import bleno from 'bleno';
import { CHARACTERISTIC_MOISTURE } from '../constants.js';

export class MoistureCharacteristic extends bleno.Characteristic {
    notifyCallback = null;
    data = Buffer.from("0");
    interval = null;

    constructor() {
        const options = {
            uuid: CHARACTERISTIC_MOISTURE,
            properties: ['read', 'notify'],
            value: null
        };

        super(options);
    }

    onReadRequest (offset, callback) {
        console.log('MoistureCharacteristic - onReadRequest: value');
      
        callback(this.RESULT_SUCCESS, this.data);
    };

    onSubscribe (maxValueSize, notifyCallback) {
        console.log('MoistureCharacteristic subscribe');

        let i = 0;
        this.interval = setInterval(() => {
            const fakeMoist = (Math.sin(Math.PI / 2 * ((i % 20) / 10)) * 10 + 5).toFixed(2);
            notifyCallback(Buffer.from(`${fakeMoist}`));
            i++;
        }, 1000);

        this.notifyCallback = notifyCallback;
    }

    onUnsubscribe () {
        console.log('MoistureCharacteristic unsubscribe');
        clearInterval(this.interval);
        this.notifyCallback = null;
    };
}