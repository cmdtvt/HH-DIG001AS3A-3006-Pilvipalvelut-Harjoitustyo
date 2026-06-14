import { db } from "@/services/firebase";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    where,
} from "firebase/firestore";

// import type { Media } from "@/types/Media";
import type { UserMedia } from "@/types/UserMedia";

// This services usage is bit different to otherones so im not gonna make seperate create / update functions
// Document creation / update is just handled by the save function. This reduces the handling code in later components
export class ServiceUserMedia {
    async getAll(): Promise<UserMedia[]> {
        const data = await getDocs(collection(db, "userMedia"));
        return data.docs.map((doc) => doc.data() as UserMedia);
    }

    async getById(userId: string, mediaId: string): Promise<UserMedia | null> {
        const documentId = `${userId}_${mediaId}`;

        const data = await getDoc(doc(db, "userMedia", documentId));

        if (!data.exists()) {
            return null;
        }

        return data.data() as UserMedia;
    }

    // Possible gum fix for loading userProfiles
    async getByUserId(userId: string): Promise<UserMedia[]> {
        //https://firebase.google.com/docs/firestore/query-data/queries
        const q = query(collection(db, "userMedia"), where("userId", "==", userId));

        const data = await getDocs(q);
        return data.docs.map((doc) => doc.data() as UserMedia);
    }

    // Passing merge true makes the document only update the passed fileds
    async save(data: Omit<UserMedia, "updatedAt">) {
        // This might be bad idea but documents should be easily findable
        const documentId = `${data.userId}_${data.mediaId}`;
        await setDoc(
            doc(db, "userMedia", documentId),
            {
                ...data,
                updatedAt: serverTimestamp(),
            },
            { merge: true },
        );
        return documentId;
    }
}

export var serviceUserMedia = new ServiceUserMedia();
