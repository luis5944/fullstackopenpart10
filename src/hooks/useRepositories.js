import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ sort, search, first }) => {
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: { ...transformSort(sort), searchKeyword: search, first },
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        variables: { ...transformSort(sort), searchKeyword: search, first },
      },
    });
  };

  return { data, loading, fetchMore: handleFetchMore };
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
