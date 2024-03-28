import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Mousewheel, Pagination, Autoplay } from "swiper/modules";
import SliderSkeleton from "../components/skeletons/SliderSkeleton";
import { useRef } from "react";
import {
  QueryFunction,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import type { HomeType, RecentType, PopularType } from "../types";
import fetchDataFromApi from "../utils/api";
import { FaRegPlayCircle } from "react-icons/fa";
import { LuCalendarRange } from "react-icons/lu";
import { IoEllipseSharp } from "react-icons/io5";
import { FaCirclePlay } from "react-icons/fa6";
import { FiAlertCircle } from "react-icons/fi";

import Grid from "../components/Grid";
import { MdOutlineNavigateNext , MdOutlineNavigateBefore } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import parse from "html-react-parser";

enum PaginationType {
  Recent = "recent",
  Popular = "popular",
}

export default function Home() {
  const gridRef = useRef<HTMLDivElement>(null);

  const [searchParams, setSearchParams] = useSearchParams({
    type: "recent",
    page: "1",
  });
  let currentPage = Number(searchParams.get("page") || "1");
  let currentType = searchParams.get("type") || "recent";

  const getPaginationData = () => {
    switch (currentType) {
      case PaginationType.Recent:
        let queryFn: QueryFunction<RecentType> = async () =>
          await fetchDataFromApi(`/recent/${currentPage}`);
        return useQuery({
          queryKey: ["recent", currentPage],
          queryFn,
          placeholderData: keepPreviousData,
        });
      case PaginationType.Popular:
        let queryFnPopular: QueryFunction<PopularType> = async () =>
          await fetchDataFromApi(`/gogoPopular/${currentPage}`);
        return useQuery({
          queryKey: ["popular", currentPage],
          queryFn: queryFnPopular,
          placeholderData: keepPreviousData,
        });
      default:
        throw new Error("Invalid pagination type");
    }
  };

  const handleClick = (dir: string) => {
    if (dir === "prev" && currentPage > 1) {
      setSearchParams({ type: currentType,  page: (currentPage - 1).toString()  });
    } else {
      setSearchParams({ type: currentType, page: (currentPage + 1).toString() });
    }

    window.scrollTo({ top: Number(gridRef.current?.offsetTop) - 65 , behavior: "smooth" });
  };

  const changeType = (type: string) => {
    setSearchParams((prev) => {
      prev.set("type", type);
      prev.set("page", "1");
      return prev;
    });
    window.scrollTo({ top: Number(gridRef.current?.offsetTop) - 65 , behavior: "smooth" });
  };



  const {data , isLoading , error , isError } = getPaginationData()

  return (
    <>
      <Slider />
      <div className="py-6" ref={gridRef}>
        <div className=" px-14 flex items-center justify-center text-sm gap-4 font-semibold">
          <h3
            className={`cursor-pointer px-2 py-1 ${
              currentType === "recent" && "border-b-2  border-b-primary"
            }`}
            onClick={() => changeType("recent")}
          >
            Recent
          </h3>
          <h3
            className={`px-2 py-1 cursor-pointer ${
              currentType === "popular" && "border-b-2  border-b-primary"
            }`}
            onClick={() => changeType("popular")}
          >
            Popular
          </h3>
        </div>
        <Grid animes={data?.results} loading={isLoading}  error={error}/>
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            onClick={() => handleClick("prev")}
            isDisabled={currentPage === 1 || isLoading || isError}
          >
            <MdOutlineNavigateBefore className="text-xl"/>
          </Button>
          <Button
            
            onClick={() => handleClick("next")}
            isDisabled={isLoading || isError}
          >
            <MdOutlineNavigateNext className="text-xl"/>
          </Button>
        </div>
      </div>
    </>
  );
}

function Slider() {
  const progressCircleRef = useRef<SVGSVGElement>(null);
  const progressContentRef = useRef<HTMLSpanElement>(null);
  const queryFn: QueryFunction<HomeType> = async () =>
    await fetchDataFromApi(`/home`);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["home"],
    queryFn,
  });

  const onAutoplayTimeLeft = (_: any, time: number, progress: number) => {
    const progressCircle = progressCircleRef.current;
    const progressContent = progressContentRef.current;
    if (progressCircle && progressContent) {
      progressCircle.style.setProperty("--progress", `${1 - progress}`);
      progressContent.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  if (isLoading) {
    return <SliderSkeleton />;
  }

  if (isError || !data || !data?.results) {
    return <SliderSkeleton error={error || "Failed to fetch"} />;
  }

  return (
    <Swiper
      slidesPerView={1}
      centeredSlides={true}
      loop={true}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination, Mousewheel]}
      onAutoplayTimeLeft={onAutoplayTimeLeft}
      className="w-full h-[40vh] sm:h-[60dvh] "
      mousewheel={true}
      draggable={true}
    >
      {data?.results.anilistTrending.map((anime) => (
        <SwiperSlide
          key={anime.id}
          className="bg-cover bg-center w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url("${
              anime.bannerImage || anime.coverImage.extraLarge
            }")`,
          }}
        >
          <div className=" w-full h-full px-6 sm:px-12 md:px-24  font-semibold flex items-center text-white ">
            <div>
              <h2 className="text-sm sm:text-xl md:text-4xl text-primary font-bold uppercase line-clamp-2">
                {anime?.title?.userPreferred ||
                  anime?.title?.english ||
                  anime?.title?.native ||
                  anime?.title?.romaji}
              </h2>
              <div className="flex items-center gap-4 my-2 text-[.65rem] sm:text-sm">
                <h5 className="flex gap-1 items-center">
                  <FaRegPlayCircle className="text-primary" /> {anime.format}
                </h5>
                <h5 className="flex gap-1 items-center">
                  <LuCalendarRange className="text-primary" /> {anime.status}
                </h5>
                <h5 className="flex gap-1 items-center text-nowrap">
                  <IoEllipseSharp className="text-primary" /> EPISODES{" "}
                  {anime.episodes || "N/A"}
                </h5>
              </div>
              <p className="line-clamp-3 w-full sm:w-[60%]  border-l-2 pl-3 text-[.65rem] sm:text-sm">
                {parse(anime.description || "No Description")}
              </p>
              <div className="flex gap-4 mt-3  sm:mt-6">
                <Link
                  to={`/anime/${encodeURIComponent(
                    anime?.title?.userPreferred ||
                      anime?.title?.english ||
                      anime?.title?.native ||
                      anime?.title?.romaji ||
                      "Not Found"
                  )}`}
                >
                  <Button className="flex items-center gap-1  text-nowrap text-[.5rem]  sm:text-sm">
                    <FaCirclePlay />
                    Watch Now
                  </Button>
                </Link>
                <Link
                  to={`/anime/${encodeURIComponent(
                    anime?.title?.userPreferred ||
                      anime?.title?.english ||
                      anime?.title?.native ||
                      anime?.title?.romaji ||
                      "Not Found"
                  )}`}
                >
                  <Button className="flex items-center justify-center gap-1 border-white text-white before:bg-white hover:shadow-white hover:text-zinc-900 text-[.5rem] sm:text-sm">
                    <FiAlertCircle />
                    Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}

      <div className="autoplay-progress" slot="container-end">
        <svg viewBox="0 0 48 48" ref={progressCircleRef}>
          <circle cx="24" cy="24" r="20"></circle>
        </svg>
        <span ref={progressContentRef}></span>
      </div>
    </Swiper>
  );
}
