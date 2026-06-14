import type { Timestamp } from "firebase/firestore";

export interface Media {
    id: string;

    title: string;
    description: string;
    type: "Movie" | "TV";
    genres: string[];
    episodeCount?: number;

    posterImage?: string;

    createdAt: Timestamp;
    updatedAt: Timestamp;
}
