/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BSName
// ====================================================

export interface BSName_user {
  __typename: "UserType";
  username: string;
  avatar: string | null;
}

export interface BSName {
  __typename: "CommentType";
  id: number;
  createdAt: any;
  updatedAt: any;
  comment: string;
  user: BSName_user;
}
