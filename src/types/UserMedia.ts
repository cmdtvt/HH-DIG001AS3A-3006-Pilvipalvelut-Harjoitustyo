import type { Timestamp } from "firebase/firestore";

// This is the users version of certain movie / show
export interface UserMedia {
    id: string;

    userId: string;
    mediaId: string;

    status: "Planning" | "Watching" | "Completed" | "Dropped";

    rating?: number;
    watchedEpisodes?: number;

    notes?: string;
    updatedAt: Timestamp;
}
