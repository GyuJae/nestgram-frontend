/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SeeProfileInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: seeProfile
// ====================================================

export interface seeProfile_seeProfile_user_posts {
  __typename: "PostType";
  id: number;
  file: string;
  likeCount: number;
  commentCount: number;
}

export interface seeProfile_seeProfile_user {
  __typename: "UserType";
  id: number;
  username: string;
  firstName: string;
  lastName: string | null;
  isMe: boolean;
  isFollowing: boolean;
  totalFollowing: number;
  totalFollower: number;
  avatar: string | null;
  bio: string | null;
  posts: seeProfile_seeProfile_user_posts[] | null;
}

export interface seeProfile_seeProfile {
  __typename: "SeeProfileOutput";
  ok: boolean;
  error: string | null;
  user: seeProfile_seeProfile_user | null;
}

export interface seeProfile {
  seeProfile: seeProfile_seeProfile;
}

export interface seeProfileVariables {
  input: SeeProfileInput;
}
