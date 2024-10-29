import { Frame, Observable } from '@nativescript/core';
import { Service, ServiceCategory } from '../models/service.model';

export class ServicesViewModel extends Observable {
    private _selectedCategory: ServiceCategory;
    private _filteredServices: Service[];
    private _searchQuery: string = '';

    constructor(category: ServiceCategory) {
        super();
        this._selectedCategory = category;
        this._filteredServices = category.services;
        this.notifyPropertyChange('selectedCategory', category);
        this.notifyPropertyChange('filteredServices', this._filteredServices);
    }

    get selectedCategory(): ServiceCategory {
        return this._selectedCategory;
    }

    get filteredServices(): Service[] {
        return this._filteredServices;
    }

    get searchQuery(): string {
        return this._searchQuery;
    }

    set searchQuery(value: string) {
        if (this._searchQuery !== value) {
            this._searchQuery = value;
            this.notifyPropertyChange('searchQuery', value);
            this.filterServices();
        }
    }

    onSearch() {
        this.filterServices();
    }

    onClearSearch() {
        this.searchQuery = '';
    }

    private filterServices() {
        if (!this._searchQuery) {
            this._filteredServices = this._selectedCategory.services;
        } else {
            const query = this._searchQuery.toLowerCase();
            this._filteredServices = this._selectedCategory.services.filter(service => 
                service.name.toLowerCase().includes(query) ||
                service.description.toLowerCase().includes(query)
            );
        }
        this.notifyPropertyChange('filteredServices', this._filteredServices);
    }

    onServiceSelect(args: any) {
        try {
            if (!args || typeof args.index !== 'number') {
                console.error('Invalid tap event arguments');
                return;
            }

            const service = this._filteredServices[args.index];
            if (!service) {
                console.error('Service not found at index:', args.index);
                return;
            }

            const topmost = Frame.topmost();
            if (!topmost) {
                console.error('No topmost frame found');
                return;
            }

            topmost.navigate({
                moduleName: 'views/booking/booking-page',
                context: { 
                    service,
                    category: this._selectedCategory
                },
                transition: {
                    name: 'slide'
                }
            });
        } catch (error) {
            console.error('Navigation error:', error);
        }
    }

    onBack() {
        const topmost = Frame.topmost();
        if (topmost) {
            topmost.goBack();
        }
    }
}