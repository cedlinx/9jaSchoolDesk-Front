import React from "react";
import cx from "classnames";
import styles from "./AddInstitution.module.scss";
import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";
import TopDivWave from "@/components/WaveSvg/TopDivWave";

import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import curvedHamburgerFlipped from "@/assets/icons/curved-hamburger-flipped.svg";

import { useForm, Controller } from "react-hook-form";
import { addInstitutionValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import "react-phone-number-input/style.css";
import PhoneInput, {isValidPhoneNumber } from "react-phone-number-input";
import "./PhoneInput.scss";
import { addInstitution } from "@/redux/Proprietor/ProprietorSlice";
import { useDispatch } from "react-redux";
import Select from "@/components/Select/Select";
import { useNavigate, useParams } from "react-router-dom";



const AddInstitution = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useParams();


  const resolver = yupResolver(addInstitutionValidationSchema);

  const defaultValues = {
    email: "",
    name: "",
    address: "",
    type: "",
    phone: "",
    website: ""
  };

  const { handleSubmit, formState: { errors }, control } = useForm({ defaultValues, resolver, mode: "all"  });

  const register = async (data) => {
    let response = await dispatch(addInstitution(data));
    console.log(response);
    if (response.payload.success) {
      navigate(`/${user}/dashboard`);
    }
  };
  let institutionsCategory = [
    {
      value: "school",
      label: "School"
    }, 
    {
      value: "church",
      label: "Church"
    },
    {
      value: "mosque",
      label: "Mosque"
    }
  ];
  const getInstitutionType =()=>{
    let result =  institutionsCategory.map((item) => {
      return {value: item.value, label: item.label};
    });
    return result;
  };

  return (
    <AuthPageContainer showTopDivWave={false}>
      <div className={cx(styles.addInstitutionWrapper)} >
        <TopDivWave />
   
        <div className={cx(styles.signUpWrapper, "flexCol")}>
          <div className={cx(styles.container, "row")}>
            <div className={cx(styles.leftCol, "col-md-6")}>
              <h3><span className={cx(styles.wordBreak)}>Add <img className={cx(styles.floatingIcon)} src={curvedHamburgerFlipped} alt="icon" /></span> Institution</h3>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis odio tempora cupiditate, iure consequatur molestias, nulla aut vel suscipit a ab dolore sunt quos minima ad alias ullam architecto aliquam?</p>
            </div>

            <section className={cx(styles.rightCol, "col-md-6", "flexCol")}>
              <div className={cx(styles.formWrapper, "flexRow")}>
                <form onSubmit={handleSubmit((data) => register(data))}
                  className={cx("flexCol")}
                >
                  <div className={cx(styles.formInputsContainer, "flexRow")}>

                    <div className={cx(styles.maxWidth)}>
                      <Controller
                        name="name"
                        control={control}
                        render={({ field, ref }) => (
                          <InputField
                            {...field} 
                            placeholder={" "}
                            label={"Name"}
                            type="text"
                            error={errors?.name && errors?.name?.message}

                          />
                        )}
                      />
                    </div>

                    <div className={cx(styles.maxWidth)}>
                      <Controller
                        className={cx(styles.controller)}
                        name="address"
                        control={control}
                        render={({ field, ref }) => (
                          <InputField
                            {...field} 
                            placeholder={" "}
                            label={"Address"}
                            type="text"
                            error={errors?.address && errors?.address?.message}

                          />
                        )}
                      />
                    </div>
               
                    <div className={cx(styles.inputWrapper)}>
                      <Controller
                        name="type"
                        control={control}
                        render={({ field, ref }) => (
                          <Select 
                            {...field}
                            options={getInstitutionType()} 
                            label={"Institution Type"}
                            error={errors?.type && errors?.type?.message}
                            marginbottom="1.625rem"
                          />

                        )}
                      />
                    </div>

                    <div className={cx(styles.inputWrapper)}>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field, ref }) => (
                          <InputField
                            {...field} 
                            placeholder={" "}
                            label={"Institution Email"}
                            type="text"
                            error={errors?.email && errors?.email?.message}

                          />
                        )}
                      />
                    </div>
               
                    <div className={cx(styles.inputWrapper)}>
                      <Controller
                        name="website"
                        control={control}
                        render={({ field, ref }) => (
                          <InputField
                            {...field} 
                            placeholder={" "}
                            label={"Website"}
                            type="text"
                            error={errors?.website && errors?.website?.message}

                          />
                        )}
                      />
                    </div>

                    <div className={cx(styles.inputWrapper, "PhoneInputWrapper")}>
                      <label htmlFor="phoneNumber">Phone Number</label>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field, ref }) => (
                          <PhoneInput
                            placeholder="Enter phone number"
                            {...field}
                            international
                            countryCallingCodeEditable={false}
                            defaultCountry="NG"
                          />
                        )}
                      />
                      {errors?.phoneNumber && <small>{errors?.phoneNumber?.message}</small> }
                    </div>

                    {/* <div className={cx(styles.inputWrapper)}>
                      <Controller
                        name="logo"
                        control={control}
                        render={({ field, ref }) => (
                          <InputField
                            {...field} 
                            placeholder={" "}
                            label={"logo"}
                            type="password"
                            error={errors?.logo && errors?.logo?.message}

                          />
                        )}
                      />
                    </div> */}

                  </div>

                  <div className={cx(styles.submitBtnDiv, "flexRow")}>        
                    <Button onClick={handleSubmit((data) => register(data))} title="Submit" borderRadiusType="lowRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="transparent" hoverColor="#000"   />
                  </div>


              
                </form>
              </div>

            </section>
          </div>
        </div>		
      </div>
			
    </AuthPageContainer>
  );
};

export default AddInstitution;