import * as React from 'react'

import { StyleSheet, View, Alert, Button } from 'react-native'
import UnityView, { UnityModule } from '@asmadsen/react-native-unity-view'

export default function App() {
  const onUnityMessage = React.useCallback((hander) => {
    console.log({ hander })
  }, [])

  const onClick = React.useCallback(() => {
    UnityModule.postMessageToUnityManager({
      name: 'ToggleRotate',
      data: '',
      callBack: (data) => {
        Alert.alert('Tip', JSON.stringify(data))
      },
    })
  }, [])

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <UnityView
          style={{ flex: 1 }}
          onMessage={onUnityMessage}
          onUnityMessage={onUnityMessage}
        />
      </View>
      <Button title="Toggle rotation" onPress={onClick} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  button: {
    width: '100%',
  },
})
