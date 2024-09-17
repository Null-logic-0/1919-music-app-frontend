import { SongInterface } from "./Song.interface";

export interface ArtistInterface {
    biography: string;
    lastName: string;
    name: string,
    photo: any,
    count: any,
    musics:SongInterface[];
    authorName:string;
    firstName?:string;
    title?:string;
}