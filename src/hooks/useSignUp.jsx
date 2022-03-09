import { useApolloClient, useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const useSignUp = () => {
  const apolloClient = useApolloClient();
  const [createUser, result] = useMutation(CREATE_USER);

  const userCreated = async ({ username, password }) => {
    const { data } = await createUser({
      variables: {
        user: {
          username,
          password,
        },
      },
    });
    apolloClient.resetStore();

    return data;
  };

  return [userCreated, result];
};

export default useSignUp;
