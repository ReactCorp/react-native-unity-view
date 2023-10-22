import * as React from 'react'
import { requireNativeComponent, View, type ViewProps } from 'react-native'
import MessageHandler from './MessageHandler'
import { UnityModule } from './UnityModule'
import { Component } from 'react'

export interface UnityViewProps extends ViewProps {
  /**
   * Receive string message from unity.
   */
  onMessage?: (message: string) => void
  /**
   * Receive unity message from unity.
   */
  onUnityMessage?: (handler: MessageHandler) => void

  children?: React.ReactNode

  unloadOnUnmount?: boolean
}

interface UnityViewState {
  handle: number | null
}

let NativeUnityView = requireNativeComponent<UnityViewProps>('RNUnityView')

class UnityView extends Component<UnityViewProps, UnityViewState> {
  constructor(props: UnityViewProps) {
    super(props)
    this.state = {
      handle: null,
    }
  }

  componentDidMount(): void {
    const { onUnityMessage, onMessage } = this.props
    this.setState({
      handle: UnityModule.addMessageListener((message) => {
        if (onUnityMessage && message instanceof MessageHandler) {
          onUnityMessage(message)
        }
        if (onMessage && typeof message === 'string') {
          onMessage(message)
        }
      }),
    })
  }

  componentWillUnmount(): void {
    const { handle } = this.state
    const { unloadOnUnmount } = this.props

    if (handle !== null) {
      UnityModule.removeMessageListener(handle)
    }
    if (unloadOnUnmount) {
      UnityModule.unloadPlayer()
    }
  }

  render() {
    const { props } = this
    return (
      <View {...props}>
        <NativeUnityView
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
          onUnityMessage={props.onUnityMessage}
          onMessage={props.onMessage}
        />
        {props.children}
      </View>
    )
  }
}

/*
const UnityView = ({ onUnityMessage, onMessage, ...props } : UnityViewProps) => {
    const [handle, setHandle] = useState(null)

    useEffect(() => {
        setHandle(UnityModule.addMessageListener(message => {
            if (onUnityMessage && message instanceof MessageHandler) {
                onUnityMessage(message)
            }
            if (onMessage && typeof message === 'string') {
                onMessage(message)
            }
        }))
        return () => {
            UnityModule.removeMessageListener(handle)
        }
    }, [onUnityMessage, onMessage, handle, setHandle])

    return (
        <View {...props}>
            <NativeUnityView
                style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                onUnityMessage={onUnityMessage}
                onMessage={onMessage}
            >
            </NativeUnityView>
            {props.children}
        </View>
    )
}
*/

// NativeUnityView = requireNativeComponent<UnityViewProps>('RNUnityView')

export default UnityView
