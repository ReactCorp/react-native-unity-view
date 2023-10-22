import * as React from 'react';
import { type ViewProps } from 'react-native';
import MessageHandler from './MessageHandler';
import { Component } from 'react';
export interface UnityViewProps extends ViewProps {
    /**
     * Receive string message from unity.
     */
    onMessage?: (message: string) => void;
    /**
     * Receive unity message from unity.
     */
    onUnityMessage?: (handler: MessageHandler) => void;
    children?: React.ReactNode;
    unloadOnUnmount?: boolean;
}
interface UnityViewState {
    handle: number | null;
}
declare class UnityView extends Component<UnityViewProps, UnityViewState> {
    constructor(props: UnityViewProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.JSX.Element;
}
export default UnityView;
