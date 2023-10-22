import { NativeModules } from 'react-native';
const { UnityNativeModule } = NativeModules;
export const UnityMessagePrefix = '@UnityMessage@';
export default class MessageHandler {
    id;
    seq;
    name;
    data;
    constructor(id, seq, name, data) {
        this.id = id;
        this.seq = seq;
        this.name = name;
        this.data = data;
    }
    static deserialize(message) {
        if (!MessageHandler.isUnityMessage(message)) {
            throw new Error(`"${message}" is't an UnityMessage.`);
        }
        message = message.replace(UnityMessagePrefix, '');
        const m = JSON.parse(message);
        const handler = new MessageHandler(m.id, m.seq, m.name, m.data);
        return handler;
    }
    static isUnityMessage(message) {
        if (message.startsWith(UnityMessagePrefix)) {
            return true;
        }
        else {
            return false;
        }
    }
    send(data) {
        UnityNativeModule.postMessage('UnityMessageManager', 'onRNMessage', UnityMessagePrefix +
            JSON.stringify({
                id: this.id,
                seq: 'end',
                name: this.name,
                data: data,
            }));
    }
}
//# sourceMappingURL=MessageHandler.js.map