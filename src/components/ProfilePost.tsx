import React, { useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import styled from "styled-components";
import { seeProfile_seeProfile_user_posts } from "../apollo/__type__/seeProfile";

interface IProfilePost {
  post: seeProfile_seeProfile_user_posts;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const File = styled.img`
  width: 100%;
  height: 293px;
  object-fit: cover;
  &:hover {
    cursor: pointer;
    filter: brightness(80%);
  }
`;

const CountContainer = styled.div<{ displayCount: boolean }>`
  display: ${(props) => (props.displayCount ? "flex" : "none")};
  justify-content: space-evenly;
  position: absolute;
  color: ${(props) => props.theme.color.white};
  top: 50%;
  width: 100%;
`;

const ConutIconContainer = styled.div`
  display: flex;
  max-width: 100%;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 20px;
`;

const ConutSpan = styled.span`
  margin-left: 10px;
`;

const ProfilePost: React.FC<IProfilePost> = ({ post }) => {
  const [displayCount, setDisplayCount] = useState<boolean>(false);
  return (
    <Container>
      <File
        src={post.file}
        onMouseOver={() => setDisplayCount(true)}
        onMouseLeave={() => setDisplayCount(false)}
      />
      <CountContainer displayCount={displayCount}>
        <ConutIconContainer>
          <BsHeartFill /> <ConutSpan>{post.likeCount}</ConutSpan>
        </ConutIconContainer>
        <ConutIconContainer>
          <FaComment />
          <ConutSpan>{post.commentCount}</ConutSpan>
        </ConutIconContainer>
      </CountContainer>
    </Container>
  );
};

export default ProfilePost;
