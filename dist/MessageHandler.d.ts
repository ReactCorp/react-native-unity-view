export declare const UnityMessagePrefix = "@UnityMessage@";
export default class MessageHandler {
    id: number;
    seq: 'start' | 'end' | '';
    name: string;
    data: any;
    constructor(id: number, seq: 'start' | 'end' | '', name: string, data: any);
    static deserialize(message: string): MessageHandler;
    static isUnityMessage(message: string): boolean;
    send(data: any): void;
}
