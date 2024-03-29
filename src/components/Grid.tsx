import Card from "./Card";
import CardSkeleton from "./skeletons/CardSkeleton";
import React from "react";
import type {
  PopularType,
  RecentType,
  SearchType,
  WatchlistType,
} from "../types";
import { Link } from "react-router-dom";

type GridType = {
  animes:
    | RecentType["results"]
    | PopularType["results"]
    | SearchType["results"]
    | WatchlistType[]
    | undefined;
  loading?: boolean;
  error?: Error | string | null;
};

function GridWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative grid p-4  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  sm:py-5 sm:px-12 gap-x-4 gap-y-12 ">
      {children}
    </div>
  );
}

export default function Grid({ animes, loading, error }: GridType) {
  if (loading || !animes || error) {
    return (
      <GridWrap>
        {Array.from({ length: 20 }).map(() => (
          <CardSkeleton error={error} />
        ))}
      </GridWrap>
    );
  }

  if (!animes || animes.length === 0) {
    return (
      <div className="w-full mt-5 text-3xl font-semibold  h-[50dvh] border-[1px] border-white border-opacity-50 flex justify-center items-center bg-gray-500/40">
        No data To Show
      </div>
    );
  }

  // console.log(animes);

  return (
    <GridWrap>
      {animes?.map((anime) => {
        return (
          <Link to={`/anime/${anime.id.split("-episode-")[0]}`}>
            <Card key={anime.id} anime={anime} />
          </Link>
        );
      })}
    </GridWrap>
  );
}
