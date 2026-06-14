import { db } from "@/services/firebase";
import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";

import type { Media } from "@/types/Media";

export class ServiceMedia {
    async getAll(): Promise<Media[]> {
        const data = await getDocs(collection(db, "media"));

        // I think this is way better. I need to id from firebase but by injecting it in at get phace
        // We dont need to manage the storing seperaly or in two places
        return data.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Media[];
    }

    async getById(id: string): Promise<Media | null> {
        const data = await getDoc(doc(db, "media", id));

        if (!data.exists()) {
            return null;
        }

        return {
            id: data.id,
            ...data.data(),
        } as Media;
    }

    // Omit the not wanted fields in this allready so seeing the fields needed later
    // In development is easier.
    // TODO: Should consider implementing this everywhere.
    async create(data: Omit<Media, "createdAt" | "updatedAt">) {
        const mediaData = doc(collection(db, "media"));

        await setDoc(mediaData, {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        return mediaData.id;
    }
}

export var serviceMedia = new ServiceMedia();
