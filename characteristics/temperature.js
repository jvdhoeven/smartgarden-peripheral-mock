import bleno from 'bleno';
import { CHARACTERISTIC_TEMP } from '../constants.js';

export class TemperatureCharacteristic extends bleno.Characteristic {
    notifyCallback = null;
    data = Buffer.from("0");
    interval = null;

    constructor() {
        const options = {
            uuid: CHARACTERISTIC_TEMP,
            properties: ['read', 'notify'],
            value: null
        };

        super(options);
    }

    onReadRequest (offset, callback) {
        console.log('TemperatureCharacteristic - onReadRequest: value');
      
        callback(this.RESULT_SUCCESS, this.data);
    };

    onSubscribe (maxValueSize, notifyCallback) {
        console.log('TemperatureCharacteristic subscribe');

        let i = 0;
        this.interval = setInterval(() => {
            const fakeTemp = (Math.sin(Math.PI / 2 * ((i % 20) / 10)) * 10 + 5).toFixed(2);
            notifyCallback(Buffer.from(`${fakeTemp}`));
            i++;
        }, 1000);

        this.notifyCallback = notifyCallback;
    }

    onUnsubscribe () {
        console.log('TemperatureCharacteristic unsubscribe');
        clearInterval(this.interval);
        this.notifyCallback = null;
    };

}