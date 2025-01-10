import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SelectModel } from '../models/SelectModel';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import InputComponent from './InputComponent';
import ButtonComponent from './ButtonComponent';
import SpaceComponent from './SpaceComponent';

interface Props {
    label?: string; // nhãn
    values: SelectModel[]; // mảng danh sách các ngân hàng đã được custom (code, id, short_name)
    selected?: SelectModel | null;
    onSelect: (val: SelectModel) => void;
}

const DropDownPickerComponent = (props: Props) => {
    const { label, values, selected, onSelect } = props;
    const [isVisibleModalize, setIsVisibleModalize] = useState(false);
    const [searchKey, setSearchKey] = useState('');
    const modalizeRef = useRef<Modalize>();

    // Lọc danh sách ngân hàng dựa trên từ khóa tìm kiếm
    // dùng hàm filter lọc thành mảng mới - lọc chính xác phải quy kết quả và đầu vào cùng 1 đơn vị (chữ thường) sau đó mới tìm kiếm mới đúng được
    const filteredBanks = values.filter(
        bank =>
            bank.short_name.toLowerCase().includes(searchKey.toLowerCase()) ||
            bank.code.toLowerCase().includes(searchKey.toLowerCase())
    );

    const closeModalize = () => {
        modalizeRef.current?.close();
        setSearchKey('');
    };

    useEffect(() => {
        if (isVisibleModalize) {
            modalizeRef.current?.open();
        }
    }, [isVisibleModalize]);

    return (
        <View style={{ marginBottom: 20 }}>
            {label && (
                <Text
                    style={{
                        marginBottom: 8,
                        fontWeight: 'bold',
                        fontSize: 18
                    }}
                >
                    {label}
                </Text>
            )}
            <TouchableOpacity
                style={styles.row}
                onPress={() => setIsVisibleModalize(true)}
            >
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16 }}>
                        {selected
                            ? selected.short_name
                            : 'Nhấn vào đây lựa chọn ngân hàng'}
                    </Text>
                </View>
                <AntDesign name='down' size={20} />
            </TouchableOpacity>
            <Portal>
                <Modalize
                    handlePosition='inside'
                    ref={modalizeRef}
                    onClose={() => setIsVisibleModalize(false)}
                    avoidKeyboardLikeIOS={true}
                    // disableScrollIfPossible
                    panGestureEnabled={false}
                    HeaderComponent={
                        <View
                            style={{
                                paddingHorizontal: 20,
                                paddingVertical: 30
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <View style={{ flex: 1 }}>
                                    <InputComponent
                                        handleChange={val => setSearchKey(val)}
                                        keyboardType='default'
                                        value={searchKey}
                                        allowClear
                                        onDelete={() => setSearchKey('')}
                                        placeholder='Tìm kiếm ngân hàng ...'
                                        prefixIcon={
                                            <AntDesign
                                                name='search1'
                                                size={18}
                                            />
                                        }
                                    />
                                </View>
                                <SpaceComponent width={10} />
                                <ButtonComponent
                                    onPress={() => closeModalize()}
                                    title='Quay lại'
                                    buttonStyles={{ paddingHorizontal: 10 }}
                                />
                            </View>
                        </View>
                    }
                >
                    <SpaceComponent height={10} />
                    {filteredBanks.map(bank => (
                        <TouchableOpacity
                            key={bank.id}
                            style={{
                                paddingHorizontal: 20
                            }}
                            onPress={() => {
                                onSelect(bank); // Lưu ngân hàng đã chọn
                                modalizeRef.current?.close(); // Đóng modal
                                setIsVisibleModalize(false);
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    minHeight: 54,
                                    // borderBottomWidth: 1,
                                    alignItems: 'center',
                                    backgroundColor:
                                        selected?.short_name === bank.short_name
                                            ? 'coral'
                                            : '',
                                    paddingHorizontal: 20,
                                    borderRadius: 8
                                }}
                            >
                                <View style={{ width: 100 }}>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            color:
                                                selected?.short_name ===
                                                bank.short_name
                                                    ? 'white'
                                                    : ''
                                            // fontWeight:  selected?.short_name ===
                                            // bank.short_name ? 'bold'
                                        }}
                                    >
                                        {bank.code}
                                    </Text>
                                </View>
                                <SpaceComponent width={10} />
                                <Text
                                    style={{
                                        fontSize: 18,
                                        flex: 1,
                                        color:
                                            selected?.short_name ===
                                            bank.short_name
                                                ? 'white'
                                                : ''
                                    }}
                                >
                                    {bank.short_name}
                                </Text>
                                {selected?.short_name === bank.short_name ? (
                                    <AntDesign
                                        name='check'
                                        size={20}
                                        color={'white'}
                                    />
                                ) : (
                                    <></>
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </Modalize>
            </Portal>
        </View>
    );
};

export default DropDownPickerComponent;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        minHeight: 54,
        borderRadius: 8,
        paddingHorizontal: 20
    }
});
