import { Observable } from '@nativescript/core';
import { Frame } from '@nativescript/core';
import { alert } from '@nativescript/core/ui/dialogs';
import { AuthService } from '../services/auth.service';

export class AuthViewModel extends Observable {
    private _email: string = '';
    private _password: string = '';
    private _confirmPassword: string = '';
    private _isSignUp: boolean = false;
    private _isLoading: boolean = false;
    private _errorMessage: string = '';
    private authService: AuthService;

    constructor() {
        super();
        this.authService = AuthService.getInstance();
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        if (this._email !== value) {
            this._email = value;
            this.notifyPropertyChange('email', value);
            this.validateInput();
        }
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        if (this._password !== value) {
            this._password = value;
            this.notifyPropertyChange('password', value);
            this.validateInput();
        }
    }

    get confirmPassword(): string {
        return this._confirmPassword;
    }

    set confirmPassword(value: string) {
        if (this._confirmPassword !== value) {
            this._confirmPassword = value;
            this.notifyPropertyChange('confirmPassword', value);
            this.validateInput();
        }
    }

    get isSignUp(): boolean {
        return this._isSignUp;
    }

    set isSignUp(value: boolean) {
        if (this._isSignUp !== value) {
            this._isSignUp = value;
            this.notifyPropertyChange('isSignUp', value);
            // Clear passwords when switching modes
            this._password = '';
            this._confirmPassword = '';
            this.notifyPropertyChange('password', '');
            this.notifyPropertyChange('confirmPassword', '');
            this.errorMessage = '';
        }
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    set isLoading(value: boolean) {
        if (this._isLoading !== value) {
            this._isLoading = value;
            this.notifyPropertyChange('isLoading', value);
        }
    }

    get errorMessage(): string {
        return this._errorMessage;
    }

    set errorMessage(value: string) {
        if (this._errorMessage !== value) {
            this._errorMessage = value;
            this.notifyPropertyChange('errorMessage', value);
        }
    }

    toggleAuthMode() {
        this.isSignUp = !this.isSignUp;
    }

    private validateInput(): void {
        this.errorMessage = '';

        if (!this._email || !this._password) {
            this.errorMessage = 'Please fill in all required fields';
            return;
        }

        if (!this.isValidEmail(this._email)) {
            this.errorMessage = 'Please enter a valid email address';
            return;
        }

        if (this._password.length < 6) {
            this.errorMessage = 'Password must be at least 6 characters';
            return;
        }

        if (this._isSignUp) {
            if (!this._confirmPassword) {
                this.errorMessage = 'Please confirm your password';
                return;
            }
            
            if (this._password !== this._confirmPassword) {
                this.errorMessage = 'Passwords do not match';
                return;
            }
        }
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async onGoogleSignIn() {
        this.isLoading = true;
        this.errorMessage = '';

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const mockGoogleUser = {
                id: 'google123',
                email: 'user@gmail.com',
                displayName: 'Google User',
                photoURL: '~/images/default-avatar.png',
                preferences: {
                    notifications: true,
                    newsletter: false,
                    darkMode: false
                }
            };

            await this.authService.setCurrentUser(mockGoogleUser);

            Frame.topmost().navigate({
                moduleName: 'views/categories-page',
                clearHistory: true,
                transition: {
                    name: 'fade',
                    duration: 200
                }
            });
        } catch (error) {
            this.errorMessage = 'Failed to sign in with Google. Please try again.';
            console.error('Google sign-in error:', error);
        } finally {
            this.isLoading = false;
        }
    }

    async onFacebookSignIn() {
        this.isLoading = true;
        this.errorMessage = '';

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const mockFacebookUser = {
                id: 'fb123',
                email: 'user@facebook.com',
                displayName: 'Facebook User',
                photoURL: '~/images/default-avatar.png',
                preferences: {
                    notifications: true,
                    newsletter: false,
                    darkMode: false
                }
            };

            await this.authService.setCurrentUser(mockFacebookUser);

            Frame.topmost().navigate({
                moduleName: 'views/categories-page',
                clearHistory: true,
                transition: {
                    name: 'fade',
                    duration: 200
                }
            });
        } catch (error) {
            this.errorMessage = 'Failed to sign in with Facebook. Please try again.';
            console.error('Facebook sign-in error:', error);
        } finally {
            this.isLoading = false;
        }
    }

    async onSubmit() {
        this.validateInput();
        
        if (this.errorMessage) {
            return;
        }

        this.isLoading = true;

        try {
            const mockUser = {
                id: '1',
                email: this._email,
                displayName: this._email.split('@')[0],
                photoURL: '~/images/default-avatar.png',
                preferences: {
                    notifications: true,
                    newsletter: false,
                    darkMode: false
                }
            };

            await new Promise(resolve => setTimeout(resolve, 500));
            await this.authService.setCurrentUser(mockUser);

            Frame.topmost().navigate({
                moduleName: 'views/categories-page',
                clearHistory: true,
                transition: {
                    name: 'fade',
                    duration: 200
                }
            });
        } catch (error) {
            this.errorMessage = 'An error occurred. Please try again.';
            console.error('Auth error:', error);
        } finally {
            this.isLoading = false;
        }
    }
}