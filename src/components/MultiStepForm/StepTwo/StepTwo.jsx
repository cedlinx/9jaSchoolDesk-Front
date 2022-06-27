import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import cx from "classnames";
import styles from "./StepTwo.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import curvedHamburgerFlipped from "@/assets/icons/curved-hamburger-flipped.svg";

import Select from "@/components/Select/Select";
import { useForm, Controller } from "react-hook-form";
import { stepTwoValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import { CountryDropdown, RegionDropdown, CountryRegionData } from "react-country-region-selector";


const StepTwo = ({ nextStep, handleFormData, values, prevStep }) => {

  const navigate = useNavigate();

  const resolver = yupResolver(stepTwoValidationSchema);

  const defaultValues = {
    addressLine1: values.addressLine1,
    city: values.city,
    state: values.state,
    country: values.country
  };
    
  const { handleSubmit, formState: { errors }, control, setValue, reset } = useForm({ defaultValues, resolver, mode: "all"  });

  const register = (data) => {
    for (const item in data) {
      values[item] = data[item];
    }
    handleFormData(values);
    nextStep();
  };  

  const [ country, setCountry ] = useState("");
  const [ state, setState ] = useState("");

  
  const selectCountry = (val) =>{
    setCountry(val);
    setValue("country", val);
  };

  const selectState = (val) =>{
    setState(val);
    setValue("state", val);
  };

  
  return (
    <div className={cx(styles.signUpWrapper, "flexCol")}>
      <div className={cx(styles.container, "row")}>
        <div className={cx(styles.leftCol, "col-md-6")}>
          <h3><span className={cx(styles.wordBreak)}>Sign <img className={cx(styles.floatingIcon)} src={curvedHamburgerFlipped} alt="icon" /></span> Up</h3>
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
                    name="addressLine1"
                    control={control}
                    render={({ field }) => (
                      <InputField
                        {...field} 
                        placeholder={" "}
                        label={"Address Line 1"}
                        type="addressLine1"
                        error={errors?.addressLine1 && errors?.addressLine1?.message}
                        marginbottom="0"

                      />
                    )}
                  />
                </div>

                <div className={cx(styles.countryWrapper, styles.inputWrapper)}>
                  <label htmlFor="country">Country</label>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <CountryDropdown
                        {...field}
                        value={country}
                        onChange={(val) => selectCountry(val)}
                      />
                    )}
                  />
                  {errors?.country && <small>{errors?.country?.message}</small> }
                </div>

                <div className={cx(styles.regionWrapper, styles.inputWrapper)}>
                  <label htmlFor="state">State</label>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <RegionDropdown
                        {...field}
                        country={country}
                        value={state}
                        onChange={(val) => selectState(val)}
                      />
                    )}
                  />
                  {errors?.state && <small>{errors?.state?.message}</small> }
                </div>
               
                <div className={cx(styles.inputWrapper)}>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <InputField
                        {...field} 
                        placeholder={" "}
                        label={"City"}
                        type="text"
                        error={errors?.city && errors?.city?.message}

                      />
                    )}
                  />
                </div>
              </div>

              <div className={cx(styles.submitBtnDiv, "flexRow")}>
                <Button onClick={prevStep} title="Back" borderRadiusType="lowRounded" bordercolor="transparent" textColor="#f4f4f4" bgColor="gray" hoverColor="#1A3B4A" hoverBg="#f4f4f4" />
        
                <Button onClick={handleSubmit((data) => register(data))} title="Continue" borderRadiusType="lowRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="transparent" hoverColor="#000"   />
              </div>

              <p className={cx(styles.formText)}>Already have an account? <Link to="/login" state={{category: "parent"}}>Sign In</Link></p>
              
            </form>
          </div>

        </section>
      </div>
    </div>
  );
};

export default StepTwo;