/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeFeed
// ====================================================

export interface seeFeed_seeFeed_user {
  __typename: "UserType";
  username: string;
  avatar: string | null;
}

export interface seeFeed_seeFeed_comments_user {
  __typename: "UserType";
  username: string;
  avatar: string | null;
  isMe: boolean;
}

export interface seeFeed_seeFeed_comments {
  __typename: "CommentType";
  id: number;
  user: seeFeed_seeFeed_comments_user;
  comment: string;
  createdAt: any;
}

export interface seeFeed_seeFeed {
  __typename: "PostType";
  id: number;
  user: seeFeed_seeFeed_user;
  likeCount: number;
  commentCount: number;
  file: string;
  caption: string;
  isMine: boolean;
  createdAt: any;
  isLike: boolean;
  comments: seeFeed_seeFeed_comments[];
}

export interface seeFeed {
  seeFeed: seeFeed_seeFeed[];
}
