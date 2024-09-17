import { photoInterface } from "./photo.interface";

export interface favouriteInterface {
    id:number;
    name:string;
    authorName:string;
    photo:photoInterface;
    audio:any;

}