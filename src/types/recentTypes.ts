
export type Result = {
    episode: string;
    id: string;
    image: string;
    img?: string;
    link: string;
    title: string;
    releaseDate? : string;
}

export  type RecentType = {
    results: Result[]
}

