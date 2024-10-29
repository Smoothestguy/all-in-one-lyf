import { EventData, Page } from '@nativescript/core';
import { ProfileViewModel } from '../../viewmodels/profile/profile-view-model';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    if (!page.bindingContext) {
        page.bindingContext = new ProfileViewModel();
    }
}