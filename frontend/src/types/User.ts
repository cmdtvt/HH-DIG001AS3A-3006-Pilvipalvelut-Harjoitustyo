import type { Timestamp } from "firebase/firestore";

export interface User {
    id: string;
    username: string;
    email: string;
    role: "User" | "Admin";
    profileId: string;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

// I need this for also passing the user's passsword on accouunt creation
// We create a new type called RegisterUser that has been extended from User which has had id and profileId fields removed.
// https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
export interface RegisterUser extends Omit<User, "id" | "profileId"> {
    password: string;
}
