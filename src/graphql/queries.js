import { gql } from "@apollo/client";
import { REPOSITORY_DATA } from "./fragment";

export const GET_REPOSITORIES = gql`
  ${REPOSITORY_DATA}
  query {
    repositories {
      edges {
        node {
          ...RepositoryData
        }
      }
    }
  }
`;

export const GET_USER_LOGIN = gql`
  {
    me {
      id
      username
    }
  }
`;
