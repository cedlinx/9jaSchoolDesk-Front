import React, {useRef, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import PageContainer from "@/components/PageContainer/PageContainer";
import Testimonials from "@/components/Testimonials/Testimonials";
import cx from "classnames";
import styles from "./HomePage.module.scss";
import { Card} from "react-bootstrap";
// import heroImage from "@/assets/images/hero-image.png";
import Button from "@/components/Button/Button";
import MenuBar from "@/components/MenuBar/MenuBar";
import { Icon } from "@iconify/react";
import PriceCard from "@/components/PriceCard/PriceCard";

import studentImage from "@/assets/images/Student Image.png";
import teacherImage from "@/assets/images/Teacher Image.png";
import parentsImage from "@/assets/images/Parents Image.png";
// import manImage from "@/assets/images/man.png";
// import homepageHeroImg from "@/assets/images/homepage_hero.png";
// import whyChooseImage from "@/assets/images/whyChooseImage.png";
// import whoToUseImage from "@/assets/images/whotouse.png";
// import subscribeImage from "@/assets/images/subscribeImage.png";
// import servicesIcon1 from "@/assets/icons/servicesIcon1.png";
// import servicesIcon2 from "@/assets/icons/servicesIcon2.png";
// import servicesIcon3 from "@/assets/icons/servicesIcon3.png";
// import whyChooseIcon1 from "@/assets/icons/whyChooseIcon1.png";
// import whyChooseIcon2 from "@/assets/icons/whyChooseIcon2.png";
// import whyChooseIcon3 from "@/assets/icons/whyChooseIcon3.png";
// import arrowUpIcon from "@/assets/icons/arrow-up.svg";
import circleIcon from "@/assets/icons/circle_icon.svg";
// import appleStore from "@/assets/images/Apple Store.png";
// import googleStore from "@/assets/images/Google Play.png";



const HomePage = () => {
	const navigate = useNavigate();

	const pricingArray = {
		basic: [ "Lorem ipsum uspendisse habitant.", "Lorem ipsum uspendisse habitant.", "Lorem ipsum uspendisse habitant.", "Lorem ipsum uspendisse habitant."],
		premium: ["Lorem ipsum uspendisse habitant.", "Lorem ipsum uspendisse habitant.", "Lorem ipsum uspendisse habitant.", "Lorem ipsum uspendisse habitant.", "Lorem ipsum uspendisse habitant.", "Lorem ipsum uspendisse habitant.", "Lorem ipsum uspendisse habitant.", "Lorem ipsum uspendisse habitant."],
		starter: ["Lorem ipsum uspendisse habitant.", "Lorem ipsum uspendisse habitant.", "Lorem ipsum uspendisse habitant.", "Lorem ipsum uspendisse habitant."]
	};

	
	return (
		<PageContainer showHeader={true}>

			<div className={cx(styles.homepageContainer)}>

				<div   className={cx(styles.heroWrapper)}>
					
					<h1 
						data-aos="fade-up"
						data-aos-anchor-placement="center-bottom"
						data-aos-delay="600"
					>The one place where Children, Parents and Teachers all come together.</h1>
					<p className='main-caption'
						data-aos="fade-up"
						data-aos-anchor-placement="center-bottom"
						data-aos-delay="800"
					>Become part of your child’s academic growth today with 9jaschoolDesk</p>
					
					<div className={cx(styles.btnDiv, "flexRow")}>

						<Button onClick={()=> navigate("/#")} title="Student" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#FF8001" fontweight="bold" />
								
						<Button onClick={()=> navigate("/#")} title="Parent" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#FF8001" fontweight="bold" />

						<Button onClick={()=> navigate("/#")} title="Teacher" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#FF8001" fontweight="bold" />
						
					</div>
						
				</div>
			
				<div className={cx(styles.mainContentWrapper, "flexCol-align-center")}>
					
					<div className={cx(styles.studentsSection, "row")}>
						<div data-aos="zoom-in-left"
							// data-aos-delay="1200"
							className={cx(styles.imageDiv, "col-sm-6", "col-md-6")}
						>
							<img src={studentImage} alt="img" />
						</div>

						<div
							data-aos="zoom-in-left"
							// data-aos-delay="1000"
							className={cx(styles.contentWrapper, "col-sm-6", "col-md-6")}
						>
							<small>Student</small>
							<h3>Learning never got <br /> smoother</h3>

							<div className={cx(styles.pointsWrapper)}>
								<div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
								<div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
								<div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
								<div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
							</div>

							<Button onClick={()=>navigate("/signup")} title="Get Started" borderRadiusType="fullyRounded" textColor="#fff"  bgColor="#D25B5D" hoverBg="#fff" hoverColor="#D25B5D" />
						
						</div>
						
					</div>

					<div className={cx(styles.parentsSection, "row")}>
						<div data-aos="zoom-in-left"
							// data-aos-delay="1200"
							className={cx(styles.imageDiv, "col-sm-6", "col-md-6")}
						>
							<img src={parentsImage} alt="img" />
						</div>

						<div
							data-aos="zoom-in-left"
							// data-aos-delay="1000"
							className={cx(styles.contentWrapper, "col-sm-6", "col-md-6")}
						>
							<small>Parents</small>
							<h3>Become part of your kid’s <br /> learning process</h3>

							<div className={cx(styles.pointsWrapper)}>
								<div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
								<div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
								<div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
								<div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
							</div>

							<Button onClick={()=>navigate("/signup")} title="Get Started" borderRadiusType="fullyRounded" textColor="#fff"  bgColor="#D25B5D" hoverBg="#fff" hoverColor="#D25B5D" />
						
						</div>
						
					</div>

					<div className={cx(styles.teachersSection, "row")}>
						<div data-aos="zoom-in-left"
							// data-aos-delay="1200"
							className={cx(styles.imageDiv, "col-sm-6", "col-md-6")}
						>
							<img src={teacherImage} alt="img" />
						</div>

						<div
							data-aos="zoom-in-left"
							// data-aos-delay="1000"
							className={cx(styles.contentWrapper, "col-sm-6", "col-md-6")}
						>
							<small>Teachers</small>
							<h3>Cordinate and Manage your <br /> classroom efficiently</h3>

							<div className={cx(styles.pointsWrapper)}>
								<div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
								<div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
								<div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
								<div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
							</div>

							<Button onClick={()=>navigate("/signup")} title="Get Started" borderRadiusType="fullyRounded" textColor="#fff"  bgColor="#D25B5D" hoverBg="#fff" hoverColor="#D25B5D" />
						
						</div>
						
					</div>
				
				
				</div>

				<Testimonials  />

				<section className={cx(styles.pricingWrapper, "flex-row")}>
					<h3>Choose the perfect plan for you</h3>
					<div className={cx(styles.cardWrapper)}>
						<PriceCard pricingPage title="Starter" amount="100000" btnText="Subscribe Now" benefitsArray={pricingArray.starter} />

						<PriceCard pricingPage title="Premium" amount="100000" btnText="Subscribe Now" benefitsArray={pricingArray.premium} />

						<PriceCard pricingPage title="Basic" amount="100000" btnText="Subscribe Now" benefitsArray={pricingArray.basic} />
					</div>
					
				</section>

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