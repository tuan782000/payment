// import {
//     StyleSheet,
//     Text,
//     View,
//     Image,
//     Alert,
//     TouchableOpacity
// } from 'react-native';
// import React, { useState } from 'react';
// import InputComponent from './src/components/InputComponent';
// import ButtonComponent from './src/components/ButtonComponent';
// import Tts from 'react-native-tts';
// import { readMoney } from './src/utils';

// const App = () => {
//     const [number, setNumber] = useState<string | number>(0);
//     const [imageUri, setImageUri] = useState<string | null>(null);
//     const [numberInWords, setNumberInWords] = useState<string>(''); // New state for number in words

//     const handleChangeValue = (val: string) => {
//         // Loại bỏ các ký tự không phải số
//         const numericValue = val.replace(/\D/g, '');

//         // Kiểm tra độ dài số
//         if (numericValue.length > 12) {
//             Alert.alert('Thông báo', 'Không được nhập quá 12 chữ số!');
//             return;
//         }

//         const parsedNumber = parseFloat(numericValue) || 0;
//         setNumber(parsedNumber);
//         setNumberInWords(readMoney(parsedNumber)); // Cập nhật số tiền bằng chữ
//         // Update number in words when the number changes
//     };

//     const createTransaction = async () => {
//         const url = `https://img.vietqr.io/image/TCB-7778748901-print.png?amount=${number}&addInfo=Chuc%20mung%20nam%20moi&accountName=Nguyen%20Thai%20Tuan`;
//         // const url = `https://img.vietqr.io/image/BIDV-5801216109-print.png?amount=${number}&addInfo=Chuc%20mung%20nam%20moi&accountName=Nguyen%20Ha%20Duc%20Thanh`;
//         console.log(url);
//         setImageUri(url);
//     };

//     const handleDelete = () => {
//         setNumber(0);
//         setImageUri(null);
//         setNumberInWords('');
//     };

//     return (
//         <View>
//             <InputComponent
//                 placeholder={'Nhập số tiền'}
//                 value={number.toString()}
//                 handleChange={handleChangeValue}
//                 onDelete={handleDelete}
//             />
//             {/* Display number in words */}
//             {numberInWords && (
//                 <TouchableOpacity
//                     onPress={() => {
//                         Tts.setDefaultLanguage('vi-VN');
//                         Tts.setDefaultVoice('vi-VN-language');
//                         Tts.speak(`${numberInWords}`);
//                         console.log('Hello');
//                     }}
//                 >
//                     <Text style={styles.numberInWords}>{numberInWords}</Text>
//                 </TouchableOpacity>
//             )}
//             <ButtonComponent
//                 onPress={createTransaction}
//                 title='Tạo mã chuyển tiền'
//                 disabled={number === 0 ? true : false}
//             />
//             {imageUri && (
//                 <Image source={{ uri: imageUri }} style={styles.image} />
//             )}
//         </View>
//     );
// };

// export default App;

import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import InputComponent from './src/components/InputComponent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import Routers from './src/routers/Routers';
// 2 ông này hỗ trợ modalize
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host } from 'react-native-portalize';
//

const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Host>
                <StatusBar
                    translucent // thằng này làm cho status bar nổi lên bề mặt
                    barStyle={'dark-content'}
                    backgroundColor={'transparent'}
                />
                <Routers />
            </Host>
        </GestureHandlerRootView>
    );
};

export default App;

const styles = StyleSheet.create({});
