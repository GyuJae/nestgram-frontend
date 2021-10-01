import { useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo/apollo";
import WHOAMI_QUERY from "../apollo/gql/query/me";
import { whoAmI, whoAmI_whoAmI } from "../apollo/__type__/whoAmI";

const useUser = (): whoAmI_whoAmI | null => {
  const loginStatus = useReactiveVar(isLoggedInVar);
  const { data } = useQuery<whoAmI>(WHOAMI_QUERY, {
    skip: !loginStatus,
  });
  if (data) {
    return data.whoAmI;
  }
  return null;
};

export default useUser;
