import React, {useEffect, useState} from "react";
import cx from "classnames";
import styles from "./SelectInstitution.module.scss";
import Logo from "@/assets/images/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { initialsCase, titleCase } from "@/helpers/textTransform";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import useGetLoggedInUser from "@/utils/useGetLoggedInUser";
import { toast } from "react-toastify";
import { switchInstitution } from "@/redux/Proprietor/ProprietorSlice";
import { logout } from "@/redux/Auth/AuthSlice";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/ModalSlice";
import AddInstitutionModal from "@/components/Modals/AddInstitution/AddInstitution";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import { getAllInstitutions } from "@/redux/Proprietor/ProprietorSlice";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";


const SelectInstitution = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  const loading = useSelector((state) => state.proprietor.loading);


  // const proprietorDetails = useGetLoggedInUser();
  // let institutionsArray = proprietorDetails?.institutions;

  let institutionsArray = useSelector((state) => state?.proprietor?.getAllInstitutionsData?.institutions);

  console.log(institutionsArray);

  useEffect(() => {
    dispatch(getAllInstitutions());
  }, [dispatch]);

  // useEffect(() => {
  //   if(proprietorDetails.institutions === undefined) {
  //     navigate("/proprietor/dashboard");
  //   }
  // },[dispatch, navigate, proprietorDetails.institutions]);

  // useEffect(() => {
  //   if( institutionsArray.length === 0) {
  //     dispatch(showModal({ action: "show", type: "addInstitution" }));
  //   }
  // },[dispatch, institutionsArray.length, navigate]);


  const handleSwitchInstitution = async (institution_id) => {
    console.log(institution_id);
    toast("Switching Institution...");
    let response = await dispatch(switchInstitution({id: institution_id }));
    console.log(response, "switch response");
    if (response.payload.success) {
      console.log(institution_id);
      localStorage.setItem("activeInstitutionData", JSON.stringify(response.payload.active_institution));
      localStorage.setItem("institution_id", institution_id);
      navigate("/proprietor/dashboard");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className={cx(styles.selectInstitutionWrapper, "flexCol")}>
      <div className={cx(styles.heading, "flexCol")}>
        <Button onClick={()=>handleLogout()} title="Logout" borderRadiusType="mediumRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
        <img src={Logo} alt="" />
      </div>
      { loading ? 
        <>
          <p>...fetching data, please wait...</p>
          <TableSkeleton />
        </>
        :
        Array.isArray(institutionsArray) && institutionsArray.length > 0 ?
          <>  
            <p>Select an institution to continue</p>
            <div className={cx(styles.body)}>
              {Array.isArray(institutionsArray) && institutionsArray.map((element, index) => {
                return (
                  <div key={index} onClick={() => handleSwitchInstitution(element?.id)} className={cx(styles.studentContainer, "flexCol")}>
                    <div className={cx(styles.imageDiv)}>
                      <Icon icon="cil:institution" color="#000" width="72" />
                    </div>
                    <p>{element?.name}</p>
                  </div>
                );
              }
              )}

            </div>
          </>
          :
          Array.isArray(institutionsArray) && institutionsArray.length === 0 ?
            <>
              <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", gap: "1rem"}}>
                <p style={{color: "#747474", fontSize: "1.5rem"}}>No Institution Found. Kindly Add A New Institution</p>
                <Button onClick={() => dispatch(showModal({ action: "show", type: "addInstitution" }))} type title="Add Institution" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
              </div>
            </>
            :
            <p>An Error Occured. Please Try Again</p>
      }

      {modalState === "show" && modalType === "addInstitution" && <Modal show size="lg" ><AddInstitutionModal /> </Modal>}
    
    </div>
  );
};

export default SelectInstitution;