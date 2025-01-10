import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BankState {
    numberAccount: string;
    selectedBank: { code: string; short_name: string } | null;
    hasData: boolean;
}

const initialState: BankState = {
    numberAccount: '',
    selectedBank: null,
    hasData: false
};

const bankSlice = createSlice({
    name: 'bank',
    initialState,
    reducers: {
        setBankInfo(
            state,
            action: PayloadAction<{
                numberAccount: string;
                selectedBank: { code: string; short_name: string };
            }>
        ) {
            state.numberAccount = action.payload.numberAccount;
            state.selectedBank = action.payload.selectedBank;
            state.hasData = true;
        },
        clearBankInfo(state) {
            state.numberAccount = '';
            state.selectedBank = null;
            state.hasData = false;
        }
    }
});

export const { setBankInfo, clearBankInfo } = bankSlice.actions;
export default bankSlice.reducer;
