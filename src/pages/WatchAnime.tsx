import { useParams, Link } from "react-router-dom";
import { useQuery, QueryFunction } from "@tanstack/react-query";
import fetchDataFromApi from "../utils/api";
import type { EpisodeType, AnimeType } from "../types";
import Hls from "hls.js";
import Plyr from "plyr";
import { useEffect, useState } from "react"; // Added useState
import "plyr/dist/plyr.css";
import Image from "../components/Image";
import Button from "../components/Button";
import { HiServerStack } from "react-icons/hi2";

declare global {
  interface Window {
    hls?: Hls;
  }
}
/*
TODOS - layout , skeleton , choose server , download ....
*/

export default function WatchAnime() {
  const { animeId, episodeId } = useParams<{
    animeId: string;
    episodeId: string;
  }>();

  const episodeQueryFn: QueryFunction<EpisodeType> = async () =>
    await fetchDataFromApi(`/episode/${episodeId}`);
  const { data: episodeData, isLoading: episodeLoading } = useQuery({
    queryKey: ["watch", episodeId],
    queryFn: episodeQueryFn,
  });

  const animeQueryFn: QueryFunction<AnimeType> = async () =>
    await fetchDataFromApi(`/anime/${animeId}`);
  const { data: animeData } = useQuery({
    queryKey: ["anime", animeId],
    queryFn: animeQueryFn,
  });

  useEffect(() => {
    if (!episodeData || !animeData) return;

    const source = episodeData?.results?.stream?.sources[0]?.file;
    if (!source) return;

    const video = document.getElementById("player") as HTMLVideoElement;


    const defaultOptions: Plyr.Options = {
      keyboard: {
        focused: true,
        global: true,
      },
      controls: [
        "play-large",
        "play",
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
        const availableQualities = hls.levels.map((l) => l.height);
        defaultOptions.quality = {
          default: availableQualities[0],
          options: availableQualities,
          forced: true,
          onChange: (e: number) => updateQuality(e),
        };
        new Plyr(video, defaultOptions);
      });
      hls.attachMedia(video);
      window.hls = hls;
    } else {
      new Plyr(video, defaultOptions);
    }

    function updateQuality(newQuality: number) {
      window.hls!.levels.forEach((level, levelIndex) => {
        if (level.height === newQuality) {
          window.hls!.currentLevel = levelIndex;
        }
      });
    }

    // Clean up function
    return () => {
      if (window.hls) {
        window.hls.destroy();
      }
    };
  }, [episodeData, animeData, episodeId]);

  if (episodeLoading || !episodeData || !animeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-container py-4">
      <div className="episode-container flex items-center justify-center">
        <div className="video-container">
          <video id="player" className="aspect-video w-full h-full"></video>
        </div>
        <div className="episode-details ">
          <div className="episodes border-2 p-2 rounded-md">
            <div className="search flex items-center gap-3 text-sm">
              <h4 className="text-wrap line-clamp-2 ">
                {animeData.results.name}
              </h4>
              <input
                type="text"
                placeholder="Search"
                name="Search Bar"
                id="search-bar"
                className="bg-textColor/15 px-2 w-2/3  py-1 rounded-sm outline-none"
              />
            </div>
            <div className="show-eps grid grid-cols-4 gap-3 mt-2 max-h-64  ">
              {animeData?.results?.episodes?.map((episode) => (
                <Link
                  to={`/watch/${animeId}/${episode[1]}`}
                  className={`text-center py-1 rounded-sm  ${
                    episode[1] === episodeId ? "bg-primary" : "bg-textColor/10"
                  }`}
                  key={episode[1]}
                >
                  {episode[0]}
                </Link>
              ))}
            </div>
          </div>
          <div className="servers-container">
            <div className="servers">
                <div className="flex items-center gap-2 border-[1px] text-textColor w-fit">
                  <HiServerStack/> Servers
                </div>
                <div>
                  {episodeData?.results?.stream.map((server) => (
                    <div
                      className="flex items-center gap-2 border-[1px] text-textColor w-fit"
                      key={server}
                    >
                      {server}
                    </div>
                  ))}
                </div>
            </div>
            <div className="download"></div>
          </div>
        </div>
      </div>
      <div className="anime-info"></div>
    </div>
  );
}

// <div className="px-2 sm:px-12 py-4 grid place-content-center">
// //   <div className="flex items-center justify-center flex-col sm:flex-row gap-5 ">
// //     <div className="sm:w-4/5">
// //       <video
// //         playsInline
// //         id="player"
// //         className="aspect-video h-full object-cover object-center "
// //       ></video>
// //     </div>
// //     <div className="border-2 p-2 sm:p-4 rounded-sm  text-white mx-4 my-2 md:m-0 w-full  sm:w-1/3">
// //       <div className="flex items-center flex-col lg:flex-row gap-3">
// //         <h4 className="text-sm tracking-wide text-wrap line-clamp-2">
// //           {animeData.results.name}
// //         </h4>
// //         <input
// //           type="text"
// //           placeholder="Search"
// //           name="Search Bar"
// //           id="search-bar"
// //           className="bg-white/15 px-3 py-1 rounded-sm outline-none"
// //         />
// //       </div>
// //       <div className="p-2 mt-4 grid grid-cols-4 gap-3 max-h-64 overflow-y-scroll ">
// //         {animeData.results.episodes.map((episode) => (
// //           <Link
// //             to={`/watch/${animeId}/${episode[1]}`}
// //             className={`text-center py-1 rounded-sm ${
// //               episode[1] === episodeId ? "bg-primary" : "bg-textColor/10"
// //             }`}
// //             key={episode[1]}
// //           >
// //             {episode[0]}
// //           </Link>
// //         ))}
// //       </div>
// //     </div>
// //   </div>
// //   <div className="flex items-center border-[1px] border-textColor  mt-5 rounded-md p-1 gap-3">
// //     <div className="w-[100px] h-[150px] rounded-sm ">
// //       <Image src={animeData.results.image!} className="rounded-sm" />
// //     </div>
// //     <div className="px-3 py-1 w-1/2">
// //       <h4 className="text-sm font-semibold">{episodeData.results.name}</h4>
// //       <p className="line-clamp-2 opacity-50 text-sm">
// //         {animeData.results.plot_summary}
// //       </p>
// //       <p className="text-[.7rem] opacity-50 border-[1px] border-textColor  w-fit rounded-md px-3 py-1 mt-2">
// //         Episodes: {animeData.results.episodes.length}
// //       </p>
// //     </div>
// //   </div>
// // </div>
