import { DeviceEventEmitter, NativeModules } from 'react-native';
import MessageHandler, { UnityMessagePrefix } from './MessageHandler';
const { UnityNativeModule } = NativeModules;
let sequence = 0;
function generateId() {
    sequence = sequence + 1;
    return sequence;
}
const waitCallbackMessageMap = {};
function handleMessage(message) {
    if (MessageHandler.isUnityMessage(message)) {
        const handler = MessageHandler.deserialize(message);
        if (handler.seq === 'end') {
            // handle callback message
            const m = waitCallbackMessageMap[handler.id];
            delete waitCallbackMessageMap[handler.id];
            if (m && m.callBack != null) {
                m.callBack(handler.data);
            }
            return;
        }
        else {
            return handler;
        }
    }
    else {
        return message;
    }
}
class UnityModuleImpl {
    hid = 0;
    stringListeners = {};
    unityMessageListeners = {};
    constructor() {
        this.createListeners();
    }
    async isReady() {
        return UnityNativeModule.isReady();
    }
    async unloadPlayer() {
        return UnityNativeModule.unloadPlayer();
    }
    async createUnity() {
        return UnityNativeModule.createUnity();
    }
    postMessageToUnityManager(message) {
        if (typeof message === 'string') {
            this.postMessage('UnityMessageManager', 'onMessage', message);
        }
        else {
            const id = generateId();
            if (message.callBack) {
                waitCallbackMessageMap[id] = message;
            }
            this.postMessage('UnityMessageManager', 'onRNMessage', UnityMessagePrefix +
                JSON.stringify({
                    id: id,
                    seq: message.callBack ? 'start' : '',
                    name: message.name,
                    data: message.data,
                }));
        }
    }
    postMessage(gameObject, methodName, message) {
        UnityNativeModule.postMessage(gameObject, methodName, message);
    }
    pause() {
        UnityNativeModule.pause();
    }
    resume() {
        UnityNativeModule.resume();
    }
    addMessageListener(listener) {
        const id = this.getHandleId();
        this.stringListeners[id] = listener;
        this.unityMessageListeners[id] = listener;
        return id;
    }
    addStringMessageListener(listener) {
        const id = this.getHandleId();
        this.stringListeners[id] = listener;
        return id;
    }
    addUnityMessageListener(listener) {
        const id = this.getHandleId();
        this.unityMessageListeners[id] = listener;
        return id;
    }
    removeMessageListener(handleId) {
        if (this.unityMessageListeners[handleId]) {
            delete this.unityMessageListeners[handleId];
        }
        if (this.stringListeners[handleId]) {
            delete this.stringListeners[handleId];
        }
    }
    createListeners() {
        this.stringListeners = {};
        this.unityMessageListeners = {};
        DeviceEventEmitter.addListener('onUnityMessage', (message) => {
            const result = handleMessage(message);
            if (result instanceof MessageHandler) {
                Object.values(this.unityMessageListeners).forEach((listener) => {
                    listener(result);
                });
            }
            if (typeof result === 'string') {
                Object.values(this.stringListeners).forEach((listener) => {
                    listener(result);
                });
            }
        });
    }
    getHandleId() {
        this.hid = this.hid + 1;
        return this.hid;
    }
}
export const UnityModule = new UnityModuleImpl();
//# sourceMappingURL=UnityModule.js.map