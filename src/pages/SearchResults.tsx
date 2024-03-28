import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Grid from "../components/Grid";
import type { SearchType } from "./../types";
import fetchDataFromApi from "../utils/api";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function SearchResult() {
  const { query } = useParams<{ query: string }>();

  const fetchData = async ({ pageParam }: { pageParam: number }) => {
    return await fetchDataFromApi(`/search/${query}?page=${pageParam}`);
  };

  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["searchResults", query],
    queryFn: fetchData,
    initialPageParam: 1,
    getNextPageParam: (
      lastPage: SearchType,
      _: SearchType[],
      lastPageParam: number
    ) => {
      if (lastPage !== undefined) return lastPageParam + 1;
    },
  });

  const allData = data?.pages?.map((page) => page?.results).flat();

  return (
    <>
      <h2 className="text-center mt-3 text-xl font-semibold">
        Search Results For <i className="text-primary">{query}</i>
      </h2>
      <Grid animes={allData} loading={isLoading} />
      <div className="w-full flex items-center justify-center my-8">
        <Button
          isDisabled={!hasNextPage || isFetchingNextPage || isError}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage
            ? "Loading..."
            : isError
            ? "No More Dara to Load"
            : hasNextPage
            ? "Load More"
            : "No More Dara to Load"}
        </Button>
      </div>
    </>
  );
}
