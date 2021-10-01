import React from "react";
import { BsHeart } from "react-icons/bs";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useUser from "../hooks/useUser";
import Avatar from "./Avatar";
import InstaLogo from "./InstaLogo";

const HeaderContainer = styled.header`
  height: 50px;
  border-bottom: 1px solid ${(props) => props.theme.color.lineGray};
  background-color: ${(props) => props.theme.color.white};
  width: 100%;
`;

const HeaderContent = styled.div`
  top: 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
`;

const SearchInput = styled.input`
  all: unset;
  background-color: ${(props) => props.theme.color.background};
  border: 1px solid ${(props) => props.theme.color.lineGray};
`;

const IconContainer = styled.div`
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &:not(:last-child) {
    margin-right: 20px;
  }
`;

const SLink = styled(Link)`
  all: unset;
  cursor: pointer;
`;

const Header = () => {
  const user = useUser();
  return (
    <HeaderContainer>
      <HeaderContent>
        <SLink to="/">
          <InstaLogo fontSize="25px" />
        </SLink>
        <SearchInput />
        <IconContainer>
          <Icon>
            <BsHeart />
          </Icon>
          <SLink to={`/profile/${user?.username}`}>
            <Avatar src={user ? user?.avatar : null} />
          </SLink>
        </IconContainer>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
