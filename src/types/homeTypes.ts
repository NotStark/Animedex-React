
export type HomeType = {
    results: Results;
}

export type Results = {
    anilistTrending: AnilistTrending[];
    gogoPopular: GogoPopular[];
}

export type AnilistTrending = {
    averageScore: number;
    bannerImage: null | string;
    coverImage: CoverImage;
    description: string;
    episodes: number | null;
    format: Format;
    genres: string[];
    id: number;
    meanScore: number;
    season: Season;
    seasonYear: number;
    status: Status;
    title: Title;
}

export type CoverImage = {
    color: null | string;
    extraLarge: string;
    large: string;
    medium: string;
}

export enum Format {
    Tv = "TV",
}

export enum Season {
    Fall = "FALL",
    Winter = "WINTER",
}

export enum Status {
    Releasing = "RELEASING",
}

export type Title = {
    english: string;
    native: string;
    romaji: string;
    userPreferred: string;
}

export type GogoPopular = {
    id: string;
    image: string;
    link: string;
    releaseDate: string;
    title: string;
}
