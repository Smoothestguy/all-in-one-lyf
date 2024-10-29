import { EventData, Page } from '@nativescript/core';
import { QRCodeViewModel } from '../viewmodels/qr-code-view-model';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new QRCodeViewModel();
}