import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import React, { useState } from 'react';

interface Props {
    placeholder?: string;
    value: string;
    handleChange: (value: string) => void; // Hàm nhận chuỗi từ `TextInput`
    onDelete: () => void;
}

const InputComponent = (props: Props) => {
    const { placeholder, value, handleChange, onDelete } = props;
    return (
        <View style={styles.container}>
            {/* <Text>InputComponent</Text> */}
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                keyboardType='numeric'
                value={value.toString()}
                onChangeText={handleChange}
            />
            <TouchableOpacity onPress={onDelete}>
                <Text
                    style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}
                >
                    Xoá
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default InputComponent;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        marginTop: 20,
        borderRadius: 8,
        minHeight: 54,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center'
        // justifyContent: 'space-between'
    },
    input: {
        fontSize: 18,
        flex: 1
    }
});
