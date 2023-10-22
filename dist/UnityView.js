import * as React from 'react';
import { requireNativeComponent, View } from 'react-native';
import MessageHandler from './MessageHandler';
import { UnityModule } from './UnityModule';
import { Component } from 'react';
let NativeUnityView = requireNativeComponent('RNUnityView');
class UnityView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handle: null,
        };
    }
    componentDidMount() {
        const { onUnityMessage, onMessage } = this.props;
        this.setState({
            handle: UnityModule.addMessageListener((message) => {
                if (onUnityMessage && message instanceof MessageHandler) {
                    onUnityMessage(message);
                }
                if (onMessage && typeof message === 'string') {
                    onMessage(message);
                }
            }),
        });
    }
    componentWillUnmount() {
        const { handle } = this.state;
        const { unloadOnUnmount } = this.props;
        if (handle !== null) {
            UnityModule.removeMessageListener(handle);
        }
        if (unloadOnUnmount) {
            UnityModule.unloadPlayer();
        }
    }
    render() {
        const { props } = this;
        return (React.createElement(View, { ...props },
            React.createElement(NativeUnityView, { style: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }, onUnityMessage: props.onUnityMessage, onMessage: props.onMessage }),
            props.children));
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
export default UnityView;
//# sourceMappingURL=UnityView.js.map