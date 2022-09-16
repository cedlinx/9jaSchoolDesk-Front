import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth/AuthSlice";
import ModalReducer from "./ModalState/ModalSlice";
import ProprietorReducer from "./Proprietor/ProprietorSlice";
import GuardianReducer from "./Guardian/GuardianSlice";
import TeacherReducer from "./Teacher/TeacherSlice";
import StudentReducer from "./Student/StudentSlice";
import GistReducer from "./Gist/GistSlice";
import LoadingReducer from "./Loading/LoadingSlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    modalState: ModalReducer,
    proprietor: ProprietorReducer,
    guardian: GuardianReducer,
    teacher: TeacherReducer,
    student: StudentReducer,
    gist: GistReducer,
    loading: LoadingReducer
  },
  devTools: process.env.NODE_ENV === "development" ? true : false 
});

export default store;
