import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SpaceComponent } from '../components';

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.textContent}>Payment App</Text>
            <SpaceComponent height={20} />
            <ActivityIndicator size={50} />
            <SpaceComponent height={20} />
            <Text>Vui lòng đợi trong giây lát...</Text>
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContent: {
        textAlign: 'center',
        fontSize: 54,
        fontWeight: 'bold'
    }
});
