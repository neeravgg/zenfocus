import styled from "styled-components";

export const StyledRadio = styled.div`
  flex: 1;
  h1 {
    font-size: 16px;
    position: absolute;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    left: 0;
    right: 0;
  width: 100%;

  }
`;

export const StyledRadioMedia = styled.div`
  display: flex;
  padding: 10px 50px;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
`;


export const StyledMarquee = styled.div`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  animation: marquee 10s linear infinite; /* Adjust the duration as needed */

  /* Your existing styling */
  display: flex;
  padding: 10px 50px;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 100%;

  @keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;