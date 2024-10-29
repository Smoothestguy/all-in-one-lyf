import { Observable, ImageSource, knownFolders, path } from '@nativescript/core';
import { Frame } from '@nativescript/core';
import * as qrcode from 'qrcode';

export class QRCodeViewModel extends Observable {
    private _qrText: string = 'Hello!';
    private _qrImageSource: ImageSource | null = null;

    constructor() {
        super();
        this.generateQRCode();
    }

    get qrText(): string {
        return this._qrText;
    }

    set qrText(value: string) {
        if (this._qrText !== value) {
            this._qrText = value;
            this.notifyPropertyChange('qrText', value);
        }
    }

    get qrImageSource(): ImageSource | null {
        return this._qrImageSource;
    }

    set qrImageSource(value: ImageSource | null) {
        if (this._qrImageSource !== value) {
            this._qrImageSource = value;
            this.notifyPropertyChange('qrImageSource', value);
        }
    }

    async generateQRCode() {
        try {
            const qrDataUrl = await qrcode.toDataURL(this._qrText, {
                width: 300,
                margin: 2
            });
            
            // Convert data URL to base64
            const base64Data = qrDataUrl.split(',')[1];
            const imageSource = ImageSource.fromBase64(base64Data);
            
            this.qrImageSource = imageSource;
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    }

    async saveQRCode() {
        if (!this._qrImageSource) return;

        try {
            const documentsFolder = knownFolders.documents();
            const filePath = path.join(documentsFolder.path, `qrcode-${Date.now()}.png`);
            const saved = await this._qrImageSource.saveToFile(filePath, "png");

            if (saved) {
                alert({
                    title: "Success",
                    message: "QR code saved successfully!",
                    okButtonText: "OK"
                });
            }
        } catch (error) {
            console.error('Error saving QR code:', error);
            alert({
                title: "Error",
                message: "Failed to save QR code",
                okButtonText: "OK"
            });
        }
    }

    onBack() {
        Frame.topmost().goBack();
    }
}