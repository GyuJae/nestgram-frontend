import { useMutation, gql } from "@apollo/client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import CREATE_COMMENT_MUTATION from "../apollo/gql/mutations/creatComment";
import {
  createComment,
  createCommentVariables,
} from "../apollo/__type__/createComment";
import useUser from "../hooks/useUser";
import Loading from "./Loading";

type IFormCreateComment = {
  comment: string;
};

interface ICreateComment {
  postId: number;
}

const Container = styled.div`
  margin-top: 5px;
`;

const Form = styled.form``;

const Input = styled.input`
  outline: none;
  border: none;
  margin-left: 8px;
  width: 95%;
  padding: 5px 2px;
  border-top: 1px solid ${(props) => props.theme.color.lineGray};
`;

const CreateComment: React.FC<ICreateComment> = ({ postId }) => {
  const currentUser = useUser();

  const { register, handleSubmit, getValues, setValue } =
    useForm<IFormCreateComment>();

  const [createCommentFun, { loading }] = useMutation<
    createComment,
    createCommentVariables
  >(CREATE_COMMENT_MUTATION, {
    update: (cache, { data }) => {
      if (data && data.createComment.ok && currentUser?.id) {
        const { comment } = getValues();
        const newComment = cache.writeFragment({
          data: {
            __typename: "Comment",
            id: data.createComment.id,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            comment,
            user: currentUser,
          },
          fragment: gql`
            fragment BSName on CommentType {
              id
              createdAt
              updatedAt
              comment
              user {
                username
                avatar
              }
            }
          `,
        });
        cache.modify({
          id: `PostType:${postId}`,
          fields: {
            comments(pre) {
              return [...pre, newComment];
            },
            commentCount(pre) {
              return pre + 1;
            },
          },
        });
      }
    },
  });

  const onSubmit: SubmitHandler<IFormCreateComment> = ({ comment }) => {
    if (!loading) {
      setValue("comment", "");
      createCommentFun({
        variables: {
          input: {
            comment,
            postId,
          },
        },
      });
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {loading ? (
          <Loading />
        ) : (
          <Input
            {...register("comment", { required: true })}
            placeholder="Write a comment..."
          />
        )}
      </Form>
    </Container>
  );
};

export default CreateComment;
