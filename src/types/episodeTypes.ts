export type EpisodeType =  {
    results: Results;
   }
   
   export type Results = {
    episodes: string;
    name:     string;
    servers:  Servers;
    stream:   Stream;
   }
   
   export type Servers = {
    doodstream: string;
    filelions:  string;
    streamwish: string;
    vidcdn:     string;
   }
   
   export type Stream = {
    Referer:    string;
    sources:    Source[];
    sources_bk: Source[];
   }
   
   export type Source = {
    file:  string;
    label: string;
    type:  string;
   }
   