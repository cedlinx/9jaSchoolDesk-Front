import React from "react";
import errorIcon from "@/assets/iconS/404-error.svg";
import Button from "@/components/Button/Button";
import { useNavigate } from "react-router-dom";
import "./Page404.scss";
import MenuBar from "@/components/MenuBar/MenuBar";

const Page404 = () => {
	const navigate = useNavigate();

	return (
		<section className="error-page-container">
			<MenuBar />
			<div className="error-card">
				<div>
					<img src={errorIcon} alt="404" />
				</div>
				<div className="error-text">
					We are sorry, but the page you requested is tempoarily unavailable, had its
					name changed, has been removed or doesn’t exist.
				</div>
				<div>
					<Button onClick={() => navigate("/")} title="Go To The Homepage" textColor="#FFF" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#D25B5D" />
				</div>
			</div>
		</section>
	);
};

export default Page404;