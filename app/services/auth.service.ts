import { Observable } from '@nativescript/core';
import { User } from '../models/user.model';

export class AuthService extends Observable {
    private static instance: AuthService;
    private _currentUser: User | null = null;
    private _isAuthenticated: boolean = false;

    private constructor() {
        super();
    }

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    get currentUser(): User | null {
        return this._currentUser;
    }

    get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    async setCurrentUser(user: User): Promise<void> {
        this._currentUser = user;
        this._isAuthenticated = true;
        this.notifyPropertyChange('currentUser', this._currentUser);
        this.notifyPropertyChange('isAuthenticated', true);
    }

    async signOut(): Promise<void> {
        this._currentUser = null;
        this._isAuthenticated = false;
        this.notifyPropertyChange('currentUser', null);
        this.notifyPropertyChange('isAuthenticated', false);
    }

    async updateUserProfile(updates: Partial<User>): Promise<void> {
        if (!this._currentUser) return;

        this._currentUser = {
            ...this._currentUser,
            ...updates
        };
        this.notifyPropertyChange('currentUser', this._currentUser);
    }

    async changePassword(currentPassword: string, newPassword: string): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (currentPassword === 'wrong') {
                    reject(new Error('Current password is incorrect'));
                } else {
                    resolve();
                }
            }, 1000);
        });
    }
}