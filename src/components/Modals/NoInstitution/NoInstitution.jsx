import React from "react";
import { useDispatch } from "react-redux";
import cx from "classnames";
import styles from "./NoInstitution.module.scss";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/ModalSlice";
import { Icon } from "@iconify/react";


const NoInstitution = () => {
  
  const dispatch = useDispatch();

  const handleAddInstitution =()=>{
    dispatch(showModal({ action: "hide", type: "NoInstitution" }));dispatch(showModal({ action: "show", type: "addInstitution" }));
  };

  return (
    <div className={cx(styles.noInstitutionContainer, "flexCol")}>

      <div className={cx(styles.header, "flexRow-space-between")}>
        <Icon onClick={()=>dispatch(showModal({ action: "hide", type: "noInstitution" }))} icon="carbon:close-filled" color="white" />
      </div>
      
      <div className={cx(styles.body, "flexCol")}>

        <p>No Institition is registered by you, kindly create one by clicking the button below</p>
		
        <Button onClick={()=> handleAddInstitution()} title="Add Institution" textColor="#FFF" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#D25B5D" />
      </div> 
			
    </div>
  );
};

export default NoInstitution;
