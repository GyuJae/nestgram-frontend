/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateCommentInput {
  postId: number;
  comment: string;
}

export interface CreateUserInput {
  firstName: string;
  lastName?: string | null;
  email: string;
  username: string;
  password: string;
}

export interface DeleteCommentInput {
  commentId: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SeeProfileInput {
  username: string;
}

export interface ToggleLikeInput {
  postId: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
