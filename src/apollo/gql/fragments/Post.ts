import { gql } from "@apollo/client";

const POST_FRAGMENT = gql`
  fragment PostFragment on PostType {
    id
    file
    likeCount
    commentCount
  }
`;

export default POST_FRAGMENT;
