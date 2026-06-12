import { db } from "@/services/firebase";
import { collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";

import type { Media } from "@/types/Media";

export class ServiceMedia {
    async getAll(): Promise<Media[]> {
        const data = await getDocs(collection(db, "media"));

        return data.docs.map((doc) => doc.data() as Media);
    }

    async getById(): Promise<Media | null> {
        return null;
    }

    async create(data: Media) {
        console.log(data);

        const media: Omit<Media, "createdAt" | "updatedAt"> = {
            id: "",
            title: "",
            description: "",
            type: "Movie",
            genres: [],
        };

        await setDoc(doc(db, "media"), {
            ...media,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        return media;
    }
}

export var serviceMedia = new ServiceMedia();
