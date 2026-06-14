// Not sure if this is good idea or not but plannign on storing all iamges

import type { Timestamp } from "firebase/firestore";

// In this format so we can more easily load them in at fifferent parts of the system
export interface Image {
    id: string;

    url: string;
    thumbnailUrl?: string;

    alt: string;

    createdAt: Timestamp;
}
