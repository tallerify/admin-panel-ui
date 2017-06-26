import {Artist} from "./artist";

export class Track {
  id?: number;
  popularity?: number;
  name: string;
  artists?: Array<Artist>;
  album: any; // TODO Album;
  albumId?: number;
  externalId?: number;
};
