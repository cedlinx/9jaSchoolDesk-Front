import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import {Link} from "react-router-dom";
import styles from "./Testimonials.module.scss";
import { Card} from "react-bootstrap";
import { Icon } from "@iconify/react";
import CoverFlowSlider from "@/components/Carousels/CoverFlowSlider/CoverFlowSlider";


import testimonialsAvatar1 from "@/assets/images/testimonialsAvatar1.png";
import testimonialsAvatar2 from "@/assets/images/testimonialsAvatar2.png";
import testimonialsAvatar3 from "@/assets/images/testimonialsAvatar3.png";

import testimonialsIcon from "@/assets/icons/testimonialsIcon.png";


const Testimonials = props => {

	let testimonialData = [
		{
			avatar: testimonialsAvatar1,
			name: "Charles Patterson",
			position: "Specialist In Mathematics",
			icon: testimonialsIcon,
			comment: "consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
		},

		{
			avatar: testimonialsAvatar2,
			name: "Charles Patterson",
			position: "Specialist In Mathematics",
			icon: testimonialsIcon,
			comment: "consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
		},

		{
			avatar: testimonialsAvatar3,
			name: "Charles Patterson",
			position: "Specialist In Mathematics",
			icon: testimonialsIcon,
			comment: "consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
		}
	]; 

	  const testArray = ()=>{
		  return (
			 testimonialData.map((element, index)=>{
				 return(
					<Card key={index} className={cx(styles.cardItem)}>
						<Card.Header className={cx(styles.cardHeader)}>
							<div>
								<img className={cx(styles.avatar)} src={element.avatar} alt="" />
							</div>
							<div>
								<p>{element.name}</p>
								<p>{element.position}</p>
							</div>
							<div>
								<i><img src={element.testimonialIcon} alt="" /></i>
							</div>
						</Card.Header>
						<Card.Body className={cx(styles.cardBody)}>{element.comment}</Card.Body>	
					</Card>
				 );
			 })


		  );
	  };

	return (

		
		<section>
            
			<div className={cx(styles.testimonialsContainer)}>
				
				<div className={cx(styles.header)}>
					<h2>What The People Thinks</h2>
					<p className="main-caption">Intrinsicly predominate multimedia based leadership skills whereas long-term high-impact niche markets.</p>
				</div>
			

				<div className={cx(styles.cardWrapper)}>
					<CoverFlowSlider carouselArray={testArray()} />		
				</div> 

				
			</div>
		</section>
	);
};

Testimonials.propTypes = {

};

export default Testimonials;