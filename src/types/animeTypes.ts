export type AnimeType = {
    results: Results;
}

export type Results = {
    episodes: Array<string[]>;
    genre: string;
    id: string;
    image: string;
    name: string;
    other_name: string;
    plot_summary: string;
    released: string;
    source: string;
    status: string;
    type: string;
}
