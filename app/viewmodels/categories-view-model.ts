import { Frame, Observable } from '@nativescript/core';
import { categories, ServiceCategory } from '../models/service.model';
import { AuthService } from '../services/auth.service';

export class CategoriesViewModel extends Observable {
    private _categories: ServiceCategory[];
    private _searchQuery: string = '';
    private _userPhotoUrl: string = '';
    private authService: AuthService;

    constructor() {
        super();
        this._categories = categories;
        this.authService = AuthService.getInstance();
        this.initializeUser();
    }

    private initializeUser() {
        const currentUser = this.authService.currentUser;
        if (currentUser?.photoURL) {
            this._userPhotoUrl = currentUser.photoURL;
            this.notifyPropertyChange('userPhotoUrl', this._userPhotoUrl);
        }
    }

    get userPhotoUrl(): string {
        return this._userPhotoUrl;
    }

    get categories(): ServiceCategory[] {
        return this._categories;
    }

    get searchQuery(): string {
        return this._searchQuery;
    }

    set searchQuery(value: string) {
        if (this._searchQuery !== value) {
            this._searchQuery = value;
            this.notifyPropertyChange('searchQuery', value);
            this.filterCategories();
        }
    }

    onSearch() {
        this.filterCategories();
    }

    onClearSearch() {
        this.searchQuery = '';
    }

    private filterCategories() {
        if (!this._searchQuery) {
            this._categories = categories;
        } else {
            const query = this._searchQuery.toLowerCase();
            this._categories = categories.filter(category => 
                category.name.toLowerCase().includes(query) ||
                category.description.toLowerCase().includes(query)
            );
        }
        this.notifyPropertyChange('categories', this._categories);
    }

    onCategorySelect(args: any) {
        const index = args.index;
        const category = this._categories[index];
        Frame.topmost().navigate({
            moduleName: 'views/services-page',
            context: { category }
        });
    }

    onProfile() {
        Frame.topmost().navigate({
            moduleName: 'views/profile/profile-page',
            transition: {
                name: 'slideLeft'
            }
        });
    }
}