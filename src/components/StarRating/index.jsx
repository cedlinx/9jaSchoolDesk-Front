import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Star from "./Star";
import "./style.scss";

const StarRating = ({
  numberOfStar,
  onSelectStar,
  numberOfSelectedStar,
  viewOnly
}) => {
  const [rating, setRating] = useState(numberOfSelectedStar || 0);
  const [hoverState, setHoverState] = useState(0);
  const defaultMode = () => {};
  const setOnMouseEnter = (valueRating) => {
    viewOnly ? defaultMode() : setHoverState(valueRating);
  };
  const setOnMouseLeave = () => {
    viewOnly ? defaultMode() : setHoverState(0);
  };
  const setOnMouseClick = (valueRating) => {
    viewOnly ? defaultMode() : setRating(valueRating);
  };

  useEffect(() => {
    onSelectStar(rating);
  }, [onSelectStar, rating]);

  useEffect(() => {
    setRating(numberOfSelectedStar);
  }, [numberOfSelectedStar]);

  return (
    <div className="staring-container">
      {[...Array(numberOfStar)].map((_, index) => {
        const valueRating = index + 1;
        return (
          <Star
            key={index}
            starId={index + 1}
            rating={hoverState || rating}
            onMouseEnter={() => setOnMouseEnter(valueRating)}
            onMouseLeave={setOnMouseLeave}
            onClick={() => setOnMouseClick(valueRating)}
          />
        );
      })}
    </div>
  );
};

StarRating.propTypes = {
  numberOfStar: PropTypes.number.isRequired,
  numberOfSelectedStar: PropTypes.number,
  onSelectStar: PropTypes.func,
  viewOnly: PropTypes.bool
};
StarRating.defaultProps = {
  onSelectStar: () => {},
  numberOfSelectedStar: 0,
  viewOnly: false
};

export default StarRating;
