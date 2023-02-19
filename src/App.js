import React from "react";
import { request, PERMISSIONS } from "react-native-permissions";
import { extendTheme, NativeBaseProvider, Text } from "native-base";
import AppNavigator from "./navigation/AppNavigator";
import { Provider } from 'react-redux'
import { store } from "./store";
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store)

const App = () => {

  React.useEffect(() => {
    requestLocationPermission()
  }, [])

  async function requestLocationPermission() {
    let response2 = await request(PERMISSIONS.ANDROID.CAMERA)
    let response4 = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
    let response5 = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
  }

  const theme = extendTheme({
    //COLORS
    colors: {
      custom: {
        600: '#0fd48e',
      },
    },
    //COMPONENTS
    components: {
      Button: {
        defaultProps: {
          colorScheme: 'custom',
        }
      }
    }
  })

  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  )
}

export default App