import { NativeModules } from 'react-native'

const { UnityNativeModule } = NativeModules

export const UnityMessagePrefix = '@UnityMessage@'

export default class MessageHandler {
  public id: number
  public seq: 'start' | 'end' | ''
  public name: string
  public data: any

  constructor(id: number, seq: 'start' | 'end' | '', name: string, data: any) {
    this.id = id
    this.seq = seq
    this.name = name
    this.data = data
  }

  public static deserialize(message: string): MessageHandler {
    if (!MessageHandler.isUnityMessage(message)) {
      throw new Error(`"${message}" is't an UnityMessage.`)
    }
    message = message.replace(UnityMessagePrefix, '')
    const m = JSON.parse(message)
    const handler = new MessageHandler(m.id, m.seq, m.name, m.data)
    return handler
  }

  public static isUnityMessage(message: string) {
    if (message.startsWith(UnityMessagePrefix)) {
      return true
    } else {
      return false
    }
  }

  public send(data: any) {
    UnityNativeModule.postMessage(
      'UnityMessageManager',
      'onRNMessage',
      UnityMessagePrefix +
        JSON.stringify({
          id: this.id,
          seq: 'end',
          name: this.name,
          data: data,
        })
    )
  }
}
