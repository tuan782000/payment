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

export function readMoney(number: any) {
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
