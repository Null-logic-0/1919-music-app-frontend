import { SongInterface } from "./Song.interface";

export interface ArtistInterface {
    name: string,
    photo: any,
    count: any,
    musics:SongInterface[]
}