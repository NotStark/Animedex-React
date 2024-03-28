import { HtmlHTMLAttributes } from "react";
import type { PopularType, RecentType, SearchType , WatchlistType } from "../types";
import Image from "./Image";

type AnimeItem =
  | RecentType["results"][0]
  | PopularType["results"][0]
  | SearchType["results"][0]
  | WatchlistType;

type CardProps = HtmlHTMLAttributes<HTMLDivElement> & {
  anime: AnimeItem;
  className?: string;
};

function getDetails(animeData: AnimeItem) {
  const subOrDub = animeData.title.toLowerCase().includes("dub")
    ? "DUB"
    : "SUB";
  const releaseOrEpisode = animeData?.releaseDate || animeData?.episode || ""; // Add fallback value for releaseOrEpisode
  const image = animeData.image || animeData.img || ""; // Add fallback value for image
  const title = animeData.title || ""; // Add fallback value for title
  return { subOrDub, releaseOrEpisode, image, title }; // Return the properties
}

// w-[140px
// sm:w-[190px]

export default function Card({ anime, className, ...props }: CardProps) {
  const { subOrDub, releaseOrEpisode, image, title } = getDetails(anime);
  return (
    <div
      {...props}
      className={`group relative  max-w-full h-full  cursor-pointer rounded-sm text-white hover:-translate-y-2 transition-all duration-200 ${
        className && className
      }`}
    >
      <Image
        src={image}
        alt={title}
        className="rounded-sm w-full h-full object-cover object-center"
      />

      <div className="absolute w-full h-full flex flex-col justify-between top-0 left-0 p-3">
        <span className="bg-primary w-fit px-3 py-1 rounded-md text-sm tracking-wide ">
          {subOrDub}
        </span>
        <span className=" self-end tracking-wide backdrop-blur-md border-[1px] border-white border-opacity-65 px-3 py-1 rounded-md  text-[.7rem] text-nowrap sm:text-sm">
          {releaseOrEpisode}
        </span>
      </div>

      <h4 className="line-clamp-1 text-center text-textColor text-sm group-hover:opacity-80 transition-opacity duration-200 ">
        {title}
      </h4>
    </div>
  );
}
