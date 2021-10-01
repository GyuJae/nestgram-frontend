import { gql } from "@apollo/client";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      ok
      error
      id
    }
  }
`;

export default CREATE_COMMENT_MUTATION;
