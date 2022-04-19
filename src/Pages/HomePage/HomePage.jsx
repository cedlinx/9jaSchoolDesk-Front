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
import TopDivWave from "@/components/WaveSvg/TopDivWave";
import BottomDivWave from "@/components/WaveSvg/BottomDivWave";

import studentImage from "@/assets/images/Student Image.png";
import teacherImage from "@/assets/images/Teacher Image.png";
import parentsImage from "@/assets/images/Parents Image.png";
import ruler from "@/assets/images/ruler.png";
import book from "@/assets/images/book.png";
import pencil from "@/assets/images/pencil.png";
import idea from "@/assets/images/idea.png";
import curvedHamburger from "@/assets/icons/curved-hamburger.svg";
import curvedHamburgerFlipped from "@/assets/icons/curved-hamburger-flipped.svg";

import circleIcon from "@/assets/icons/circle_icon.svg";


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

					<img src={pencil} className={cx(styles.floatingImage, styles.pencil)} alt="icon" />
					<img className={cx(styles.floatingImage, styles.book)} src={book} alt="icon" />
					<img className={cx(styles.floatingImage, styles.ruler)} src={ruler} alt="icon" />
					<img className={cx(styles.floatingImage, styles.idea)} src={idea} alt="icon" />
					
					<h1 
						className={cx(styles.heroHeader)}
						data-aos="fade-up"
						data-aos-anchor-placement="center-bottom"
						data-aos-delay="600"
					>The one place where <span>Children</span>, <span>Parents</span> and <span>Teachers</span> all come together.</h1>
					<p className={cx(styles.heroCaption)}
						data-aos="fade-up"
						data-aos-anchor-placement="center-bottom"
						data-aos-delay="800"
					>Become part of your child’s academic growth today with 9jaschoolDesk</p>
					
					<div className={cx(styles.btnDiv, "flexRow-fully-centered")}>

						<Button onClick={()=> navigate("/#")} title="Student" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" fontweight="bold" />
								
						<Button onClick={()=> navigate("/#")} title="Parent" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" fontweight="bold" />

						<Button onClick={()=> navigate("/#")} title="Teacher" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" fontweight="bold" />
						
					</div>
						
				</div>
			
				<div className={cx(styles.mainContentWrapper, "flexCol-align-center")}>

					<TopDivWave />

					<div className={cx(styles.studentsSection, styles.sectionWrapper, "row")}>
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
							<small>Students</small>
							<h3>Learning never <span className={cx(styles.wordBreak)}>got <img className={cx(styles.floatingIcon)} src={curvedHamburger} alt="icon" /></span> <br />  smoother</h3>

							<div className={cx(styles.pointsWrapper)}>
								<div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
								<div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
								<div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant</span> </div>
								<div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
							</div>

							<Button onClick={()=>navigate("/signup")} title="Get Started" borderRadiusType="fullyRounded" textColor="#fff"  bgColor="#D25B5D" hoverBg="#fff" hoverColor="#D25B5D" />
						
						</div>
						
					</div>

					<div className={cx(styles.parentsSection, styles.sectionWrapper, "row")}>
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
							<h3><span className={cx(styles.wordBreak)}>Become <img className={cx(styles.floatingIcon)} src={curvedHamburgerFlipped} alt="icon" /></span> part of your kid's <br /> learning process</h3>

							<div className={cx(styles.pointsWrapper)}>
								<div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
								<div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
								<div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
								<div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
							</div>

							<Button onClick={()=>navigate("/signup")} title="Get Started" borderRadiusType="fullyRounded" textColor="#fff"  bgColor="#D25B5D" hoverBg="#fff" hoverColor="#D25B5D" />
						
						</div>
						
					</div>

					<div className={cx(styles.teachersSection, styles.sectionWrapper, "row")}>
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
							<h3>Cordinate and Manage <span className={cx(styles.wordBreak)}>your <img className={cx(styles.floatingIcon)} src={curvedHamburger} alt="icon" /></span> <br />  classroom efficiently</h3>

							<div className={cx(styles.pointsWrapper)}>
								<div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
								<div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
								<div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
								<div><span><img src={circleIcon} /></span><span>Lorem ipsum uspendisse habitant.</span> </div>
							</div>

							<Button onClick={()=>navigate("/signup")} title="Get Started" borderRadiusType="fullyRounded" textColor="#fff"  bgColor="#D25B5D" hoverBg="#fff" hoverColor="#D25B5D" />
						
						</div>
						
					</div>
				
					<BottomDivWave />


				
				</div>

				<Testimonials  />

				<section className={cx(styles.pricingWrapper, "flex-row")}>
					<h3>Choose the perfect plan for you</h3>
					<div className={cx(styles.cardWrapper)}>
						<PriceCard title="Starter" amount="100000" btnText="Subscribe" benefitsArray={pricingArray.starter} />

						<PriceCard title="Premium" amount="100000" btnText="Get 7 days Free Trial" benefitsArray={pricingArray.premium} />

						<PriceCard title="Basic" amount="100000" btnText="Subscribe" benefitsArray={pricingArray.basic} />
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