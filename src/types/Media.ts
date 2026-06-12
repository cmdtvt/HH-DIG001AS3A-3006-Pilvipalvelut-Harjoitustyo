import type { Timestamp } from "firebase/firestore";

export interface Media {

    //TODO: Handling the 
    // id: string;

    title: string;
    description: string;
    type: "Movie" | "TV";
    genres: string[];
    episodeCount?: number;

    // FIXME: Was good idea but the scope of project in mind not gonna implement
    // This shall be changed to direct url refrence to a image file anywhere
    posterImageId?: string; //Instance of image type

    createdAt: Timestamp;
    updatedAt: Timestamp;
}
