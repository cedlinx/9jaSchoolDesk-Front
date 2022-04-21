import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import cx from "classnames";
import styles from "./AddAsset.module.scss";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import {showModal} from "@/redux/ModalState/modalState.action";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import SelectField from "@/components/Select/Select";
import UploadComponent from "@/components/UploadComponent/UploadComponent";
import { toast } from "react-toastify";

import { useForm, Controller } from "react-hook-form";
import { addAssetValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import { allAssetsTypes, addAsset } from "@/redux/Assets/assets.action";

import AssetSuccessModalContent from "@/components/Modals/AssetDetails/AssetDetailsModal";

const AddAsset = () => {

  const dispatch = useDispatch();
  const modalState = useSelector((state)=>state.modalState);
  const assetsTypes = useSelector((state)=>state?.assets?.allAssetsTypesData?.data);
  const loading = useSelector((state)=>state?.assets?.loading);
  const addAssetResponse = useSelector((state)=>state?.assets?.addAssetData);
  const [upload, setUploadedFile] = useState(null);
  const [userLocation, setUserLocation] = useState({
    lng: "",
    lat: ""
  });

  const resolver = yupResolver(addAssetValidationSchema);

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

  const getUploadedData = (data) =>{
    setUploadedFile(data);
  };

  const {handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all"  });

  const addNewAsset =async (data)=>{
    const response = await dispatch(addAsset({...data, lat: `${userLocation.lat}` || "6.334455", lng: `${userLocation.lng}` || "3.334455", uploadedFile : upload && upload[0] || ""}));

    if (response?.payload?.data?.success === true ){
      dispatch(showModal("show"));
      reset();
    }
  };

  const getAssetTypesOptions=(data)=>{
    let result = [];
    data?.map(element=>{
      result.push({label: element.type, value: element.id});
    });
    return result;
  };

  const choiceOptions = [
    {label: "Yes", value: "1"},
    {label: "No", value: "0"}
  ];

  const addAssetResult =(data)=>{
    return(
      <AssetSuccessModalContent data={data} dispatchAction={"assetsList"} />
    );
  };


  return (
    <div className={cx(styles.container)}>

      <h2>Add Asset</h2>
			
      <div className={cx(styles.formDiv, "flexCol", "col-md-6", "col-lg-6", "col-xl-4")}>
        <form
          onSubmit={handleSubmit((data) => addNewAsset(data))} 
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
                type="password"
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
					
          <div onClick={handleSubmit((data) => addNewAsset(data))} style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "1rem"}}>
						
            <Button loading={loading} title="Add Asset Now" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D" />
          </div>
        </form>	
				
      </div>

      {modalState.showModalSuccess ? <Modal show >{addAssetResult(addAssetResponse?.data?.data)}</Modal> : null}
    </div>
  );
};

AddAsset.propTypes = {
    
};

export default AddAsset;
