import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import React, { ReactNode, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
    label?: string;
    placeholder?: string;
    value: string;
    handleChange: (value: string) => void; // Hàm nhận chuỗi từ `TextInput`
    allowClear?: boolean;
    onDelete?: () => void;
    prefixIcon?: ReactNode; // component thì để là ReactNode
    keyboardType:
        | 'default'
        | 'number-pad'
        | 'decimal-pad'
        | 'numeric'
        | 'email-address'
        | 'phone-pad'
        | 'url';
}

const InputComponent = (props: Props) => {
    const {
        label,
        placeholder,
        value,
        handleChange,
        onDelete,
        prefixIcon,
        keyboardType,
        allowClear
    } = props;
    return (
        <View>
            {label && (
                <Text
                    style={{
                        marginBottom: 8,
                        fontSize: 18,
                        fontWeight: 'bold'
                    }}
                >
                    {label}
                </Text>
            )}
            <View style={styles.container}>
                {prefixIcon && prefixIcon}
                <TextInput
                    style={[styles.input, { marginLeft: prefixIcon ? 10 : 0 }]}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    value={value}
                    onChangeText={handleChange}
                    autoCapitalize='none'
                />
                {value.length > 0 && allowClear && (
                    <TouchableOpacity onPress={onDelete}>
                        <AntDesign
                            name='closecircle'
                            size={20}
                            style={{ fontWeight: 'bold' }}
                            color={'red'}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default InputComponent;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 8,
        minHeight: 54,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center'
        // justifyContent: 'space-between'
    },
    input: {
        fontSize: 18,
        flex: 1
    }
});
