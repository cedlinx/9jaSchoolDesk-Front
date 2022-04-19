import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./Security.module.scss";
import toggleOn from "@/assets/icons/toggleOn.svg";
import toggleOff from "@/assets/icons/toggleOff.svg";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import { FormCheck } from "react-bootstrap";
import { enable2fa, disable2fa, changePassword } from "@/redux/Security/security.action";
import { getUserInfo } from "@/redux/User/user.action";
import { toast } from "react-toastify";
import FormSkeleton from "@/components/SkeletonLoader/FormSkeleton";

import { useForm, Controller } from "react-hook-form";
import { changePasswordValidationSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";


const Security = () => {

	const dispatch = useDispatch();
	const user2faDetails = JSON.parse(localStorage.getItem("userDetails"))["2fa"];
	const loading = useSelector((state) => state?.user?.loading);
	const [enable2faCheck, setEnable2fa] = useState(user2faDetails.toLowerCase() === "disabled" ? false : true);

	const resolver = yupResolver(changePasswordValidationSchema);

	const defaultValues = {
		current_password: "",
		password: "",
		password_confirmation: ""

	};

	const { handleSubmit, formState: { errors }, control, reset } = useForm({ defaultValues, resolver, mode: "all" });

	const toggleChangeFxn = async (e) => {
		const checkedState = e.target.checked;
		const id = e.target.id;

		if (checkedState && id === "enable2fa") {
			let response = await dispatch(enable2fa({ value: 1 }));
			if (response.payload.data.success === true) {
				setEnable2fa(true);
				dispatch(getUserInfo());
			}
			else {
				toast.error("An error occured, kindly try again enable");
			}
		}
		else {
			let response = await dispatch(disable2fa({ value: 0 }));
			if (response.payload.data.success === true) {
				setEnable2fa(false);
				dispatch(getUserInfo());

			}
			else {
				toast.error("An error occured, kindly try again disable");
			}
		}
	};

	const changePasswordFxn = async (data) => {
		const response = await dispatch(changePassword({...data, id:99}));
	};

	return (
		<div className={cx(styles.container)}>
			<section className={cx(styles.securityWrapper)}>

				{/* <div className={cx(styles.header, "flexRow")}>
					<h3>Account Security</h3>
					<div className={cx(styles.btnDiv)}>
						<Button title="Change Password" borderRadiusType="lowRounded" textColor="#fff" bgColor="#D25B5D" />
					</div>
				</div> */}

				{loading ? <FormSkeleton /> :
					<form onSubmit={handleSubmit((data) => changePasswordFxn(data))} className="">

						<div className={cx(styles.header, "flexRow")}>
							<h3>Account Security</h3>
							<div className={cx(styles.btnDiv)}>
								<Button onClick={handleSubmit((data) => changePasswordFxn(data))} type title="Change Password" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#D25B5D" />
							</div>
						</div>

						<div className={cx(styles.body, "row")}>
							<div className="col-md-4 col-xs-12"><Controller
								name="current_password"
								control={control}
								render={({ field }) => (
									<InputField
										{...field}
										placeholder={"Current Password"}
										type="password"
										error={errors?.current_password && errors?.current_password?.message}
										
									/>
								)}
							                                    /></div>
							<div className="col-md-4 col-xs-12"><Controller
								name="password"
								control={control}
								render={({ field }) => (
									<InputField
										{...field}
										placeholder={"New Password"}
										type="password"
										error={errors?.password && errors?.password?.message}
										
									/>
								)}
							                                    /></div>
							<div className="col-md-4 col-xs-12"><Controller
								name="password_confirmation"
								control={control}
								render={({ field }) => (
									<InputField
										{...field}
										placeholder={"Confirm Password"}
										type="password"
										error={errors?.password_confirmation && errors?.password_confirmation?.message}
										
									/>
								)}
							                                    />
							</div>
						</div>

					</form>


				}

				<div className={cx(styles.itemWrapper)}>
					<div className={cx(styles.item)}><p>Enable 2 Factor Authorization</p></div>
					<div className={cx(styles.togglerDiv)}>
						<FormCheck
							id="enable2fa"
							type="switch"
							onChange={(e) => toggleChangeFxn(e)}
							checked={enable2faCheck}
						/>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Security;