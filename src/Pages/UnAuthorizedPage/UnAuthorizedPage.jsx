import React from "react";
import unAuthorizedIcon from "@/assets/images/unauthorized.jpg";
import Button from "@/components/Button/Button";
import { useNavigate, Link } from "react-router-dom";
import "./UnAuthorizedPage.scss";
import MenuBar from "@/components/MenuBar/MenuBar";

const Page404 = () => {
	const navigate = useNavigate();

	const clearLocalStorage = () => {
		localStorage.clear();
		navigate("/");
	};

	return (
		<section className="error-page-container">
			<MenuBar />
			<div className="error-card">
				<div className="error-image-div">
					<img src={unAuthorizedIcon} alt="404" />
				</div>
				<div className="error-text">
					We are sorry, you do not have the administrator rights to access this page. Kindly verify the url or <Link onClick={()=> localStorage.clear()} to="/contact" >contact us by clicking this link</Link> .
				</div>
				<div>
					<Button onClick={() => clearLocalStorage()} title="Go To The Homepage" textColor="#FFF" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#2C0085" />
				</div>
			</div>
		</section>
	);
};

export default Page404;