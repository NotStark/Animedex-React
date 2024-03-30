import { useParams, Link } from "react-router-dom";
import Image from "../components/Image";
import { useQuery, QueryFunction } from "@tanstack/react-query";
import fetchDataFromApi from "../utils/api";
import type { AnimeType } from "../types";
import Button from "../components/Button";
import { FaCirclePlay } from "react-icons/fa6";
import Grid from "../components/Grid";
import { IoMdAddCircle, IoIosRemoveCircle } from "react-icons/io";
import {
  checkInList,
  addInList,
  removeFromList,
} from "../utils/watchListLocalStorage";
import { useState } from "react";
import AnimeDetailsSkeleton from "../components/skeletons/AnimeDetailsSkeleton";

export default function AnimeDetails() {
  const { animeId } = useParams<{ animeId: string }>();
  const [isInList, setIsInList] = useState(checkInList(animeId!));

  const queryFn: QueryFunction<AnimeType> = async () =>
    await fetchDataFromApi(`/anime/${animeId}`);
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["anime", animeId],
    queryFn,
  });

  const reQuery = animeId?.includes("-")
    ? animeId
    : animeId?.replaceAll(" ", "+");

  const reQueryFn: QueryFunction<any> = async () =>
    await fetchDataFromApi(`/recommendations/${reQuery}`);

  const {
    data: reData,
    isLoading: reLoading,
    error: reError,
  } = useQuery({
    queryKey: ["recommendations", reQuery],
    queryFn: reQueryFn,
  });

  // console.log(reData);
  const reManipulatedData = reData?.results?.map((item: any) => ({
    title:
      item.title.userPreferred ||
      item.title.romaji ||
      item.title.english ||
      item.title.native,
    id:
      item.title.userPreferred ||
      item.title.romaji ||
      item.title.english ||
      item.title.native,
    image: item.coverImage.large,
    episode: `Episodes ${item.episodes}`,
  }));

  const addWatchlist = () => {
    const dataToAdd = {
      id: animeId!,
      title: data?.results.name!,
      image: data?.results.image!,
      releaseDate: data?.results.released!,
    };
    isInList ? removeFromList(animeId!) : addInList(dataToAdd);
    setIsInList((prev) => !prev);
  };

  return (
    <>
      {isLoading || isError ? (
        <AnimeDetailsSkeleton error={error} />
      ) : (
        <div className="px-3 sm:px-6 md:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-center flex-col sm:flex-row gap-4 sm:gap-20">
            <div className=" h-[260px] md:h-[300px] rounded-sm ">
              <Image src={data?.results.image!} className="rounded-sm" />
            </div>
            <div className="text-center sm:text-left sm:w-1/3">
              <h4 className="text-[.85rem] sm:text-lg">{data?.results.name}</h4>
              <i className="text-sm opacity-50 my-4 text-[.5rem] sm:text-sm">
                {data?.results.name}
              </i>
              <div className="flex items-center gap-4 my-3 justify-center md:justify-start md:w-fit">
                {[
                  "HD",
                  "EP " + data?.results.episodes.length,
                  data?.results.type,
                ].map((item, index) => (
                  <span className="bg-primary text-sm px-1 rounded-sm opacity-90 text-nowrap" key={index}>
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 my-2 mt-4 mb-3  justify-center md:gap-4 md:justify-start md:w-fit">
                {data?.results.genre
                  .split(",")
                  .slice(0, 3)
                  .map((genre, index) => (
                    <span className="border-2 px-4 py-1 rounded-full text-[.7rem] cursor-pointer" key={index}>
                      {genre}
                    </span>
                  ))}
              </div>
              <p className="first-letter:text-2xl first-letter:text-primary first-letter:font-semibold font-light  max-h-28 overflow-y-auto hover:bg-textColor/20 transition-all duration-300  ">
                {data?.results.plot_summary}
              </p>
              <div className="mt-6 flex justify-center items-center gap-2 flex-col lg:gap-4 lg:flex-row sm:justify-start text-sm">
                <Link to={`/watch/${encodeURIComponent(animeId || "N/A")}/${
                  data?.results.episodes[0][1]
                }`}>
                  <Button className="text-sm flex items-center gap-1 text-nowrap ">
                    <FaCirclePlay />
                    Watch Now
                  </Button>
                </Link>

                <Button
                  className=" text-sm flex items-center gap-1 text-nowrap border-textColor text-textColor before:bg-textColor hover:shadow-white hover:text-backgroundColor "
                  onClick={addWatchlist}
                  isDisabled={
                    !data?.results.name ||
                    !data.results.image ||
                    !data.results.id ||
                    !data.results.released
                  }
                >
                  {!isInList ? (
                    <>
                      <IoMdAddCircle />
                      Add in list
                    </>
                  ) : (
                    <>
                      <IoIosRemoveCircle />
                      Remove from list
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="my-8">
        <div className="flex justify-center ">
          <h3 className="text-xl text-center font-semibold border-b-2 border-b-primary w-fit">
            Similar Animes
          </h3>
        </div>
        <Grid animes={reManipulatedData} loading={reLoading} error={reError} />
      </div>
    </>
  );
}
