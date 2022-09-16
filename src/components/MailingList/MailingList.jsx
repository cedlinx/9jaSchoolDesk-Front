import React, {useState, useEffect, useMemo} from "react";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import styles from "./MailingList.module.scss";
import Button from "@/components/Button/Button";
import { Icon } from "@iconify/react";
import appstore from "@/assets/images/appstore.svg";
import playstore from "@/assets/images/playstore.svg";
import { FaArrowRight } from "react-icons/fa";
import Input from "@/components/Input/Input";
import mailingListHeroImg from "@/assets/images/mailing-list-hero-image.png";
import { useForm, Controller } from "react-hook-form";
import { contactUsValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import TextArea from "@/components/TextArea/index";
import Select from "@/components/Select/Select";

import "react-phone-number-input/style.css";
import PhoneInput, {isValidPhoneNumber } from "react-phone-number-input";
import "./PhoneInput.scss";

import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import MailChimpForm from "@/components/MailChimpForm/MailChimpForm";



const MailingList = ({showMailingContent=true, showLocationContent}) => {

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const resolver = yupResolver(contactUsValidationSchema);

  const defaultValues = {
    email: "",
    name: "",
    phoneNumber: "",
    title: "",
    message: ""
  };

  const {register, handleSubmit, formState: { errors }, control,
    setValue, reset } = useForm({ defaultValues, resolver, mode: "all" });

  const submitMessage = (data) => {
    setLoading(true);
    emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID,import.meta.env.VITE_EMAILJS_TEMPLATE_ID, data, import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
      .then((response) => {
        setLoading(false);
        reset();
        toast.success("Message sent successfully");
      }, (err) => {
        setLoading(false);
        toast.error(err.text);
      });
  };

  const getTitles = (data) => {
    let result = [];
    data.map((item) => {
      result.push({label: item.title, value: item.title});
    });
    return result;
  };

  return (
    <div className={cx(styles.mailingListContainer, "row", "g-0")}>
      <div className={cx("flexCol", styles.leftSection, "col-xs-12", "col-sm-12", "col-lg-6", "col-xl-4")}>
        {showMailingContent && 
        <>
          <h3 className={cx(styles.heading)}>Join our mailing list and stay up to date</h3>
          <p className={cx(styles.introText)}>We are constantly updating our website with new courses to include professional trainings in Make-Up, Animation, Photography and lots more</p>
          {/* <div className={cx(styles.linkGroup, "flexRow")}>
            <a href="mailto:coordinator@wazobia.academy" ><Icon icon="ph:envelope-simple-light" color="white" /><span>coordinator@wazobia.academy</span></a>
            <a href="tel:+2349088265038" ><Icon icon="clarity:phone-handset-line" color="white" /><span>(090) 882-65038</span></a>
          </div> */}

          {/* <div className={cx("flexRow", styles.emailInputDiv)}>
            <Input
              placeholder={"email@email.com"}
              type="email"
              label="Email"
            />
            <Button title="Join" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#FC7620" hoverColor="#FC7620" hoverBg="#fff" />
          </div> */}

          < MailChimpForm />


          <div className={cx(styles.imageGroup, "flexRow-fully-centered")}>
            <a href="https://play.google.com/store/apps/details?id=com.teachonmars.wazobia.wazobiademy&hl=en&gl=US" target="_blank" className={cx(styles.btn)} rel="noreferrer"><img src={playstore} alt="" /></a>
            <a href="https://apps.apple.com/my/app/wazobia-academy/id1621475582" target="_blank" className={cx(styles.btn)} rel="noreferrer"><img src={appstore} alt="" /></a>
          </div>
        </>
        }
      
      </div>
      <div className={cx("flexCol", styles.middleSection, "col-xs-12", "col-sm-12", "col-lg-6", "col-xl-5")}>
        <section className={cx(styles.formWrapper)}>
          <h3 className={cx(styles.heading)}>Send us a message</h3>
          <form
            onSubmit={handleSubmit((data) => submitMessage(data))}
            className={cx(styles["registration-form"])}
          >
            <div className={cx(styles["input-wrapper"])}>

              <div className={cx(styles.formGroup)}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder={"Your Name"}
                      type="text"
                      label="Your Name"
                      required={true}
                      error={errors?.name && errors?.name?.message}
                    />
                  )}
                />
              </div>

              <div className={cx(styles.formGroup)}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder={"example@example.com"}
                      type="email"
                      label="Email Address"
                      required={true}
                      toolTipIcon
                      toolTipText={"Enter a valid email address"}
                      error={errors?.email && errors?.email?.message}
                    />
                  )}
                />
              </div>

              <div className={cx(styles.formGroup, "PhoneInputWrapperMailingList")}>
                <label htmlFor="phoneNumber">Phone Number</label>
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
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

              <div className={cx(styles.formGroup, styles.maxWidth)}>
                <Controller
                  name="message"
                  control={control}
                  render={({ field }) => (
                    
                    <TextArea 
                      {...field}
                      label="Message"
                      required={true}
                      error={errors?.message && errors?.message?.message}
                      type="text"
                      placeholder={"Enter your message here"}
                    />
                  )}
                />
              </div>
          
            </div>

            <div
              className={cx(styles.footer)}
              style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
            >

              <button onClick={handleSubmit((data) => submitMessage(data))}
                disabled={loading ? true : false} className={cx(styles.loginBtn)}
              >{loading ? "Submitting..." : "Submit"}
                <FaArrowRight className='ml-2' />
              </button>

              {/* <p>Already a Member? <Link to="/login"> Sign In </Link></p> */}
            </div>
          </form>
        </section>
      </div>
      <div className={cx("flexCol", styles.rightSection, "col-xs-12", "col-sm-12", "col-lg-12", "col-xl-3")}>
        <img src={mailingListHeroImg} alt="image" />
      </div>
    </div>
  );
};

export default MailingList;