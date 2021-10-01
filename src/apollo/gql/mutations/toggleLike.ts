import { gql } from "@apollo/client";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($input: ToggleLikeInput!) {
    toggleLike(input: $input) {
      ok
      error
    }
  }
`;

export default TOGGLE_LIKE_MUTATION;
