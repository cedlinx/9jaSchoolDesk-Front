import { inBankDepositApi, tokenizedDepositApi, inBankWithdrawalApi, tokenizedWithdrawalApi, transferApi, interBankTransferApi, intraBankTransferApi, utilityPaymentApi, bankCompletedTransactionsApi, customerPendingTransactionsApi, customerPendingDepositsApi, customerPendingWithdrawalsApi  } from "../api/operations";
import { toast } from "react-toastify";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  error: {},
  
  inBankDepositData: {},
  tokenizedDepositData: {},
  inBankWithdrawalData: {},
  tokenizedWithdrawalData: {},
  transferData: {},
  interBankTransferData: {},
  intraBankTransferData: {},
  utilityPaymentData: {},
  bankCompletedTransactionsData: {},
  customerPendingTransactionsData: {},
  customerPendingDepositsData: {},
  customerPendingWithdrawalsData: {}
};

export const operationsSlice = createSlice({
  name: "operations",

  initialState,

  reducers: {

    startLoading: state => {
      state.loading = true;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    inBankDepositAction: (state, action) => {
      state.inBankDepositData = action.payload;
      state.loading = false;
    },

    inBankWithdrawalAction: (state, action) => {
      state.inBankWithdrawalData = action.payload;
      state.loading = false;
    },

    tokenizedDepositAction: (state, action) => {
      state.tokenizedDepositData = action.payload;
      state.loading = false;
    },
 
    tokenizedWithdrawalAction: (state, action) => {
      state.tokenizedWithdrawalData = action.payload;
      state.loading = false;
    },

    transferAction: (state, action) => {
      state.transferData = action.payload;
      state.loading = false;
    },

    interBankTransferAction: (state, action) => {
      state.interBankTransferData = action.payload;
      state.loading = false;
    },

    intraBankTransferAction: (state, action) => {
      state.intraBankTransferData = action.payload;
      state.loading = false;
    },

    utilityPaymentAction: (state, action) => {
      state.utilityPaymentData = action.payload;
      state.loading = false;
    },

    bankCompletedTransactionsAction: (state, action) => {
      state.bankCompletedTransactionsData = action.payload;
      state.loading = false;
    },

    customerPendingTransactionsAction: (state, action) => {
      state.customerPendingTransactionsData = action.payload;
      state.loading = false;
    },

    customerPendingDepositsAction: (state, action) => {
      state.customerPendingDepositsData = action.payload;
      state.loading = false;
    },

    customerPendingWithdrawalsAction: (state, action) => {
      state.customerPendingWithdrawalsData = action.payload;
      state.loading = false;
    }
  }
});
export default operationsSlice.reducer;

// Actions
const { startLoading, hasError, inBankDepositAction, inBankWithdrawalAction, tokenizedDepositAction, tokenizedWithdrawalAction, transferAction, interBankTransferAction, intraBankTransferAction, utilityPaymentAction, bankCompletedTransactionsAction, customerPendingTransactionsAction, customerPendingDepositsAction, customerPendingWithdrawalsAction
} = operationsSlice.actions;

export const inBankDeposit = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await inBankDepositApi(data);
    console.log(response, "inbank deposit");
    toast.success(response.data.message);
    return dispatch(inBankDepositAction(response?.data));
  } catch (e) {
    toast.error(e.response.message);
    return dispatch(hasError(e.response.message));
  }
};

export const inBankWithdrawal = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await inBankWithdrawalApi(data);
    console.log(response, "inbank widhdrawal");
    // toast.success(response.data.message);
    return dispatch(inBankWithdrawalAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const tokenizedDeposit = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await tokenizedDepositApi(data);
    console.log(response, "tokenized deposit");
    response?.data?.success ? toast.success(response.data.message) : toast.error(response.data.message);
    return dispatch(tokenizedDepositAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const tokenizedWithdrawal = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await tokenizedWithdrawalApi(data);
    console.log(response, "tokenized withdrawal");
    response?.data?.success ? toast.success(response.data.message) : toast.error(response.data.message);
    return dispatch(tokenizedWithdrawalAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const transfer = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await transferApi(data);
    console.log(response, "transfer");
    // toast.success(response.data.message);
    return dispatch(transferAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const interBankTransfer = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await interBankTransferApi(data);
    console.log(response, "interBankTransfer");
    response.data.success ? toast.success(response.data.message) : toast.error(response.data.message);
    // toast.success(response.data.message);
    return dispatch(interBankTransferAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const intraBankTransfer = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await intraBankTransferApi(data);
    console.log(response, "intraBankTransfer");
    // toast.success(response.data.message);
    response.data.success ? toast.success(response.data.message) : toast.error(response.data.message);
    return dispatch(intraBankTransferAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const utilityPayment = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await utilityPaymentApi(data);
    console.log(response, "utilityPayment");
    // toast.success(response.data.message);
    return dispatch(utilityPaymentAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const bankCompletedTransactions = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await bankCompletedTransactionsApi(data);
    console.log(response, "bankCompletedTransactions");
    // toast.success(response.data.message);
    return dispatch(bankCompletedTransactionsAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const customerPendingTransactions = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await customerPendingTransactionsApi(data);
    console.log(response, "customerPendingTransactions");
    // toast.success(response.data.message);
    return dispatch(customerPendingTransactionsAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const customerPendingDeposits = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await customerPendingDepositsApi(data);
    console.log(response, "customerPendingDeposits");
    toast.success(response.data.message);
    return dispatch(customerPendingDepositsAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const customerPendingWithdrawals = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await customerPendingWithdrawalsApi(data);
    console.log(response, "customerPendingWithdrawals");
    // toast.success(response.data.message);
    return dispatch(customerPendingWithdrawalsAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

  
