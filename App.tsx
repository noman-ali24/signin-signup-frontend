/**
 * AutoPulse - React Native CLI Authentication & Mobility App
 * Built for iOS & Android
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { store } from './src/redux/store';
import { RootNavigator } from './src/navigation/RootNavigator';
import { toastConfig } from './src/components/CustomToast';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootNavigator />
        <Toast config={toastConfig} />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
