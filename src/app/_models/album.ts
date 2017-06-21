import { Artist } from "./artist";

export class Album {
    id?: number;
    name: string;
    release_date: string;
    genres: Array<string>;
    artists: Array<Artist>;
    artistsIds: string;
    tracks: any;
    picture: File;
};