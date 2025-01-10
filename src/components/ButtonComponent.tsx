import {
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';
import React from 'react';

interface Props {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    buttonStyles?: StyleProp<ViewStyle>;
}

const ButtonComponent = (props: Props) => {
    const { title, onPress, disabled, buttonStyles } = props;
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.button,
                { backgroundColor: disabled ? 'gray' : 'coral' },
                buttonStyles
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
        minHeight: 54,
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
