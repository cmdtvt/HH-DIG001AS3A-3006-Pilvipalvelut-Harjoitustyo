export interface User {
    id: string;
    username: string;
    email: string;
    role: "User" | "Admin";
    profileId: string;
    createdAt?: Date;
    updatedAt?: Date;
}
