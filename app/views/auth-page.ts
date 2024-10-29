import { EventData, Page } from '@nativescript/core';
import { AuthViewModel } from '../viewmodels/auth-view-model';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new AuthViewModel();
}