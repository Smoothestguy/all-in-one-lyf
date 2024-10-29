import { EventData, Page } from '@nativescript/core';
import { ServiceFormViewModel } from '../viewmodels/service-form-view-model';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    const service = page.navigationContext.service;
    page.bindingContext = new ServiceFormViewModel(service);
}