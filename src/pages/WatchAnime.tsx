import { useParams, Link } from "react-router-dom";
import { QueryFunction, useQuery } from "@tanstack/react-query";
import type { EpisodeType, AnimeType } from "../types";
import fetchDataFromApi from "../utils/api";
import Hls from "hls.js";
import Plyr from "plyr";
import { useEffect } from "react";
import "plyr/dist/plyr.css";
import Image from "../components/Image";
import Button from "../components/Button";
import { FiAlertCircle } from "react-icons/fi";

declare global {
  interface Window {
    hls?: Hls;
  }
}

export default function WatchAnime() {
  const { animeId, episodeId } = useParams<{
    animeId: string;
    episodeId: string;
  }>();

  const episodeQueryFn: QueryFunction<EpisodeType> = async () => {
    const response = await fetchDataFromApi(`/episode/${episodeId}`);
    return response;
  };
  const { data: episodeData, isLoading: episodeLoading } = useQuery({
    queryKey: ["watch", episodeId],
    queryFn: episodeQueryFn,
  });

  const animeQueryFn: QueryFunction<AnimeType> = async () => {
    const response = await fetchDataFromApi(`/anime/${animeId}`);
    return response;
  };
  const { data: animeData, isLoading: animeLoading } = useQuery({
    queryKey: ["anime", animeId],
    queryFn: animeQueryFn,
  });

  useEffect(() => {
    if (!episodeData) return;

    const source = episodeData?.results?.stream?.sources[0]?.file;

    if (!source) return;

    const videoElement = document.getElementById("player") as HTMLVideoElement;

    const defaultOptions: Plyr.Options = {
      keyboard: {
        focused: true,
        global: true,
      },
      controls: [
        "play-large",
        "play",
        "volume",
        "progress",
        "duration",
        "settings",
        "fullscreen",
      ],
      settings: ["quality", "speed"],
      tooltips: {
        controls: true,
        seek: true,
      },
      displayDuration: true,
      fullscreen: {
        enabled: true,
        fallback: true,
        iosNative: true,
      },
    };

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(source);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        const availableQualities = hls.levels.map((level) => level.height);
        defaultOptions.quality = {
          default: availableQualities[0],
          options: availableQualities,
          forced: true,
          onChange: (quality: number) => updateQuality(quality),
        };
        new Plyr(videoElement, defaultOptions);
      });
      hls.attachMedia(videoElement);
      window.hls = hls;
    } else {
      new Plyr(videoElement, defaultOptions);
    }

    function updateQuality(newQuality: number) {
      if (window.hls) {
        window.hls.levels.forEach((level, levelIndex) => {
          if (level.height === newQuality) {
            window.hls!.currentLevel = levelIndex;
          }
        });
      }
    }

    // Clean up function
    return () => {
      if (window.hls) {
        window.hls.destroy();
      }
    };
  }, [episodeId, episodeData]);

  if (episodeLoading || animeLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="lg:px-6 py-4">
      <div className="flex items-center justify-center gap-6 lg:gap-5 flex-col lg:flex-row">
        <div className="border-2 p-2 rounded-md lg:self-start">
          <div className="search flex items-center gap-3 text-sm">
            <h4 className="text-wrap line-clamp-2 ">
              {animeData?.results.name}
            </h4>
            <input
              type="text"
              placeholder="Search"
              name="Search Bar"
              id="search-bar"
              className="bg-textColor/15 px-2 w-2/3  py-1 rounded-sm outline-none"
            />
          </div>
          <div className="p-2 grid grid-cols-4 gap-3  mt-2 max-h-64 overflow-y-scroll ">
            {animeData?.results?.episodes?.map((episodeInfo) => (
              <Link
                to={`/watch/${animeId}/${episodeInfo[1]}`}
                className={`text-center py-1 rounded-sm  ${
                  episodeInfo[1] === episodeId
                    ? "bg-primary"
                    : "bg-textColor/10"
                }`}
                key={episodeInfo[1]}
              >
                {episodeInfo[0]}
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-4/5 h-full">
          <video id="player" className="aspect-video w-full h-full" />
          <div></div>
        </div>

        <div className="flex items-center justify-center flex-col text-center">
          <div className=" h-[260px]  rounded-sm ">
            <Image src={animeData?.results.image!} className="rounded-sm" />
          </div>
          <h4 className="text-sm font-semibold text-wrap line-clamp-2 mt-1 ">
            {episodeData?.results.name}
          </h4>
          <p className="text-sm font-thin opacity-60 text-wrap line-clamp-2 ">
            {animeData?.results.name}
          </p>
          <div className="flex items-center flex-wrap gap-3 mt-2">
            {[
              animeData?.results.type.split(" ")[0],
              animeData?.results.released,
              animeData?.results.status,
            ].map((val, index) => (
              <span
                className="bg-primary text-sm  font-medium px-2 rounded-md"
                key={index}
              >
                {val}
              </span>
            ))}
          </div>
          <Link to={`/anime/${animeId}`} className="mt-3">
            <Button className="flex items-center justify-center gap-1 border-white text-white before:bg-white hover:shadow-white hover:text-zinc-900 text-[.5rem] sm:text-sm">
              <FiAlertCircle />
              Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
