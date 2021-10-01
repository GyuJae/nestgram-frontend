import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import styled from "styled-components";

interface IAvatar {
  src?: string | null;
  lg?: boolean;
}

const AvatarContainer = styled.div<{ lg: boolean }>`
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.lg ? "30px" : "25px")};
  height: ${(props) => (props.lg ? "30px" : "25px")};
`;

const SAvatar = styled.img`
  max-width: 100%;
`;

const Avatar: React.FC<IAvatar> = ({ src, lg = false }) => {
  return (
    <AvatarContainer lg={lg}>
      {src ? <SAvatar src={src} /> : <AiOutlineUser />}
    </AvatarContainer>
  );
};

export default Avatar;
