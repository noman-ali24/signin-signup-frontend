import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RegistrationState {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

const initialState: RegistrationState = {
  fullName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  termsAccepted: false,
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setStep1Data: (
      state,
      action: PayloadAction<{ fullName: string; email: string }>
    ) => {
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
    },
    setPhoneData: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setPasskeyData: (
      state,
      action: PayloadAction<{ password: string; confirmPassword: string }>
    ) => {
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
    },
    setTermsAccepted: (state, action: PayloadAction<boolean>) => {
      state.termsAccepted = action.payload;
    },
    resetRegistration: () => initialState,
  },
});

export const {
  setStep1Data,
  setPhoneData,
  setPasskeyData,
  setTermsAccepted,
  resetRegistration,
} = registrationSlice.actions;

export default registrationSlice.reducer;
