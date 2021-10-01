import { useMutation } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import DELETE_COMMENT_MUTATION from "../apollo/gql/mutations/deleteComment";
import {
  deleteComment,
  deleteCommentVariables,
} from "../apollo/__type__/deleteComment";
import { seeFeed_seeFeed_comments } from "../apollo/__type__/seeFeed";
import { SLink } from "../assets/styled-componet/SLink";

interface IComment {
  data: seeFeed_seeFeed_comments;
  postId: number;
}

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1px;
  justify-content: space-between;
`;

const Username = styled.span`
  font-weight: 500;
  font-size: 11px;
`;

const Comment = styled.span`
  font-size: 10px;
  margin-left: 6px;
`;

const DeleteBtn = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: ${(props) => props.theme.color.skyblue};
  margin-right: 5px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const CommentComponent: React.FC<IComment> = ({ data, postId }) => {
  const [deleteCommentFun, { loading }] = useMutation<
    deleteComment,
    deleteCommentVariables
  >(DELETE_COMMENT_MUTATION, {
    variables: {
      input: {
        commentId: data.id,
      },
    },
    update: (cache, result) => {
      const { data: cacheData } = result;
      if (cacheData && cacheData.deleteComment.ok) {
        cache.evict({ id: `CommentType:${data.id}` });
        cache.modify({
          id: `PostType:${postId}`,
          fields: {
            commentCount(pre) {
              return pre - 1;
            },
          },
        });
      }
    },
  });

  const onDeleteComment = () => {
    if (!loading) {
      deleteCommentFun();
    }
  };

  return (
    <CommentContainer>
      <div>
        <SLink to={`/profile/${data.user.username}`}>
          <Username>{data.user.username}</Username>
        </SLink>
        <Comment>{data.comment}</Comment>
      </div>
      {data.user.isMe && (
        <DeleteBtn onClick={onDeleteComment}>Delete</DeleteBtn>
      )}
    </CommentContainer>
  );
};

export default CommentComponent;
