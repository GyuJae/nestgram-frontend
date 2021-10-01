import React from "react";
import styled from "styled-components";
import { seeFeed_seeFeed } from "../apollo/__type__/seeFeed";
import Avatar from "./Avatar";
import {
  BsBookmark,
  BsChat,
  BsHeart,
  BsHeartFill,
  BsThreeDots,
} from "react-icons/bs";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { useMutation } from "@apollo/client";
import TOGGLE_LIKE_MUTATION from "../apollo/gql/mutations/toggleLike";
import { toggleLike, toggleLikeVariables } from "../apollo/__type__/toggleLike";
import Caption from "./Caption";
import CommentComponent from "./CommentComponent";
import CreateComment from "./CreateComment";
import { SLink } from "../assets/styled-componet/SLink";

interface IFeed {
  data: seeFeed_seeFeed;
}

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.color.lineGray};
  background-color: ${(props) => props.theme.color.white};
  margin-bottom: 20px;
  border-radius: 3px;
`;

const FeedHeader = styled.div`
  width: 100%;
  display: flex;
  padding: 8px 0px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.color.lineGray};
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`;

const Username = styled.div`
  margin-left: 8px;
  font-weight: 600;
`;

const DotsContainer = styled.div`
  margin-right: 8px;
`;

const FeedFileContainer = styled.div`
  width: 100%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FeedFile = styled.img`
  width: 100%;
  object-fit: none;
  max-height: 500px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 0px;
`;

const IconLeftContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 7px;
`;

const IconMiddleContainer = styled.div``;

const IconRightContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 7px;
`;

const Icon = styled.div`
  font-size: 20px;
  &:not(:last-child) {
    margin-right: 13px;
  }
  &:hover {
    cursor: pointer;
  }
`;

const HeartIcon = styled(Icon)<{ isLike: boolean }>`
  color: ${(props) => props.isLike && props.theme.color.red};
  transition: all 0.1s ease-in;
  &:hover {
    transform: scale(1.2);
  }
`;

const LikeContainer = styled.div``;
const LikeCount = styled.div`
  font-weight: 500;
  margin-left: 10px;
  font-size: 15px;
`;

const InformationContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 5px;
`;

const CaptionUsername = styled(Username)`
  font-size: 12px;
`;

const CommentContainer = styled.div`
  margin-left: 8px;
  margin-top: 5px;
`;

const CommentCount = styled.div`
  font-size: 10px;
  margin-bottom: 3px;
  color: ${(props) => props.theme.color.gray};
  font-weight: 600;
`;

const Feed: React.FC<IFeed> = ({ data }) => {
  const [toggleLikeFun] = useMutation<toggleLike, toggleLikeVariables>(
    TOGGLE_LIKE_MUTATION,
    {
      variables: {
        input: {
          postId: data.id,
        },
      },
      update: (cache, result) => {
        if (result.data?.toggleLike && result.data?.toggleLike.ok) {
          cache.modify({
            id: `PostType:${data.id}`,
            fields: {
              isLike(pre) {
                return !pre;
              },
              likeCount(pre) {
                return data.isLike ? pre - 1 : pre + 1;
              },
            },
          });
        }
      },
    }
  );

  return (
    <Container>
      <FeedHeader>
        <SLink to={`/profile/${data.user.username}`}>
          <AvatarContainer>
            <Avatar src={data.user.avatar} lg={true} />
            <Username>{data.user.username}</Username>
          </AvatarContainer>
        </SLink>
        <DotsContainer>{data.isMine && <BsThreeDots />}</DotsContainer>
      </FeedHeader>
      <FeedFileContainer>
        <FeedFile src={data.file} />
      </FeedFileContainer>
      <IconContainer>
        <IconLeftContainer>
          <HeartIcon onClick={() => toggleLikeFun()} isLike={data.isLike}>
            {data.isLike ? <BsHeartFill /> : <BsHeart />}
          </HeartIcon>
          <Icon>
            <BsChat />
          </Icon>
          <Icon>
            <IoPaperPlaneOutline />
          </Icon>
        </IconLeftContainer>
        <IconMiddleContainer></IconMiddleContainer>
        <IconRightContainer>
          <Icon>
            <BsBookmark />
          </Icon>
        </IconRightContainer>
      </IconContainer>
      <LikeContainer>
        <LikeCount>
          {data.likeCount <= 1
            ? `${data.likeCount} like`
            : `${data.likeCount} likes`}
        </LikeCount>
      </LikeContainer>
      <InformationContainer>
        <SLink to={`/profile/${data.user.username}`}>
          <CaptionUsername>{data.user.username}</CaptionUsername>
        </SLink>
        <Caption caption={data.caption} />
      </InformationContainer>
      <CommentContainer>
        <CommentCount>
          {data.commentCount === 1
            ? `${data.commentCount} comment`
            : `${data.commentCount} comments`}
        </CommentCount>
        {data.comments.map((comment) => (
          <CommentComponent key={comment.id} data={comment} postId={data.id} />
        ))}
      </CommentContainer>
      <CreateComment postId={data.id} />
    </Container>
  );
};

export default Feed;
