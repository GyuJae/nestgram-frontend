import { gql } from "@apollo/client";

const SEE_FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      likeCount
      commentCount
      file
      caption
      isMine
      createdAt
      isLike
      comments {
        id
        user {
          username
          avatar
          isMe
        }
        comment
        createdAt
      }
    }
  }
`;

export default SEE_FEED_QUERY;
