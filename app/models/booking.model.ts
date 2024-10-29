export interface BookingDetails {
    serviceId: string;
    date: Date;
    time: string;
    requirements: string;
    area?: number;
    complexity: 'simple' | 'moderate' | 'complex';
    urgency: 'normal' | 'urgent';
    materials?: string[];
    additionalNotes?: string;
}

export interface Quote {
    basePrice: number;
    complexityFee: number;
    urgencyFee: number;
    materialsCost: number;
    total: number;
    breakdown: string[];
}

export const COMPLEXITY_MULTIPLIERS = {
    simple: 1,
    moderate: 1.5,
    complex: 2
};

export const URGENCY_FEES = {
    normal: 0,
    urgent: 100
};