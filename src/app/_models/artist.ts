export class Artist {
  id?: number;
  name: string;
  description: string;
  genres: Array<string>;
  albums: Array<string>; // TODO Array<Album>
  images: Array<string>;
};
