import { gql } from "@apollo/client";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($input: DeleteCommentInput!) {
    deleteComment(input: $input) {
      ok
      error
    }
  }
`;

export default DELETE_COMMENT_MUTATION;
