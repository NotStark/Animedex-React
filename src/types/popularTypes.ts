export type PopularType = {
    results: Result[];
}

export type Result = {
    id: string;
    image: string;
    img?: string;
    link: string;
    releaseDate: string;
    episode? : string;
    title: string;
}


