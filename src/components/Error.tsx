import React from "react";
import styled from "styled-components";

interface IError {
  error: string;
}

const ErrorContainer = styled.div`
  margin-bottom: 7px;
  color: ${(props) => props.theme.color.red};
`;

const Error: React.FC<IError> = ({ error }) => {
  return <ErrorContainer>{error}</ErrorContainer>;
};

export default Error;
