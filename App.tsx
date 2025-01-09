import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TouchableOpacity
} from 'react-native';
import React, { useState } from 'react';
import InputComponent from './components/InputComponent';
import ButtonComponent from './components/ButtonComponent';
import Tts from 'react-native-tts';

const unitTexts = [
    '',
    'một',
    'hai',
    'ba',
    'bốn',
    'năm',
    'sáu',
    'bảy',
    'tám',
    'chín'
];
const scaleTexts = ['', 'nghìn', 'triệu', 'tỷ'];

function readThreeDigits(number: any, hasScale = false) {
    const hundreds = Math.floor(number / 100);
    const remainder = number % 100;
    const tens = Math.floor(remainder / 10);
    const units = remainder % 10;

    let result = '';

    if (hundreds > 0) {
        result += unitTexts[hundreds] + ' trăm ';
    } else if (hasScale) {
        result += 'không trăm ';
    }

    if (tens > 1) {
        result += unitTexts[tens] + ' mươi ';
    } else if (tens === 1) {
        result += 'mười ';
    } else if (hasScale && units > 0) {
        result += 'lẻ ';
    }

    if (tens > 1 && units === 1) {
        result += 'mốt';
    } else if (tens > 0 && units === 5) {
        result += 'lăm';
    } else if (units > 0) {
        result += unitTexts[units];
    }

    return result.trim();
}

function readMoney(number: any) {
    if (number === 0) {
        return 'không đồng';
    }
    let result = '';
    let index = 0;
    let lastIndex = Math.floor(String(number).length / 3);

    do {
        const threeDigits = number % 1000;

        const hasScale = index !== lastIndex;

        const text = readThreeDigits(threeDigits, hasScale);

        if (threeDigits > 0) {
            const unit = scaleTexts[index];
            result = `${text} ${unit} ${result}`;
        }

        number = Math.floor(number / 1000);
        index++;
    } while (number > 0);

    return result.trim() + ' đồng';
}

const App = () => {
    const [number, setNumber] = useState<string | number>(0);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [numberInWords, setNumberInWords] = useState<string>(''); // New state for number in words

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
        setNumberInWords(readMoney(parsedNumber)); // Cập nhật số tiền bằng chữ
        // Update number in words when the number changes
    };

    const createTransaction = async () => {
        const url = `https://img.vietqr.io/image/TCB-7778748901-print.png?amount=${number}&addInfo=Chuc%20mung%20nam%20moi&accountName=Nguyen%20Thai%20Tuan`;
        // const url = `https://img.vietqr.io/image/BIDV-5801216109-print.png?amount=${number}&addInfo=Chuc%20mung%20nam%20moi&accountName=Nguyen%20Ha%20Duc%20Thanh`;
        console.log(url);
        setImageUri(url);
    };

    const handleDelete = () => {
        setNumber(0);
        setImageUri(null);
        setNumberInWords('');
    };

    return (
        <View>
            <InputComponent
                placeholder={'Nhập số tiền'}
                value={number.toString()}
                handleChange={handleChangeValue}
                onDelete={handleDelete}
            />
            {/* Display number in words */}
            {numberInWords && (
                <TouchableOpacity
                    onPress={() => {
                        Tts.setDefaultLanguage('vi-VN');
                        Tts.setDefaultVoice('vi-VN-language');
                        Tts.speak(`${numberInWords}`);
                        console.log('Hello');
                    }}
                >
                    <Text style={styles.numberInWords}>{numberInWords}</Text>
                </TouchableOpacity>
            )}
            <ButtonComponent
                onPress={createTransaction}
                title='Tạo mã chuyển tiền'
                disabled={number === 0 ? true : false}
            />
            {imageUri && (
                <Image source={{ uri: imageUri }} style={styles.image} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
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
    }
});

export default App;
