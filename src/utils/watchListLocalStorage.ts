import type { WatchlistType } from "../types";

const getList = (): WatchlistType[] => {
    const watchList = localStorage.getItem("watchList");
    return watchList ? JSON.parse(watchList) : [];
}

const addInList = (anime: WatchlistType): void => {
    const watchList: WatchlistType[] = getList();
    watchList.push(anime);
    localStorage.setItem("watchList", JSON.stringify(watchList));
}

const removeFromList = (animeId: string): void => {
    const watchList: WatchlistType[] = getList();
    const updatedList = watchList.filter((anime) => anime.id !== animeId);
    localStorage.setItem("watchList", JSON.stringify(updatedList));
}

const checkInList = (animeId: string): boolean => {
    const watchList: WatchlistType[] = getList();
    return watchList.some(anime => anime.id === animeId);
}


export {removeFromList , addInList , getList , checkInList};
