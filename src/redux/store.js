import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth/AuthSlice";
import ModalReducer from "./ModalState/ModalSlice";
import ProprietorReducer from "./Proprietor/ProprietorSlice";
import GuardianReducer from "./Guardian/GuardianSlice";
import TeacherReducer from "./Teacher/TeacherSlice";


const store = configureStore({
  reducer: {
    auth: AuthReducer,
    modalState: ModalReducer,
    proprietor: ProprietorReducer,
    guardian: GuardianReducer,
    teacher: TeacherReducer
  },
  devTools: process.env.NODE_ENV === "development" ? true : false 
});

export default store;
