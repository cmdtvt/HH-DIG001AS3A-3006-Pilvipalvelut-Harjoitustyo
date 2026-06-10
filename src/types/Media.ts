export interface Media {
    id: string;

    title: string;
    description: string;
    type: "Movie" | "TV";
    genres: string[];

    episodeCount?: number;

    posterImageId?: string; //Instance of image type

    createdAt: Date;
    updatedAt: Date;
}
