import { EventData, Page } from '@nativescript/core';
import { CategoriesViewModel } from '../viewmodels/categories-view-model';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new CategoriesViewModel();
}