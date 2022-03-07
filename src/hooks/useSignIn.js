import { useApolloClient, useMutation } from "@apollo/client";
import { USER_LOGIN } from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const [loginUser, result] = useMutation(USER_LOGIN);
  const authStorage = useAuthStorage();

  const signIn = async ({ username, password }) => {
    await authStorage.removeAccessToken();
    const { data } = await loginUser({ variables: { username, password } });
    authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
    return data;
  };

  return [signIn, result];
};

export default useSignIn;
