import { gql } from "@apollo/client";

const WHOAMI_QUERY = gql`
  query whoAmI {
    whoAmI {
      id
      username
      avatar
    }
  }
`;

export default WHOAMI_QUERY;
