import { gql } from "@apollo/client";

// u: kalle p: password
export const USER_LOGIN = gql`
  mutation loginUser($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;
