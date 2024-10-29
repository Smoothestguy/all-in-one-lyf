import { EventData, Page } from '@nativescript/core';
import { BookingViewModel } from '../../viewmodels/booking/booking-view-model';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    const service = page.navigationContext.service;
    page.bindingContext = new BookingViewModel(service);
}