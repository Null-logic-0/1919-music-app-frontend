import { SongInterface } from "./Song.interface";

export interface ArtistInterface {
    title: string,
    image: string,
    subtitle: string,
    musics:SongInterface[]
}