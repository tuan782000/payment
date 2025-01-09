import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

interface Props {
    title: string;
    onPress: () => void;
    disabled: boolean;
}

const ButtonComponent = (props: Props) => {
    const { title, onPress, disabled } = props;
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.button,
                { backgroundColor: disabled ? 'gray' : 'coral' }
            ]}
            disabled={disabled}
        >
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

export default ButtonComponent;

const styles = StyleSheet.create({
    button: {
        marginTop: 40,
        // backgroundColor: 'coral',
        minHeight: 54,
        marginHorizontal: 20,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    }
});
