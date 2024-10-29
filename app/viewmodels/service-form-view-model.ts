import { Frame, Observable } from '@nativescript/core';
import { Service } from '../models/service.model';
import { alert } from '@nativescript/core/ui/dialogs';

export class ServiceFormViewModel extends Observable {
    private _service: Service;
    private _currentStep: number = 1;
    private _description: string = '';
    private _preferredDate: Date = new Date();
    private _preferredTime: Date = new Date();
    private _name: string = '';
    private _phone: string = '';
    private _email: string = '';
    private _address: string = '';

    constructor(service: Service) {
        super();
        this._service = service;
    }

    get currentStep(): number {
        return this._currentStep;
    }

    set currentStep(value: number) {
        if (this._currentStep !== value) {
            this._currentStep = value;
            this.notifyPropertyChange('currentStep', value);
        }
    }

    // ... (rest of the getters and setters remain the same)

    onNextStep() {
        if (this.validateCurrentStep()) {
            this.currentStep++;
        }
    }

    onPreviousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
        }
    }

    private validateCurrentStep(): boolean {
        switch (this.currentStep) {
            case 1:
                if (!this._description) {
                    alert({
                        title: "Missing Information",
                        message: "Please describe your project needs",
                        okButtonText: "OK"
                    });
                    return false;
                }
                break;
            case 2:
                if (!this._preferredDate || !this._preferredTime) {
                    alert({
                        title: "Missing Information",
                        message: "Please select your preferred date and time",
                        okButtonText: "OK"
                    });
                    return false;
                }
                break;
        }
        return true;
    }

    async onSubmit() {
        if (!this._name || !this._phone || !this._email || !this._address) {
            alert({
                title: "Missing Information",
                message: "Please fill in all contact information",
                okButtonText: "OK"
            });
            return;
        }

        const formData = {
            service: this._service,
            description: this._description,
            preferredDate: this._preferredDate,
            preferredTime: this._preferredTime,
            name: this._name,
            phone: this._phone,
            email: this._email,
            address: this._address
        };

        console.log('Booking submitted:', formData);

        await alert({
            title: "Booking Confirmed!",
            message: "Your service has been scheduled. We'll send you a confirmation email shortly.",
            okButtonText: "OK"
        });

        Frame.topmost().navigate({
            moduleName: "views/categories-page",
            clearHistory: true
        });
    }

    onBack() {
        Frame.topmost().goBack();
    }
}