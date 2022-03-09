import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ sort }) => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: { ...transformSort(sort) },
  });
  return { data, loading, error };
};

const transformSort = (sort) => {
  switch (sort) {
    case "Highest rated repositories":
      return {
        orderBy: "RATING_AVERAGE",
      };
    case "Lowest rated repositories":
      return {
        orderBy: "RATING_AVERAGE",
        orderDirection: "ASC",
      };
    default:
      return null;
  }
};

export default useRepositories;
