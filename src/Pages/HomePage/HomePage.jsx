import React from "react";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import PageContainer from "@/components/PageContainer/PageContainer";
import Testimonials from "@/components/Testimonials/Testimonials";
import cx from "classnames";
import styles from "./HomePage.module.scss";
import { Card} from "react-bootstrap";
import heroImage from "@/assets/images/hero-image.png";
import Button from "@/components/Button/Button";
import MenuBar from "@/components/MenuBar/MenuBar";
import { Icon } from "@iconify/react";

import boyImage from "@/assets/images/right boy.png";
import manImage from "@/assets/images/man.png";
import homepageHeroImg from "@/assets/images/homepage_hero.png";
import whyChooseImage from "@/assets/images/whyChooseImage.png";
import whoToUseImage from "@/assets/images/whotouse.png";
import subscribeImage from "@/assets/images/subscribeImage.png";
import servicesIcon1 from "@/assets/icons/servicesIcon1.png";
import servicesIcon2 from "@/assets/icons/servicesIcon2.png";
import servicesIcon3 from "@/assets/icons/servicesIcon3.png";
import whyChooseIcon1 from "@/assets/icons/whyChooseIcon1.png";
import whyChooseIcon2 from "@/assets/icons/whyChooseIcon2.png";
import whyChooseIcon3 from "@/assets/icons/whyChooseIcon3.png";
import arrowUpIcon from "@/assets/icons/arrow-up.svg";
import appleStore from "@/assets/images/Apple Store.png";
import googleStore from "@/assets/images/Google Play.png";



const HomePage = () => {
	const navigate = useNavigate();
	
	return (
		<PageContainer showHeader={true}>

			<div className={cx(styles.homepageContainer)}>

				<div   className={cx(styles.heroWrapper)}>
					{/* <div className={cx(styles.header)}>
						<MenuBar />
					</div> */}
					<div className="row">
						<div className={cx(styles.colLeft, "col-md-6")} />
						<div className={cx(styles.colRight, "col-md-6")}>
							<h1 
								data-aos="fade-up"
								data-aos-anchor-placement="center-bottom"
								data-aos-delay="600"
							>Maximum Security  At Your Fingertips</h1>
							<p className='main-caption'
								data-aos="fade-up"
								data-aos-anchor-placement="center-bottom"
								data-aos-delay="800"
							>You need to keep your things safe and authenticated. Secure your valuables in few easy steps. Tap the button below to get started</p>
					
							<div className={cx(styles.btnDiv, "flexRow")}>
								
								<Button onClick={()=> navigate("/report-found-asset")} title="Report Found Items" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#FF8001" fontweight="bold" />

								<Button onClick={()=> navigate("/asset-verification")} title="Verify Asset" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#FF8001" fontweight="bold" />
						
						
							</div>
						</div>
					</div>
					
				</div>
			
				<div className={cx(styles.servicesWrapper, "flexCol-align-center")}>
					<h2>Who Can Use Our Services</h2>
					<p style={{textAlign: "center"}} className="main-caption">randomised words even slightly which don&apos;t look even slightly believable.</p>

					<div className="row">
						<div
							data-aos="zoom-in-left"
							// data-aos-delay="1000"
							className={cx(styles.cardWrapper, "col-sm-6", "col-md-6")}
						>
							<Card className={cx(styles.cardItem)}>
								<Card.Header className={cx(styles.cardHeader)}>
									{/* <img src={servicesIcon1} alt="" /> */}
									<Icon icon="dashicons:businessman" color="#2c0085" />
								</Card.Header>
								<Card.Body className={cx(styles.cardBody)}>
									<p className={cx(styles.title)}>Individual User</p>
									<p className={cx(styles.description)}>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum</p>
								</Card.Body>
							</Card>

							<Card className={cx(styles.cardItem)}>
								<Card.Header className={cx(styles.cardHeader)}>
									{/* <img src={servicesIcon2} alt="" /> */}
									<Icon icon="el:group" color="#ff8001" />
								</Card.Header>
								<Card.Body className={cx(styles.cardBody)}>
									<p className={cx(styles.title)}>Business User</p>
									<p className={cx(styles.description)}>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum</p>
								</Card.Body>
							</Card>

							<Card className={cx(styles.cardItem)}>
								<Card.Header className={cx(styles.cardHeader)}>
									{/* <img src={servicesIcon3} alt="" /> */}
									<Icon icon="ion:business" color="#2c0085" />
								</Card.Header>
								<Card.Body className={cx(styles.cardBody)}>
									<p className={cx(styles.title)}>Agency User</p>
									<p className={cx(styles.description)}>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum</p>
								</Card.Body>
							</Card>
					
						</div>
						<div data-aos="zoom-in-left"
							// data-aos-delay="1200"
							className={cx(styles.imageDiv, "col-sm-6", "col-md-6")}
						>
							<img src={whoToUseImage} alt="services" />
						</div>
					</div>
				
				
				</div>

				<div className={cx(styles.whyChooseUsWrapper, "flexCol-align-center")}>
					<h2>Why Choose Us</h2>
											
					<div className={cx("flexCol")}>
						
						<div className={cx(styles.smallCardWrapper,  "flexRow")}>
							
							<div className={cx(styles.cardItem)}>
								<Card.Header className={cx(styles.cardHeader)}>
									<img src={whyChooseIcon1} alt="" />
								</Card.Header>
								<Card.Body className={cx(styles.cardBody)}>Secured</Card.Body>
							</div>
						
							<div className={cx(styles.cardItem)}>
								<Card.Header className={cx(styles.cardHeader)}>
									<img src={whyChooseIcon2} alt="" />
								</Card.Header>
								<Card.Body className={cx(styles.cardBody)}>Easy To Use</Card.Body>
							</div>

							<div className={cx(styles.cardItem)}>
								<Card.Header className={cx(styles.cardHeader)}>
									<img src={whyChooseIcon3} alt="" />
								</Card.Header>
								<Card.Body className={cx(styles.cardBody)}>Accurate</Card.Body>
							</div>
				
						</div>

						<p className={cx(styles.description)}>You need to keep your things safe and authenticated. Secure your valuables in few easy steps. Tap the button below to get started</p>

						<div className={cx(styles.appStoreDiv, "flexRow")}>
							<a href="#">
								<img src={appleStore} alt="apple-store" />
							</a>
							<a href="#">
								<img src={googleStore} alt="google-store" />
							</a>
						</div>
					</div>

				</div>

				<div className={cx(styles.subscribeDiv, "row")}>
					<div
						data-aos="zoom-in-left"
						// data-aos-delay="1000"
						className={cx(styles.colLeft, "col-md-6")}
					>
						<img src={subscribeImage} alt="display-image" />
					</div>
				
					<div
						data-aos="zoom-in-left"
						// data-aos-delay="1200"
						className={cx(styles.colRight, "col-md-6")}
					>
						<h2>Subscribe For Newsletter </h2>
						<p className="main-caption">When, while lovely valley teems with vapour around meand meridian sun strikes</p>

						<div className={cx(styles.subscribeInputDiv, "flexRow")}>
							<input type="text" placeholder="noemail@gmail.com" /> <i><img src={arrowUpIcon} alt="arrow-icon" /></i>
						</div>
					</div>
				</div>

				<Testimonials  />
			</div>
		</PageContainer>
	);
};

HomePage.defaultProps = {
	title: ""
};

HomePage.propTypes = {
	title: PropTypes.string
};

export default HomePage;