import React from "react";
import SwiperCore, { EffectCoverflow, Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css";
// import "swiper/swiper.min.css";
// import "swiper/swiper.css";

// swiper bundle styles
import "swiper/css/bundle";

// swiper core styles
import "swiper/css";

// modules styles
import "swiper/css/navigation";
import "swiper/css/pagination";

// import "swiper/components/navigation/navigation.scss";
// import "swiper/components/pagination/pagination.scss";
// import "swiper/components/effect-flip/effect-flip.scss";
// import "swiper/components/scrollbar/scrollbar.scss";

import styles from "./NormalCarousel.module.scss";
import cx from "classnames";


SwiperCore.use([EffectCoverflow, Navigation, Pagination, Autoplay]);

const App = ({carouselArray}) => {

	const params = {
		effect: "fade",
		// coverflowEffect: {
		// 	rotate: 50,
		// 	stretch: 0,
		// 	depth: 150,
		// 	modifier: 1,
		// 	slideShadows: false
		// },   
		// autoplay: {
		// 	delay: 7500,
		// 	disableOnInteraction: false
		// },
		pagination:{
			clickable: true
		},
		grabCursor: true,
		centeredSlides: true,
		centeredSlidesBounds: true,
		slidesPerView: "3",
		spaceBetween: 0,
		slidesPerGroup: 1,
		loop: true,
		loopFillGroupWithBlank: false,

		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		},
		breakpoints: {
			// when window width is >= 320px
			320: {
				slidesPerView: 1,
				spaceBetween: 0
			},
			// when window width is >= 480px
			480: {
				slidesPerView: 1,
				spaceBetween: 0
			},
			// when window width is >= 640px
			640: {
				slidesPerView: 2,
				spaceBetween: 10
			},

			991: {
				slidesPerView: 3,
				spaceBetween: 10
			}
		}
	};

	return (
		<div>
			<Swiper
        
				className={cx(styles.mySwiper)}
				{...params}
			>
				<div className={cx(styles.prevBtn, "swiper-button-prev")}><i className="fa fa-arrow-circle-left" aria-hidden="true" /></div>
				<div className={cx(styles.nextBtn, "swiper-button-next")}><i className="fa fa-arrow-circle-right" aria-hidden="true" /></div>

				{carouselArray && carouselArray.map((item, index) => {
					return (
						<SwiperSlide key={index}>
							{item}
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default App;