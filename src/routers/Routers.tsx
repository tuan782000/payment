import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import TransactionScreen from '../screens/Transaction/TransactionScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setBankInfo } from '../redux/reducers/bankSlice';

const Routers = () => {
    const dispatch = useDispatch();
    const { hasData } = useSelector((state: RootState) => state.bank);

    const [isLoading, setIsLoading] = useState(false);

    const checkData = async () => {
        try {
            setIsLoading(true);
            const jsonValue = await AsyncStorage.getItem('bankInfo');
            if (jsonValue) {
                const data = JSON.parse(jsonValue);
                dispatch(setBankInfo(data));
            }

            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            console.log(error);
        }

        // finally {
        //     setIsLoading(false);
        // }
    };

    useEffect(() => {
        checkData();
    }, [dispatch]);

    // Hiển thị SplashScreen trong khi kiểm tra dữ liệu
    if (isLoading) {
        return <SplashScreen />;
    }

    return (
        <NavigationContainer>
            {hasData ? <TransactionScreen /> : <HomeScreen />}
        </NavigationContainer>
    );
};

export default Routers;
