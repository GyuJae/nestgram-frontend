import React from "react";
import styled from "styled-components";
import Header from "./Header";

const Container = styled.div`
  height: 100%;
`;

const Content = styled.main<{ width?: string }>`
  margin: 0 auto;
  margin-top: 70px;
  max-width: ${(props) => (props.width ? props.width : "450px")};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderContainer = styled.div`
  position: absolute;
  width: 100%;
  @supports (position: sticky) or (position: -webkit-sticky) {
    position: fixed;
    top: 0;
    z-index: 1000;
  }
`;

const Layout: React.FC<{ children: React.ReactChild; width?: string }> = ({
  children,
  width,
}) => {
  return (
    <Container>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <Content width={width}>{children}</Content>
    </Container>
  );
};

export default Layout;
