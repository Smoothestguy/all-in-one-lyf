export interface User {
    id: string;
    email: string;
    displayName: string;
    photoURL?: string;
    phoneNumber?: string;
    address?: string;
    preferences?: UserPreferences;
}

export interface UserPreferences {
    notifications: boolean;
    newsletter: boolean;
    darkMode: boolean;
}