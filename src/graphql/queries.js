import { gql } from "@apollo/client";
import { REPOSITORY_DATA } from "./fragment";

export const GET_REPOSITORIES = gql`
  ${REPOSITORY_DATA}
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
  ) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
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

export const GET_REPOSITORY = gql`
  ${REPOSITORY_DATA}
  query Repository($id: ID!) {
    repository(id: $id) {
      ...RepositoryData
    }
  }
`;

// Últimos:
// {
//   "orderBy": "CREATED_AT"
// }

// Mejores votados:
// {
//   "orderBy": "RATING_AVERAGE"
// }

//  Peores votados:
// {
//   "orderBy": "RATING_AVERAGE",
//   "orderDirection": "ASC"
// }
