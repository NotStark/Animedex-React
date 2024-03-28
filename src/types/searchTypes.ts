export type SearchType = {
    results: Result[];
}

export type Result = {
    id: string;
    img: string;
    image?: string;
    link: string;
    releaseDate: string;
    episode? : string;
    title: string;
}
