import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import {
    ButtonComponent,
    DropDownPickerComponent,
    InputComponent,
    SpaceComponent
} from '../../components';
import { SelectModel } from '../../models/SelectModel';
import { setBankInfo } from '../../redux/reducers/bankSlice';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const [banks, setBanks] = useState<SelectModel[]>([]); // danh sách ngân hàng
    const [selectedBank, setSelectedBank] = useState<any>(null); // ngân hàng bạn đã chọn
    const [numberAccount, setNumberAccount] = useState(''); // stk ngân hàng

    const fetchBanks = async () => {
        try {
            const response = await axios.get('https://api.vietqr.io/v2/banks');
            const data = await response.data.data;
            // custom lại danh sách bank sau khi lấy về
            const bankList = data.map((bank: any) => ({
                id: bank.id,
                code: bank.code,
                short_name: bank.short_name
            }));
            setBanks(bankList);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };

    useEffect(() => {
        fetchBanks();
    }, []);

    const checkInfomation = () => {
        // Vô hiệu hóa nút nếu chưa chọn ngân hàng hoặc chưa nhập số tài khoản
        if (!selectedBank || numberAccount.trim() === '') {
            return true;
        }
        return false;
    };

    const saveInfoBank = async () => {
        try {
            const bankData: any = { numberAccount, selectedBank };
            await AsyncStorage.setItem('bankInfo', JSON.stringify(bankData));
            dispatch(setBankInfo(bankData));
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelectedBank = (val: any) => {
        if (selectedBank?.id === val.id) {
            setSelectedBank(null);
        } else {
            setSelectedBank(val);
        }
    };

    const handleChangeValue = (val: string) => {
        console.log(val);
    };

    return (
        <View style={styles.container}>
            <SpaceComponent height={40} />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                Giải thích cơ chế hoạt động của ứng dụng quét mã thanh toán bằng
                QR code.
            </Text>
            <SpaceComponent height={8} />
            <Text style={{ fontSize: 18 }}>
                Bước 1: Lựa chọn đúng ngân hàng bạn đã đăng ký.
            </Text>
            <SpaceComponent height={8} />
            <Text style={{ fontSize: 18 }}>
                Bước 2: Bạn cần phải điền đúng số tài khoản mà ngân hàng đã cung
                cấp cho bạn.
            </Text>
            <SpaceComponent height={8} />
            <Text style={{ fontSize: 18 }}>
                Bước 3: Bấm xác nhận tài khoản để đi đến nơi có thể tạo QR code.
            </Text>
            <SpaceComponent height={20} />
            <DropDownPickerComponent
                values={banks}
                onSelect={handleSelectedBank}
                selected={selectedBank}
                label='Lựa chọn ngân hàng'
            />
            <SpaceComponent height={10} />
            <InputComponent
                value={numberAccount}
                handleChange={value => {
                    setNumberAccount(value);
                }}
                onDelete={() => {
                    setNumberAccount('');
                }}
                placeholder='Nhập số tài khoản của bạn'
                prefixIcon={<FontAwesome5 name='money-check' size={20} />}
                keyboardType={'numeric'}
                allowClear
                label='Điền số tài khoản'
            />
            <SpaceComponent height={40} />
            <ButtonComponent
                disabled={checkInfomation()}
                onPress={() => {
                    saveInfoBank();
                }}
                title='Xác nhận tài khoản'
            />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: 20
    }
});
