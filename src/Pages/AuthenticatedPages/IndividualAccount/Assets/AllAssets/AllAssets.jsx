import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import cx from "classnames";
import styles from "./AllAssets.module.scss";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import Button from "@/components/Button/Button";
import calendarIcon from "@/assets/icons/calendar-icon.svg";

import "flatpickr/dist/themes/light.css";
import Flatpickr from "react-flatpickr";

import emptyAvatar from "@/assets/icons/emptyAvatar.svg";
import { toast } from "react-toastify";

import { showModal } from "@/redux/ModalState/modalState.action";
import successCheckIcon from "@/assets/icons/success-check-icon.svg";
// import qrCodeImage from "@/assets/images/qrCodeImage.svg";
import { titleCase } from "@/helpers/textTransform";
import TableComponent from "@/components/Table/Table";

import moment from "moment";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";

import AssetSuccessModalContent from "@/components/Modals/AssetDetails/AssetDetailsModal";

import { assetsList, modifyAsset, deleteAsset, generatedAssetCodes, addAsset, allAssetsTypes } from "@/redux/Assets/assets.action";

import { useForm, Controller } from "react-hook-form";
import { modifyAssetValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import InputField from "@/components/Input/Input";
import SelectField from "@/components/Select/Select";
import UploadComponent from "@/components/UploadComponent/UploadComponent";


const AllAssets = () => {

  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  const allAssetsList = useSelector((state) => state?.assets?.assetsListData?.data);
  const assetsTypes = useSelector((state)=>state?.assets?.allAssetsTypesData?.data);
  const generatedCodes = useSelector((state) => state?.assets?.generatedAssetCodesData?.data);
  const loading = useSelector((state)=>state?.assets?.loading);

  const assetsLoading = useSelector((state) => state.assets.loading);
  const [modalAssetId, setModalAssetId] = useState("");
  const [selectedRows, setSelectedRows] = useState("");
  const [checkedValue, setCheckedValue] = useState(false);
  const [disableModifyBtn, setDisableModifyBtn] = useState(false);
  const [showBtnGroup, setShowBtnGroup] = useState(false);
  const [upload, setUploadedFile] = useState(null);
  const [userLocation, setUserLocation] = useState({
    lng: "",
    lat: ""
  });

  const resolver = yupResolver(modifyAssetValidationSchema);

  const defaultValues = {
    type_id: "",
    name: "",
    pin: "",
    assetid: "",
    transferable: "",
    lng: "",
    lat: "",
    uploadedFile: ""
  };

  useEffect(() => {
    dispatch(assetsList());	
    // dispatch(generatedAssetCodes());
    dispatch(allAssetsTypes());

    const displayLocationInfo = (position) => {
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;
      setUserLocation({
        lng: longitude,
        lat: latitude
      });
    };
    navigator.geolocation.getCurrentPosition(displayLocationInfo);

  }, [dispatch]);

  const {handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all"  });

  const displayModal = (action, type) => {
    if(type === "deleteAsset" && selectedRows.length === 0) {
      toast.error("Kindly select at least one asset to perform this action");
      return;
    }
    else if( type === "modifyAsset" && selectedRows.length === 0) {
      toast.error("Kindly select at least one asset to perform this action");
      return;
    }
 
    dispatch(showModal({ action, type }));
  };
	
  const handleViewClick =(id)=>{
    setModalAssetId(id);
    displayModal("show", "assetDetails");
  };

  const getAssetDetails = (data) => {
    return allAssetsList?.asset_array.filter(asset=> asset.id === data)[0];
  };

  const deleteAssetFxn = async () => {
    if(selectedRows.length === 1){
      const assetID = selectedRows[0].original.assetID;
      let result =await dispatch(deleteAsset({id: assetID}));
      result.payload.status === 200 && dispatch(assetsList());	
      displayModal("hide");
    }
    else{
      const assetIDs = [];
      selectedRows.map(element=>{
        assetIDs.push(element.original.assetID);
      });
      // dispatch(deleteBulkAsset({id: assetIDs}));
      displayModal("hide");
    }
  };

  // const modifyAssetFxn = (data) => {
  // 	const assetID = selectedRows[0].original.assetID;
  // 	dispatch(modifyAsset({id: assetID}));
  // 	displayModal("hide");
  // };	

  const choiceOptions = [
    {label: "Yes", value: "1"},
    {label: "No", value: "0"}
  ];
  const getUploadedData = (data) =>{
    setUploadedFile(data);
  };
  const modifyAssetFxn =async (data)=>{
    const response = await dispatch(modifyAsset({...data, id: selectedRows[0]?.values?.assetID, lat: `${userLocation.lat}` || "6.334455", lng: `${userLocation.lng}` || "3.334455", uploadedFile : upload && upload[0] || ""}));
    console.log(response, "update response");
    if (response?.payload?.data?.success === true ){
      dispatch(showModal({action: "hide"}));
      reset();
      dispatch(assetsList());
    }
  };

  const getAssetTypesOptions=(data)=>{
    console.log(data);
    let result = [];
    data?.map(element=>{
      result.push({label: element.type, value: element.id});
    });
    return result;
  };
	
  const confirmModifyModal = () => {
    console.log(selectedRows);
    return (
    // <div style={{ textAlign: "center" }} className={cx(styles.modalWrapper, "flexCol-align-center")}>				
    // 	<h2>Are you sure you want to modify the asset ?</h2>
    // 	<div style={{ gap: "1rem", marginTop: "2rem" }} className={cx(styles.btnDiv, "flexRow-fully-centered")}>
    // 		<Button onClick={() => displayModal("hide")} title="Cancel" textColor="#D25B5D" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" />
    // 		<Button  onClick={() => modifyAssetFxn()} title="Modify" textColor="#fff" borderRadiusType="lowRounded" bgColor="#D25B5D" />
    // 	</div>
    // </div>
      <div style={{ width: "100%", minHeight: "50vh" }} className={cx("")}>
        <form
          onSubmit={handleSubmit((data) => modifyAssetFxn(data))} 
          className=""
        >
          <Controller
            name="type_id"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <SelectField
                {...rest}
                type="text"
                defaultSelect={"Select Asset Type"}
                error={errors?.type_id && errors?.type_id?.message}
                options={getAssetTypesOptions(assetsTypes && assetsTypes[0])}
              />
            )}
          />

          <Controller
            name="name"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <InputField
                {...rest}
                placeholder={"Name"}
                type="text"
                error={errors?.name && errors?.name?.message}
								
              />
            )}
          />

          <Controller
            name="pin"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <InputField
                {...rest}
                placeholder={"Pin"}
                type="number"
                error={errors?.pin && errors?.pin?.message}
								
              />
            )}
          />

          <Controller
            name="assetid"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <InputField
                {...rest}
                placeholder={"Asset ID"}
                type="text"
                error={errors?.assetid && errors?.assetid?.message}
                value={selectedRows[0]?.values?.assetID}
                disabled
              />
            )}
          />

          <Controller
            name="transferable"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <SelectField
                {...rest}
                type="text"
                defaultSelect={"Transferable?"}
                error={errors?.transferable && errors?.transferable?.message}
                options={choiceOptions}
              />
            )}
          />

          <Controller
            name="lng"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <InputField
                {...rest}
                placeholder={"Longitude"}
                type="text"
                error={errors?.lng && errors?.lng?.message}
                value={userLocation.lng}
                readonly
                disabled
              />
            )}
          />

          <Controller
            name="lat"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <InputField
                {...rest}
                placeholder={"Latitude"}
                type="text"
                error={errors?.lat && errors?.lat?.message}
                value={userLocation.lat}
                readonly
                disabled
              />
            )}
          />
					
          <Controller
            name="uploadedFile"
            control={control}
            render={({ field: { ref, ...rest } }) => (

              <UploadComponent
                {...rest}
                getUploadedData={getUploadedData}
                error={errors?.uploadedFile && errors?.uploadedFile?.message}
								
                accept={[
                  "application/pdf",
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  "application / msword",
                  "image/png",
                  "image/jpg",
                  "image/jpeg",
                  "image/ico",
                  "image/gif"
                ]}
              />
            )}
          />
					
          {/* <div onClick={handleSubmit((data) => addNewAsset(data))} style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "1rem"}}>
						
						<Button loading={loading} title="Add Asset Now" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D" />
					</div> */}

          <div style={{ gap: "1rem", marginTop: "2rem" }} className={cx(styles.btnDiv, "flexRow-fully-centered")}>
            <Button onClick={() => displayModal("hide")} title="Cancel" textColor="#D25B5D" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" />
            <Button loading={loading}  onClick={handleSubmit((data) => modifyAssetFxn(data))} title="Modify" textColor="#fff" borderRadiusType="lowRounded" bgColor="#D25B5D" />
          </div>
        </form>	
      </div>
    );
  };

  const confirmDeleteModal = (data) => {
    return (
      <div style={{ textAlign: "center" }} className={cx(styles.modalWrapper, "flexCol-align-center")}>				
        <h2>Are you sure you want to delete the asset ?</h2>
        <div style={{ gap: "1rem", marginTop: "2rem" }} className={cx(styles.btnDiv, "flexRow-fully-centered")}>
          <div><Button title="Cancel" textColor="#D25B5D" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" /></div>
          <div onClick={() => deleteAssetFxn()} ><Button title="Delete" textColor="#fff" borderRadiusType="lowRounded" bgColor="#FF2C45" /></div>
        </div>
      </div>
    );
  };

  const viewCodeGenerated = (data) => {
    return (
      <div className={cx(styles.modalWrapper, "flexCol-align-center")}>
        <img src={successCheckIcon} alt="" />
        <p>Code Generated Successfully</p>
        {/* <img src={qrCodeImage} alt="" /> */}
        <p>#001245105KJ30091</p>
        <Button onClick={()=> displayModal("hide")} title="OK" textColor="#fff" borderRadiusType="lowRounded" bgColor="#D25B5D" />
      </div>
    );
  };

  const viewAssetResult = (data) => {
    let detailsObj = getAssetDetails(data);
    return (
      <AssetSuccessModalContent data={detailsObj} />
    );
  };

  let shortenDate=(value)=>{
    let date = new Date(value);
    return date.toDateString();
  };

  const dateOptions = {
    maxDate: new Date(),
    mode: "range",
    dateFormat: "F J 'y",
    onChange: function(selectedDates, dateStr, instance) {
    }
  };

  const columnsHeader = [
    {
      Header: () => (
        <div
          style={{
            width: "5rem"
          }}
        >
	ASSET ID
        </div>
      ),
      accessor: "assetID"				
    },
                
    {
      Header: () => (
        <div
          style={{
            minWidth: "10rem"
          }}
        >
	                       DATE
        </div>
      ),
      accessor: "date"
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "10rem"
          }}
        >
	                       NAME
        </div>
      ),
      accessor: "name"
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "10rem"
          }}
        >
	                       ASSET TYPE
        </div>
      ),
      accessor: "assetType"
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "10rem"
          }}
        >
	                       LOCATION
        </div>
      ),
      accessor: "location"
    },
    {
      Header: "ACTIONS",
      accessor: "actions",
      Cell: (row)=>{
        let assetID = row.cell.row.values.assetID;
        return <div onClick={()=>handleViewClick(assetID)}>
          <Button  title="View" borderRadiusType="lowRounded" textColor="#D25B5D" bgColor="rgba(44,0,133,0.05)"/>
        </div>;
      }
    }
  ];

  let getTableData = (data) => {
    console.log(data);
    let result =[];

    data  && data.map((item) =>{
      result.push({
        assetID: item?.id && item?.id,
        date: item?.created_at && shortenDate(item?.created_at),
        name: item?.name && titleCase(item?.name),
        assetType: item?.type && item?.type.type,
        location: item?.location && item?.location,
        action: ""
      });
    });
    return result;
  };

  const selectedRowsData=(data)=>{
    if(data.length === 0){
      setCheckedValue(false);
      setShowBtnGroup(false);
    }
    else{
      setCheckedValue(true);
      setShowBtnGroup(true);
    }
    data.length > 1 ? setDisableModifyBtn(true) : setDisableModifyBtn(false);
    setSelectedRows(data);
  };

  return (
    <div className={cx(styles.container)}>
      {/* <ToastContainer /> */}
      <h2>All Assets</h2>

      <div className={cx(styles.dateSelectorWrapper, "flexRow")}>
        <img src={calendarIcon} alt="calendar" />
        <div className={cx(styles.datePickerWrapper)}>
          <p>Change Period</p>
          <Flatpickr  placeholder= "Select Date Range"
            options={dateOptions} className={cx(styles.datePicker)}
          />
        </div>
      </div>

      <div className={cx(styles.assetCodeWrapper, "flexRow")}>
        {/* <div onClick={() => displayModal("show", "accessCode")}>
					<Button title="Generate Asset Code" textColor="#fff" borderRadiusType="lowRounded" bgColor="#D25B5D" />
				</div>


				<div className={cx(styles.codeDetailsWrapper, "flexRow")}>
					<img src={emptyAvatar} alt="avatar" />
					<div>
						<small>Total Asset Code Generated</small>
						<p>{generatedCodes?.total_codes}</p>
					</div>
				</div> */}

        {showBtnGroup && 
				<div className={cx(styles.btnGroup, "flexRow")}>

				  {/* <Button title="Active" checkedBtn checked={checkedValue} textColor="#D25B5D" bordercolor="2C0085" borderRadiusType="lowRounded" bgColor="#fff" /> */}
				  <Button onClick={() => displayModal("show", "modifyAsset")} disabled={disableModifyBtn} title="Modify" textColor="#D25B5D" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#fff" />
				  <Button onClick={() => displayModal("show", "deleteAsset")} title="Delete" textColor="#fff" borderRadiusType="lowRounded" bgColor="#FF2C45" />

				</div>
        }
      </div>

      <div className={cx(styles.tableWrapper, "flexCol")}>
        {assetsLoading ? <TableSkeleton /> : 
          allAssetsList && <TableComponent columnsHeader={columnsHeader} tableData={getTableData(allAssetsList?.asset_array)} selectedRowsData={selectedRowsData} />}
      </div>

      {modalState === "show" ? <Modal show >{modalType === "assetDetails" ? viewAssetResult(modalAssetId) : modalType === "accessCode" ? viewCodeGenerated() : modalType === "deleteAsset" ? confirmDeleteModal() : modalType === "modifyAsset" ? confirmModifyModal() : null}</Modal> : null}

    </div>
  );
};

AllAssets.propTypes = {

};

export default AllAssets;
