import { EventData, Page } from '@nativescript/core';
import { ServicesViewModel } from '../viewmodels/services-view-model';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    const category = page.navigationContext.category;
    page.bindingContext = new ServicesViewModel(category);
}