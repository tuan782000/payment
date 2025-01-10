import React from 'react';
import { StatusBar } from 'react-native';
import Routers from './src/routers/Routers';
// 2 ông này hỗ trợ modalize
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host } from 'react-native-portalize';
// redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
//

const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Host>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <StatusBar
                            translucent // thằng này làm cho status bar nổi lên bề mặt
                            barStyle={'dark-content'}
                            backgroundColor={'transparent'}
                        />
                    </PersistGate>
                    <Routers />
                </Provider>
            </Host>
        </GestureHandlerRootView>
    );
};

export default App;
