export class Artist {
  id?: number;
  name: string;
  description: string;
  albums: Array<string>; // TODO Array<Album>
  images: Array<string>;
};
