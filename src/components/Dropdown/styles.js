import styled from 'styled-components';

export const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 20px 50px 20px 20px;
  width: max-content;
  border-radius: 5px;
  background: #f5f5f5;
  box-shadow: 0px 4px 4px rgba(199, 223, 241, 0.25);
  position: absolute;
  right: 10px;
  top: 40%;

  p {
    margin: 10px;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 150%;
    cursor: pointer;
  }

  p:hover {
    color: blue;
  }
  .delete {
    color: #eb5757;
  }
  &:after {
    content: '';
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
    border-bottom: 15px solid #f5f5f5;
    position: absolute;
    top: -9px;
    right: 15px;
  }
`;
