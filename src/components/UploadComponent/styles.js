import styled from "styled-components";

export const PageWrapper = styled.div`
  border: 1px dashed #c1c7d0;
  border-radius: 4px;
  padding: 20px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  background: ${({ background }) => (background ? "#F4F5F7" : "")};

  .drop-file {
    font-size: 16px;
    line-height: 20px;
    color: #0050c8;
    text-align: center;

    .browse-file {
      font-weight: 600;
      cursor: pointer;
      &:focus {
        outline: none;
      }
    }
  }
  .size-limit {
    font-size: 14px;
    line-height: 30px;
    text-align: center;
    color: #5e6c84;
  }
  img{
    width: 4rem;
    margin-bottom: 1.5rem;
  }
`;

export const Label = styled.p`
  display: block;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 8px;
  color: #091e42;
  text-align: left;
`;
