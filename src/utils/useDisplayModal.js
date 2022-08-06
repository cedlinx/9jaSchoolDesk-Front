import React, {useEffect, useState} from "react";
import { showModal } from "@/redux/ModalState/ModalSlice";

const useDisplayModal =()=>{

  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);


};