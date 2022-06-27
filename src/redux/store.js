import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth/AuthSlice";
import ModalReducer from "./ModalState/ModalSlice";
import OperationsReducer from "./Operations/OperationsSlice";
import AgentsReducer from "./Agents/AgentsSlice";
import StaffReducer from "./Staff/StaffSlice";
import CustomerReducer from "./Customer/CustomerSlice";
import DashboardReducer from "./Dashboard/DashboardSlice";
import SettingsReducer from "./Settings/SettingsSlice";
import LoansReducer from "./Loans/LoansSlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    modalState: ModalReducer,
    operations: OperationsReducer,
    agents: AgentsReducer,
    staff: StaffReducer,
    customer: CustomerReducer,
    dashboard: DashboardReducer,
    settings: SettingsReducer,
    loans: LoansReducer
  },
  devTools: process.env.NODE_ENV === "development" ? true : false 
});

export default store;
