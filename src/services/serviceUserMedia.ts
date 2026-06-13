import { db } from "@/services/firebase";
import { collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";

// import type { Media } from "@/types/Media";
import type { UserMedia } from "@/types/UserMedia";

// This services usage is bit different to otherones so im not gonna make seperate create / update functions
// Document creation / update is just handled by the save function. This reduces the handling code in later components
export class ServiceUserMedia {
    async getAll(): Promise<UserMedia[]> {
        const data = await getDocs(collection(db, "userMedia"));
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
