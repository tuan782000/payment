export const formatMoney = (value: number | string): string => {
    if (!value || value === '') return ''; // Xử lý trường hợp rỗng

    const number =
        typeof value === 'string' ? parseInt(value.replace(/\D/g, '')) : value;
    return number.toLocaleString('vi-VN'); // Sử dụng định dạng của Việt Nam
};
