import bleno from 'bleno';

const CHARACTERISTIC_MOIST_UUID = "9a0c0611-a48f-4dbc-bde2-31582e606ee5";

export class MoistureCharacteristic extends bleno.Characteristic {
    notifyCallback = null;
    data = Buffer.from("0");
    interval = null;

    constructor() {
        const options = {
            uuid: CHARACTERISTIC_MOIST_UUID,
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

        let i = 0;
        this.interval = setInterval(() => {
            const fakeMoist = (Math.sin(Math.PI / 2 * ((i % 20) / 10)) * 10 + 5).toFixed(2);
            notifyCallback(Buffer.from(`${fakeTemp}`));
            i++;
        }, 1000);

        this.notifyCallback = notifyCallback;
    }

    onUnsubscribe () {
        clearInterval(this.interval);
        this.notifyCallback = null;
    };

    onWriteRequest (data, offset, withoutResponse, callback) {
        this.data = data;
      
        console.log('EchoCharacteristic - onWriteRequest: value');
      
        if (this.notifyCallback) {
          console.log('EchoCharacteristic - onWriteRequest: notifying');
      
          this.notifyCallback(this.data);
        }
      
        callback(this.RESULT_SUCCESS);
      };
}