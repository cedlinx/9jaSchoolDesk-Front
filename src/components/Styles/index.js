/* eslint-disable no-confusing-arrow */
import { Form } from "react-bootstrap";
import styled, { css } from "styled-components";

export const SpaceBottom = styled.div`
  margin-bottom: ${(props) => (props.by ? props.by : "40px")};
`;

export const FlexWrapper = styled.div`
  display: ${(props) => props?.display || "flex"};
  flex-direction: ${(props) => props?.direction || "row"};
  align-items: ${(props) => props?.align_items || "center"};
  justify-content: ${(props) => props?.justify_content || null};
  width: ${(props) => props?.width || "100%"};
`;

export const Text = styled.p`
  font-size: ${(props) => (props.size ? props.size : "16px")};
  padding: ${(props) => props?.padding};
  margin: ${(props) => props?.margin};
  font-weight: ${(props) => (props.weight ? props.weight : "normal")};
  color: ${(props) => (props.color ? props.color : "#333333")};
  text-align: ${(props) => (props.align ? props.align : "left")};
  text-transform: ${(props) => (props.transform ? props.transform : "")};
  word-break: ${(props) => props?.wordBreak};
`;

export const H3 = styled.h3`
  font-size: ${(props) => (props.size ? props.size : "16px")};
  font-weight: ${(props) => (props.weight ? props.weight : "normal")};
  color: ${(props) => (props.color ? props.color : "#333333")};
  text-align: ${(props) => (props.align ? props.align : "left")};
  text-transform: ${(props) => (props.transform ? props.transform : "")};
`;

export const H4 = styled.h4`
  font-size: ${(props) => (props.size ? props.size : "16px")};
  font-weight: ${(props) => (props.weight ? props.weight : "normal")};
  color: ${(props) => (props.color ? props.color : "#333333")};
  text-align: ${(props) => (props.align ? props.align : "left")};
  text-transform: ${(props) => (props.transform ? props.transform : "")};
`;
export const H2 = styled.h2`
  font-size: ${(props) => (props.size ? props.size : "16px")};
  font-weight: ${(props) => (props.weight ? props.weight : "normal")};
  color: ${(props) => (props.color ? props.color : "#333333")};
  text-align: ${(props) => (props.align ? props.align : "left")};
  text-transform: ${(props) => (props.transform ? props.transform : "")};
`;

export const PaginationContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 20px;
  div {
    display: grid;
    align-items: center;
    justify-items: center;
    grid-template-columns: auto 60px;
    &:first-child {
      grid-template-columns: repeat(5, 35px);
    }
    &:last-child {
      justify-items: end;
      span {
        color: #454d59;
        position: relative;
      }
    }
    button {
      display: inline-block;
      width: 32px;
      height: 32px;
      border: 1px solid #b0bac9;
      background: #fff;
      color: #408996;
      font-size: 14px;
    }
    span {
      font-size: 14px;
      color: #b0bac9;
      &:nth-child(2n) {
        color: #333;
      }
    }
  }
`;
export const PageSelector = styled.select`
  border: 1px solid #b0bac9;
  appearance: none;
  padding: 10px 25px 10px 18px;
  position: relative;
`;


export const ChevronDiv = styled.span`
  display: inline-block;
  margin-left: 10px;
  img {
    display: block;
    position: relative;
    top: 3px;
    cursor: pointer;
  }
`;
export const Wrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(199, 223, 241, 0.25);
  border-radius: 5px;
  width: ${(props) => props?.width || "100%"};
  padding: ${(props) => props?.padding};
  border: ${(props) => props?.border};
  margin: ${(props) => props?.margin};
  margin-left: ${(props) => props?.marginLeft};
  height: fit-content;
`;

export const FormGroup = styled(Form.Group)` 
  display: block;
  position: relative;
  margin-bottom: ${({ marginbottom }) => (marginbottom)};

  label {
    position: absolute;
    // transform: translate(0px, 0px) scale(1);
    // margin-bottom: 0px;
    // transform-origin: top left;
    // transition: all 0.2s ease-out;
    left: 16px;
    top: 2px;
    z-index: 3;


    display: block;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: #000;
    text-align: left;
    ${({ required }) => required
    ? `
      ::after {
        content: '*';
        color: red;
        padding-left: 5px;
      }
      `
    : ""}
  }
  
  input {
    width: 100%;
    box-sizing: border-box;
    border: none;
    color: #555A6E;
    transition: 0.3s;
    background: #fff;
    font-size: 14px;
    padding: 0.75rem 0rem 0rem 0rem;
    &:focus {
      outline: none;
      color: #344563;
    }
    &:-webkit-autofill ~ label{
      transform: translate(0, -12px) scale(0.7);
    }
    &::placeholder {
      // text-align: right;
    }
  }
  .input-container {
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 7.5px 10px 7.5px 10px;
    box-sizing: border-box;
    border-radius: ${({ borderradius }) => borderradius ? borderradius : "1.5rem"}; 
    border: ${({ border }) => (`1px solid ${border}`)};
    color: #5e6c84;
    transition: 0.3s;
    background: #fff;
    &:focus{
      border: 1px solid #022B69;
    }
    &:focus-within label{
      transform: translate(0, -12px) scale(0.7);
    }
    img{
      margin-right: 0.25rem;
    padding: 0rem 0rem 0rem 0rem;

    }
   
    .Active {
      transform: translate(0, -12px) scale(0.875);
    }
  }
  textarea {
    display: block;
    width: 100%;
    min-height: 111px;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #c1c7d0;
    border: 1px solid #022B69;
    color: #5e6c84;
    transition: 0.3s;
    background: #f4f5f7;
    font-size: 16px;
    &:focus {
      outline: none;
      border: 1px solid #0050c8;
      color: #344563;
    }
  }
  .error {
    font-size: 0.875rem;
    color: #eb5757;
    position: absolute;
    left: 0;
    // bottom: -35%;
    text-align: left;
    padding: 0.25rem 0px 0px 0px;
    margin: 0px;
    line-height: 1;
  }
  .eye-icon {
    cursor: pointer;
  }
  position: relative;
`;

export const defaultButton = css`
  background: #fff;
  color: #172b4d;
  font-weight: 600;
  font-size: 14px;
`;

export const primaryButton = css`
  color: ${({ company }) => (company ? "#333333" : "#fff")};
  background: ${({ company }) => (company ? "#fff" : "#1a21ba")};
`;

export const StyledButton = styled.button`
  padding: ${({ size }) => (size === "large" ? "10px" : "5px 10px")};
  margin: ${({ margin = "0 10px" }) => margin};
  border-radius: 4px;
  border: ${({ bordered }) => (bordered ? "1px solid #D9D9D9" : "none")};
  background: ${(props) => (props?.outlined ? "#fff !important" : "")};
  color: ${(props) => (props?.outlined ? "#333333 !important" : "#fff")};
  width: ${({ block }) => (block ? "100%" : "auto")};
  box-shadow: ${({ float }) => float ? "0px 4px 4px rgba(199, 223, 241, 0.25)" : "none"};
  ${({ buttonType }) => (buttonType === "defaultButton" ? defaultButton : primaryButton)};
  ${({ buttonType }) => (buttonType === "defaultButton" ? "opacity: .8" : "")};
  transition: 0.3s;
  &:hover {
    ${({ buttonType }) => (buttonType === "defaultButton" ? "opacity: 1" : "")};
  }
`;

export const StyledTextArea = styled.textarea`
  min-height: ${({ minHeight = "100px" }) => minHeight};
  background-color: #fff !important;
  font-size: ${({ fontSize = "10px" }) => fontSize};
  font-weight: ${({ fontWeight = "400" }) => fontWeight};
  border: ${({ border }) => border};
  color: ${({ color }) => color ?? "#000"};
`;

export const Select = styled.select`
  display: block;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #c1c7d0;
  color: #5e6c84;
  transition: 0.3s;
  background: #f4f5f7;
  position: relative;
  -webkit-appearance: none;
  -moz-appearance: none;
  & + img {
    position: absolute;
    top: 46%;
    right: 14px;
    color: #344563;
  }
`;

export const ErrorLabel = styled.div`
  color: red;
  text-align: ${(props) => (props.position ? props.position : "center")};
  position: relative;
  top: -12px;
  margin-bottom: 10px;
`;

export const Required = styled.span`
  color: #e32;
`;

export const Nav = styled.nav`
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  background-color: #fbfbfb; ;
`;
export const PageWrapper = styled.div`
  overflow-x: hidden;
`;


export const ArrrowDown = styled.img`
  position: absolute;
  right: 10px;
  top: 15px;
`;

export const LinkNav = styled.nav`
    margin-top: 70px;
    height: 71px;
    background: #FFF;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    a{
        margin-right: 70px;
        color: black;
        text-decoration: none;
        &:hover{
            font-weight: 500;
            color: #1A21BA;
        }
        .indicator{
            display: none;

        }
    }
    .active{
        .indicator{
            display: block;
            height: 3px;
            
            background: #1A21BA;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;

        }
        font-weight: 500;
            color: #1A21BA;
    }
    .approval-link-length{
        width: 24px;
        height: 22px;
        background: #DEEBFF;
        border-radius: 100px;
        font-size: 12px;
        padding: 4px 8px;
    }
`;
