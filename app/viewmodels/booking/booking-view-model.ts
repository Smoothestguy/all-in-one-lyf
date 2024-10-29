import { Observable } from '@nativescript/core';
import { Service } from '../../models/service.model';
import { BookingDetails, Quote, COMPLEXITY_MULTIPLIERS, URGENCY_FEES } from '../../models/booking.model';
import { alert } from '@nativescript/core/ui/dialogs';
import { Frame } from '@nativescript/core';

export class BookingViewModel extends Observable {
    private _service: Service;
    private _step: number = 1;
    private _requirements: string = '';
    private _area: number = 0;
    private _complexityIndex: number = 0;
    private _urgencyIndex: number = 0;
    private _selectedDate: Date = new Date();
    private _selectedTimeIndex: number = 0;
    private _quote: Quote | null = null;
    private _customerName: string = '';
    private _customerPhone: string = '';
    private _customerEmail: string = '';
    private _additionalNotes: string = '';
    private _errorMessage: string = '';
    private _availableTimeSlots: string[] = [];
    private _selectedTime: string = '';

    constructor(service: Service) {
        super();
        this._service = service;
        this.generateTimeSlots();
        this.notifyPropertyChange('service', service);
    }

    get service(): Service {
        return this._service;
    }

    get step(): number {
        return this._step;
    }

    set step(value: number) {
        if (this._step !== value) {
            this._step = value;
            this.notifyPropertyChange('step', value);
        }
    }

    get requirements(): string {
        return this._requirements;
    }

    set requirements(value: string) {
        if (this._requirements !== value) {
            this._requirements = value;
            this.notifyPropertyChange('requirements', value);
        }
    }

    get area(): number {
        return this._area;
    }

    set area(value: number) {
        if (this._area !== value) {
            this._area = value;
            this.notifyPropertyChange('area', value);
            if (this._step === 3) {
                this.updateQuote();
            }
        }
    }

    get complexityIndex(): number {
        return this._complexityIndex;
    }

    set complexityIndex(value: number) {
        if (this._complexityIndex !== value) {
            this._complexityIndex = value;
            this.notifyPropertyChange('complexityIndex', value);
            if (this._step === 3) {
                this.updateQuote();
            }
        }
    }

    get urgencyIndex(): number {
        return this._urgencyIndex;
    }

    set urgencyIndex(value: number) {
        if (this._urgencyIndex !== value) {
            this._urgencyIndex = value;
            this.notifyPropertyChange('urgencyIndex', value);
            if (this._step === 3) {
                this.updateQuote();
            }
        }
    }

    get selectedDate(): Date {
        return this._selectedDate;
    }

    set selectedDate(value: Date) {
        if (this._selectedDate !== value) {
            this._selectedDate = value;
            this.notifyPropertyChange('selectedDate', value);
            this.notifyPropertyChange('formattedDate', this.formattedDate);
        }
    }

    get formattedDate(): string {
        return this._selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    get selectedTimeIndex(): number {
        return this._selectedTimeIndex;
    }

    set selectedTimeIndex(value: number) {
        if (this._selectedTimeIndex !== value) {
            this._selectedTimeIndex = value;
            this._selectedTime = this._availableTimeSlots[value];
            this.notifyPropertyChange('selectedTimeIndex', value);
            this.notifyPropertyChange('selectedTime', this._selectedTime);
        }
    }

    get selectedTime(): string {
        return this._selectedTime;
    }

    get availableTimeSlots(): string[] {
        return this._availableTimeSlots;
    }

    get quote(): Quote | null {
        return this._quote;
    }

    get customerName(): string {
        return this._customerName;
    }

    set customerName(value: string) {
        if (this._customerName !== value) {
            this._customerName = value;
            this.notifyPropertyChange('customerName', value);
        }
    }

    get customerPhone(): string {
        return this._customerPhone;
    }

    set customerPhone(value: string) {
        if (this._customerPhone !== value) {
            this._customerPhone = value;
            this.notifyPropertyChange('customerPhone', value);
        }
    }

    get customerEmail(): string {
        return this._customerEmail;
    }

    set customerEmail(value: string) {
        if (this._customerEmail !== value) {
            this._customerEmail = value;
            this.notifyPropertyChange('customerEmail', value);
        }
    }

    get additionalNotes(): string {
        return this._additionalNotes;
    }

    set additionalNotes(value: string) {
        if (this._additionalNotes !== value) {
            this._additionalNotes = value;
            this.notifyPropertyChange('additionalNotes', value);
        }
    }

    private generateTimeSlots() {
        const slots = [];
        for (let hour = 8; hour <= 17; hour++) {
            const period = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour > 12 ? hour - 12 : hour;
            slots.push(`${displayHour}:00 ${period}`);
            if (hour !== 17) {
                slots.push(`${displayHour}:30 ${period}`);
            }
        }
        this._availableTimeSlots = slots;
        this._selectedTime = slots[0];
        this.notifyPropertyChange('availableTimeSlots', slots);
    }

    private updateQuote() {
        const basePrice = this._service.price;
        const complexityMultiplier = [1, 1.5, 2][this._complexityIndex];
        const urgencyFee = [0, 100][this._urgencyIndex];
        
        // Calculate area-based cost
        const areaCost = Math.max(0, this._area * 0.5); // $0.50 per sq ft
        
        // Calculate complexity fee
        const complexityFee = basePrice * (complexityMultiplier - 1);
        
        // Calculate materials cost based on area and complexity
        const materialsCost = this._area > 0 ? 
            Math.ceil(this._area * 2 * complexityMultiplier) : 
            Math.ceil(basePrice * 0.2 * complexityMultiplier);

        const total = Math.ceil(basePrice + complexityFee + urgencyFee + areaCost + materialsCost);

        this._quote = {
            basePrice,
            complexityFee,
            urgencyFee,
            materialsCost,
            total,
            breakdown: [
                { label: 'Base Service Price', amount: basePrice },
                { label: 'Complexity Adjustment', amount: Math.ceil(complexityFee) },
                { label: 'Area Cost', amount: Math.ceil(areaCost) },
                { label: 'Materials', amount: materialsCost },
                { label: 'Urgency Fee', amount: urgencyFee }
            ]
        };

        this.notifyPropertyChange('quote', this._quote);
    }

    async onNext() {
        if (await this.validateCurrentStep()) {
            if (this._step === 2) {
                this.updateQuote();
            }
            this.step++;
        }
    }

    onPrevious() {
        if (this._step > 1) {
            this.step--;
        }
    }

    private async validateCurrentStep(): Promise<boolean> {
        try {
            switch (this._step) {
                case 1:
                    if (!this._requirements.trim()) {
                        await alert({
                            title: "Required Field",
                            message: "Please describe your project requirements",
                            okButtonText: "OK"
                        });
                        return false;
                    }
                    break;

                case 2:
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    
                    if (this._selectedDate < today) {
                        await alert({
                            title: "Invalid Date",
                            message: "Please select a future date",
                            okButtonText: "OK"
                        });
                        return false;
                    }
                    break;

                case 4:
                    if (!this._customerName.trim() || !this._customerPhone.trim() || !this._customerEmail.trim()) {
                        await alert({
                            title: "Required Fields",
                            message: "Please fill in all contact information",
                            okButtonText: "OK"
                        });
                        return false;
                    }

                    if (!this.isValidEmail(this._customerEmail)) {
                        await alert({
                            title: "Invalid Email",
                            message: "Please enter a valid email address",
                            okButtonText: "OK"
                        });
                        return false;
                    }

                    if (!this.isValidPhone(this._customerPhone)) {
                        await alert({
                            title: "Invalid Phone",
                            message: "Please enter a valid phone number",
                            okButtonText: "OK"
                        });
                        return false;
                    }
                    break;
            }
            return true;
        } catch (error) {
            console.error('Validation error:', error);
            return false;
        }
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    private isValidPhone(phone: string): boolean {
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        return phoneRegex.test(phone);
    }

    async onSubmit() {
        try {
            if (!await this.validateCurrentStep()) {
                return;
            }

            const booking = {
                serviceId: this._service.id,
                serviceName: this._service.name,
                date: this._selectedDate,
                time: this._selectedTime,
                requirements: this._requirements,
                area: this._area,
                complexity: ['simple', 'moderate', 'complex'][this._complexityIndex],
                urgency: ['normal', 'urgent'][this._urgencyIndex],
                quote: this._quote,
                customer: {
                    name: this._customerName,
                    phone: this._customerPhone,
                    email: this._customerEmail
                },
                additionalNotes: this._additionalNotes,
                status: 'confirmed',
                createdAt: new Date()
            };

            // Here you would typically save the booking to your backend
            console.log('Booking confirmed:', booking);

            await alert({
                title: "Booking Confirmed!",
                message: `Thank you ${this._customerName}! Your ${this._service.name} service has been scheduled for ${this.formattedDate} at ${this._selectedTime}. We'll send a confirmation email to ${this._customerEmail} with all the details.`,
                okButtonText: "OK"
            });

            Frame.topmost().navigate({
                moduleName: "views/categories-page",
                clearHistory: true,
                transition: {
                    name: 'slideRight',
                    duration: 200
                }
            });
        } catch (error) {
            console.error('Booking error:', error);
            await alert({
                title: "Error",
                message: "There was a problem confirming your booking. Please try again.",
                okButtonText: "OK"
            });
        }
    }

    onBack() {
        Frame.topmost().goBack();
    }
}