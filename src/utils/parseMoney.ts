export const parseMoney = (formattedValue: string): number => {
    return parseInt(formattedValue.replace(/\./g, '').replace(/\D/g, '')) || 0;
};
