import React from "react";
import styled from "styled-components";

const InstaTitle = styled.div<{ fontSize?: string }>`
  display: inline;
  font-family: "Dancing Script";
  font-size: ${(props) => props.fontSize};
`;

const InstaLogo: React.FC<{ fontSize?: string }> = ({ fontSize }) => {
  return <InstaTitle fontSize={fontSize}>Instagram</InstaTitle>;
};

export default InstaLogo;
