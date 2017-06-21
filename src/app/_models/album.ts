export class Album {
    id?: number;
    name: string;
    release_date: string;
    genres: Array<string>;
    artists: Array<string>;
    picture: File;
};