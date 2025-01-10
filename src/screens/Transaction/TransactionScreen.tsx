import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { readMoney } from '../../utils';
import {
    ButtonComponent,
    InputComponent,
    SpaceComponent
} from '../../components';
import Tts from 'react-native-tts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch } from 'react-redux';
import { clearBankInfo } from '../../redux/reducers/bankSlice';

const TransactionScreen = () => {
    const dispatch = useDispatch();
    // state liên quan đến tiền
    const [number, setNumber] = useState<string | number>('');
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [numberInWords, setNumberInWords] = useState<string>('');

    // state liên qua đến tài khoản và ngân hàng
    const [numberAccount, setNumberAccount] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const [selectedNameBank, setSelectedNameBank] = useState('');

    const handleChangeValue = (val: string) => {
        // Loại bỏ các ký tự không phải số
        const numericValue = val.replace(/\D/g, '');

        // Kiểm tra độ dài số
        if (numericValue.length > 12) {
            Alert.alert('Thông báo', 'Không được nhập quá 12 chữ số!');
            return;
        }

        const parsedNumber = parseFloat(numericValue) || 0;
        setNumber(parsedNumber);
        setNumberInWords(readMoney(parsedNumber));
    };

    const createTransaction = async () => {
        const url = `https://img.vietqr.io/image/${selectedBank}-${numberAccount}-print.png?amount=${number}&addInfo=Chuc%20mung%20nam%20moi`;
        // const url = `https://img.vietqr.io/image/${selectedBank}-${numberAccount}-print.png?amount=${number}&addInfo=Chuc%20mung%20nam%20moi&accountName=Nguyen%20Thai%20Tuan`;
        // const url = `https://img.vietqr.io/image/BIDV-5801216109-print.png?amount=${number}&addInfo=Chuc%20mung%20nam%20moi&accountName=Nguyen%20Ha%20Duc%20Thanh`;
        setImageUri(url);
    };

    const handleDelete = () => {
        setNumber('');
        setImageUri(null);
        setNumberInWords('');
    };

    const getDataFromAsyncStore = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('bankInfo');
            const data = jsonValue != null ? JSON.parse(jsonValue) : null;
            if (data) {
                setNumberAccount(data.numberAccount || '');
                setSelectedBank(data.selectedBank.code || '');
                setSelectedNameBank(data.selectedBank.short_name || '');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDataFromAsyncStore();
    }, []);

    const handleChangeAccount = async () => {
        try {
            await AsyncStorage.removeItem('bankInfo');
            dispatch(clearBankInfo());
        } catch (error) {
            // remove error
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <SpaceComponent height={40} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Text style={styles.textInfo}>STK:</Text>
                        <SpaceComponent width={10} />
                        <Text style={styles.textInfo}>{numberAccount}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.textInfo}>Ngân hàng:</Text>
                        <SpaceComponent width={10} />
                        <Text style={styles.textInfo}>{selectedNameBank}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => handleChangeAccount()}>
                    <Entypo name='cycle' size={30} />
                </TouchableOpacity>
            </View>

            <SpaceComponent height={30} />

            <InputComponent
                placeholder={'Nhập số tiền'}
                value={number.toString()}
                handleChange={handleChangeValue}
                onDelete={handleDelete}
                keyboardType={'numeric'}
                allowClear
            />
            {/* Display number in words */}
            {numberInWords && (
                <TouchableOpacity
                    onPress={() => {
                        Tts.setDefaultLanguage('vi-VN');
                        Tts.setDefaultVoice('vi-VN-language');
                        Tts.speak(`${numberInWords}`);
                    }}
                >
                    <Text style={styles.numberInWords}>{numberInWords}</Text>
                </TouchableOpacity>
            )}
            <SpaceComponent height={20} />
            <ButtonComponent
                onPress={createTransaction}
                title='Tạo mã chuyển tiền'
                disabled={number === 0 || number === '' ? true : false}
            />

            {imageUri && (
                <Image source={{ uri: imageUri }} style={styles.image} />
            )}
        </View>
    );
};

export default TransactionScreen;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    numberInWords: {
        fontSize: 24,
        marginTop: 10,
        color: 'black',
        textAlign: 'center',
        paddingHorizontal: 10
    },
    image: {
        width: 400,
        height: 400,
        marginTop: 20,
        objectFit: 'contain'
    },
    textInfo: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});
