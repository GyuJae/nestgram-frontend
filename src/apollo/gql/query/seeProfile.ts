import { gql } from "@apollo/client";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($input: SeeProfileInput!) {
    seeProfile(input: $input) {
      ok
      error
      user {
        id
        username
        firstName
        lastName
        isMe
        isFollowing
        totalFollowing
        totalFollower
        avatar
        bio
        posts {
          id
          file
          likeCount
          commentCount
        }
      }
    }
  }
`;

export default SEE_PROFILE_QUERY;
