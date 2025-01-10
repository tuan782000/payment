// import { StyleSheet, Text, View } from 'react-native';
// import React, { useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import SplashScreen from '../screens/SplashScreen';
// import HomeScreen from '../screens/Home/HomeScreen';
// import TransactionScreen from '../screens/Transaction/TransactionScreen';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const authenticate = 1 > 2;

// const Routers = () => {
//     return 1 > 2 ? (
//         <SplashScreen />
//     ) : (
//         <NavigationContainer>
//             {authenticate ? <TransactionScreen /> : <HomeScreen />}
//         </NavigationContainer>
//     );
// };

// export default Routers;

import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import TransactionScreen from '../screens/Transaction/TransactionScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Routers = () => {
    const [loading, setLoading] = useState(true); // Trạng thái chờ kiểm tra dữ liệu
    const [hasData, setHasData] = useState(false); // Trạng thái dữ liệu từ AsyncStorage

    const checkData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('bankInfo');
            if (jsonValue) {
                setHasData(true); // Có dữ liệu
            } else {
                setHasData(false); // Không có dữ liệu
            }
        } catch (error) {
            console.error('Lỗi khi kiểm tra dữ liệu AsyncStorage:', error);
        } finally {
            setLoading(false); // Kết thúc kiểm tra
        }
    };

    useEffect(() => {
        checkData();
    }, []);

    // Hiển thị SplashScreen trong khi kiểm tra dữ liệu
    if (loading) {
        return <SplashScreen />;
    }

    return (
        <NavigationContainer>
            {hasData ? <TransactionScreen /> : <HomeScreen />}
        </NavigationContainer>
    );
};

export default Routers;
