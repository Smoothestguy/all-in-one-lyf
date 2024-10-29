import { Observable } from '@nativescript/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Frame } from '@nativescript/core';
import { alert, confirm, prompt } from '@nativescript/core/ui/dialogs';
import { ImageSource } from '@nativescript/core/image-source';
import { ImageAsset } from '@nativescript/core/image-asset';
import * as imagepicker from "@nativescript/imagepicker";

export class ProfileViewModel extends Observable {
    private _user: User | null;
    private _selectedTabIndex: number = 0;
    private _bookings: any[] = [];
    private _isEditing: boolean = false;
    private _tempUserData: Partial<User> = {};
    private authService: AuthService;

    constructor() {
        super();
        this.authService = AuthService.getInstance();
        this._user = this.authService.currentUser;
        this._tempUserData = { ...this._user };
        this.loadBookings();
    }

    get user(): User | null {
        return this._user;
    }

    get isEditing(): boolean {
        return this._isEditing;
    }

    get selectedTabIndex(): number {
        return this._selectedTabIndex;
    }

    set selectedTabIndex(value: number) {
        if (this._selectedTabIndex !== value) {
            this._selectedTabIndex = value;
            this.notifyPropertyChange('selectedTabIndex', value);
        }
    }

    get bookings(): any[] {
        return this._bookings;
    }

    onStartEditing() {
        this._isEditing = true;
        this._tempUserData = { ...this._user };
        this.notifyPropertyChange('isEditing', true);
    }

    onCancelEditing() {
        this._isEditing = false;
        this._user = { ...this._tempUserData as User };
        this.notifyPropertyChange('isEditing', false);
        this.notifyPropertyChange('user', this._user);
    }

    async onSaveProfile() {
        try {
            if (!this._user?.displayName?.trim()) {
                await alert({
                    title: "Error",
                    message: "Display name cannot be empty",
                    okButtonText: "OK"
                });
                return;
            }

            await this.authService.updateUserProfile({
                displayName: this._user.displayName,
                phoneNumber: this._user.phoneNumber,
                address: this._user.address,
                photoURL: this._user.photoURL
            });

            this._isEditing = false;
            this._tempUserData = { ...this._user };
            this.notifyPropertyChange('isEditing', false);

            await alert({
                title: "Success",
                message: "Profile updated successfully",
                okButtonText: "OK"
            });
        } catch (error) {
            await alert({
                title: "Error",
                message: "Failed to update profile",
                okButtonText: "OK"
            });
        }
    }

    async onChangePhoto() {
        try {
            const context = imagepicker.create({
                mode: "single"
            });

            const selection = await context.present();
            if (selection.length > 0) {
                const selected = selection[0];
                const imageSource = await ImageSource.fromAsset(selected);
                
                if (this._user) {
                    this._user.photoURL = imageSource.toBase64String('png');
                    this.notifyPropertyChange('user', this._user);
                }
            }
        } catch (error) {
            console.error('Error changing photo:', error);
            await alert({
                title: "Error",
                message: "Failed to change photo. Please try again.",
                okButtonText: "OK"
            });
        }
    }

    private loadBookings() {
        // Mock bookings data
        this._bookings = [
            {
                id: '1',
                service: { 
                    name: 'Electrical Installation',
                    price: 150
                },
                date: '2024-03-15',
                time: '10:00 AM',
                status: 'Scheduled',
                address: '123 Main St',
                notes: 'Main circuit installation'
            },
            {
                id: '2',
                service: { 
                    name: 'Plumbing Repair',
                    price: 200
                },
                date: '2024-03-20',
                time: '2:30 PM',
                status: 'Completed',
                address: '123 Main St',
                notes: 'Kitchen sink repair'
            }
        ];
        this.notifyPropertyChange('bookings', this._bookings);
    }

    async onChangePassword() {
        try {
            const currentPasswordResult = await prompt({
                title: "Change Password",
                message: "Enter current password",
                okButtonText: "Next",
                cancelButtonText: "Cancel",
                inputType: "password"
            });

            if (!currentPasswordResult.result) {
                return;
            }

            const newPasswordResult = await prompt({
                title: "Change Password",
                message: "Enter new password",
                okButtonText: "Change",
                cancelButtonText: "Cancel",
                inputType: "password"
            });

            if (!newPasswordResult.result) {
                return;
            }

            await this.authService.changePassword(
                currentPasswordResult.text || '',
                newPasswordResult.text || ''
            );

            await alert({
                title: "Success",
                message: "Password changed successfully",
                okButtonText: "OK"
            });
        } catch (error) {
            await alert({
                title: "Error",
                message: error.message || "Failed to change password",
                okButtonText: "OK"
            });
        }
    }

    async onSignOut() {
        try {
            const result = await confirm({
                title: "Sign Out",
                message: "Are you sure you want to sign out?",
                okButtonText: "Yes",
                cancelButtonText: "No"
            });

            if (result) {
                await this.authService.signOut();
                Frame.topmost().navigate({
                    moduleName: "views/auth-page",
                    clearHistory: true
                });
            }
        } catch (error) {
            console.error('Error signing out:', error);
            await alert({
                title: "Error",
                message: "Failed to sign out. Please try again.",
                okButtonText: "OK"
            });
        }
    }

    onToggleNotifications(args: any) {
        if (this._user?.preferences) {
            this._user.preferences.notifications = args.object.checked;
            this.notifyPropertyChange('user', this._user);
        }
    }

    onToggleNewsletter(args: any) {
        if (this._user?.preferences) {
            this._user.preferences.newsletter = args.object.checked;
            this.notifyPropertyChange('user', this._user);
        }
    }

    onToggleDarkMode(args: any) {
        if (this._user?.preferences) {
            this._user.preferences.darkMode = args.object.checked;
            this.notifyPropertyChange('user', this._user);
        }
    }

    onBack() {
        if (this._isEditing) {
            this.onCancelEditing();
        }
        Frame.topmost().goBack();
    }
}