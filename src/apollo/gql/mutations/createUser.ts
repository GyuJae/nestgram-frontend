import { gql } from "@apollo/client";

const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      ok
      error
    }
  }
`;

export default CREATE_USER_MUTATION;
