export interface UserProfile {
    id: string;
    userId: string;

    displayName: string;
    bio?: string;
    avatarImageId?: string;
    favoriteGenres: string[];

    isProfilePublic: boolean;

    createdAt: Date;
    updatedAt: Date;
}
