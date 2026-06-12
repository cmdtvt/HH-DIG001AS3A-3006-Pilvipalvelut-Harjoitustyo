import { auth, db } from "@/services/firebase";
import type { RegisterUser, User } from "@/types/User";
import type { UserProfile } from "@/types/UserProfile";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    serverTimestamp,
    setDoc,
    Timestamp,
} from "firebase/firestore";

export class ServiceUser {
    async getAll(): Promise<User[]> {
        const data = await getDocs(collection(db, "users"));

        return data.docs.map((doc) => doc.data() as User);
    }

    async getById(): Promise<User | null> {
        return null;
    }

    async getByEmail(): Promise<User | null> {
        return null;
    }

    async register(data: RegisterUser) {
        console.log("ServiceUser has recieved a register request");
        console.log(data);

        // Creates new firebase account and it seems to auto login the user also.
        const credential = await createUserWithEmailAndPassword(auth, data.email, data.password);

        const firebaseUser = credential.user;

        // We will store other userinfo into a document and shove it to firbase
        // Linking to the auth is done by using fireBaseUser.uid for the User id
        const user = {
            id: firebaseUser.uid,
            profileId: firebaseUser.uid,
            username: data.username,
            email: data.email,
            role: "User" as const,
        };

        await setDoc(doc(db, "users", firebaseUser.uid), {
            ...user,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        // UserProfile creation
        const profile: Omit<UserProfile, "createdAt" | "updatedAt"> = {
            id: firebaseUser.uid,
            userId: firebaseUser.uid,
            displayName: data.username,
            bio: "",
            avatarImageId: "",
            favoriteGenres: [],
            isProfilePublic: true,
        };

        await setDoc(doc(db, "userProfiles", firebaseUser.uid), {
            ...profile,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        return user;
    }

    async update() {
        return null;
    }

    async delete() {
        return null;
    }

    /*I dont really like this structure. Also handling the user's profile stuff here feels wrong*/

    async getProfile(uid: string): Promise<UserProfile | null> {
        const data = await getDoc(doc(db, "userProfiles", uid));

        //TODO: Add better error returns here
        if (!data.exists()) {
            return null;
        }

        return data.data() as UserProfile;
    }

    async updateProfile(data:Omit<UserProfile, 'createdAt' | 'updatedAt'>): Promise<UserProfile | null> {
        return null;
    }
}

export var serviceUser = new ServiceUser();
