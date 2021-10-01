import React from "react";
import styled from "styled-components";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ILoading {}

const LoadingIcon = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: rotate 2s infinite;
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loading: React.FC<ILoading> = () => {
  return (
    <LoadingIcon>
      <AiOutlineLoading3Quarters />
    </LoadingIcon>
  );
};

export default Loading;
