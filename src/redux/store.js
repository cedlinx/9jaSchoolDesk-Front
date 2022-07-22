import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth/AuthSlice";
import ModalReducer from "./ModalState/ModalSlice";
import ProprietorReducer from "./Proprietor/ProprietorSlice";
import GuardianReducer from "./Guardian/GuardianSlice";


const store = configureStore({
  reducer: {
    auth: AuthReducer,
    modalState: ModalReducer,
    proprietor: ProprietorReducer,
    guardian: GuardianReducer
  },
  devTools: process.env.NODE_ENV === "development" ? true : false 
});

export default store;
