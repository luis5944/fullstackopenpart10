import { useApolloClient, useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useReview = () => {
  const apolloClient = useApolloClient();
  const [createReview, result] = useMutation(CREATE_REVIEW);

  const reviewCreated = async ({
    repositoryName,
    ownerName,
    rating,
    review,
  }) => {
    const { data } = await createReview({
      variables: {
        review: {
          repositoryName,
          ownerName,
          rating: Number(rating),
          text: review,
        },
      },
    });
    apolloClient.resetStore();

    return data;
  };

  return [reviewCreated, result];
};

export default useReview;
