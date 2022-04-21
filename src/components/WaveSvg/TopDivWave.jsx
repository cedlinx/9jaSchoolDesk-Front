import React from "react";
import styled from "styled-components";
import wavesImg from "@/assets/images/waves.svg";


const TopDivWave =()=>{
  return(
    <Image src={wavesImg} alt="" />
  );

};

const Image = styled.img`
        width: 100%;
        height: 5vh;
        object-position: center;

        // @media all and (min-width: 768px) {
        //         height: 10vh;
        // }
`;

export default TopDivWave;