export interface Service {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
}

export interface ServiceCategory {
    id: string;
    name: string;
    iconSrc: string;
    description: string;
    services: Service[];
}

export const categories: ServiceCategory[] = [
    {
        id: '1',
        name: 'Electrical',
        iconSrc: '~/images/icons/electrical.png',
        description: 'Professional electrical services for your home and business',
        services: [
            { id: 'e1', name: 'Electrical Installation', price: 150, description: 'Complete electrical system installation', category: '1' },
            { id: 'e2', name: 'Circuit Repair', price: 100, description: 'Fix electrical circuits and wiring', category: '1' },
            { id: 'e3', name: 'Emergency Service', price: 200, description: '24/7 emergency electrical repairs', category: '1' },
            { id: 'e4', name: 'Panel Upgrade', price: 300, description: 'Electrical panel replacement and upgrade', category: '1' },
            { id: 'e5', name: 'Lighting Installation', price: 120, description: 'Indoor and outdoor lighting setup', category: '1' },
            { id: 'e6', name: 'Safety Inspection', price: 80, description: 'Comprehensive electrical safety check', category: '1' },
            { id: 'e7', name: 'Generator Installation', price: 450, description: 'Backup generator setup and wiring', category: '1' },
            { id: 'e8', name: 'Smart Home Wiring', price: 250, description: 'Smart home electrical configuration', category: '1' }
        ]
    },
    {
        id: '2',
        name: 'Plumbing',
        iconSrc: '~/images/icons/plumbing.png',
        description: 'Expert plumbing solutions for all your needs',
        services: [
            { id: 'p1', name: 'Pipe Repair', price: 120, description: 'Fix leaky or broken pipes', category: '2' },
            { id: 'p2', name: 'Drain Cleaning', price: 90, description: 'Professional drain cleaning service', category: '2' },
            { id: 'p3', name: 'Water Heater', price: 180, description: 'Installation and repair of water heaters', category: '2' },
            { id: 'p4', name: 'Toilet Repair', price: 100, description: 'Toilet installation and repair', category: '2' },
            { id: 'p5', name: 'Sewer Line Service', price: 250, description: 'Sewer line inspection and repair', category: '2' },
            { id: 'p6', name: 'Faucet Installation', price: 80, description: 'Faucet replacement and repair', category: '2' },
            { id: 'p7', name: 'Garbage Disposal', price: 120, description: 'Disposal installation and repair', category: '2' },
            { id: 'p8', name: 'Water Filtration', price: 300, description: 'Water filtration system installation', category: '2' }
        ]
    },
    {
        id: '3',
        name: 'HVAC',
        iconSrc: '~/images/icons/hvac.png',
        description: 'Complete heating and cooling solutions',
        services: [
            { id: 'h1', name: 'AC Installation', price: 500, description: 'New AC system installation', category: '3' },
            { id: 'h2', name: 'Heating Repair', price: 150, description: 'Heating system repairs', category: '3' },
            { id: 'h3', name: 'Maintenance', price: 100, description: 'Regular HVAC maintenance', category: '3' },
            { id: 'h4', name: 'Duct Cleaning', price: 200, description: 'Air duct cleaning service', category: '3' },
            { id: 'h5', name: 'Emergency Service', price: 250, description: '24/7 emergency HVAC repairs', category: '3' },
            { id: 'h6', name: 'Filter Replacement', price: 50, description: 'HVAC filter replacement', category: '3' },
            { id: 'h7', name: 'System Tune-up', price: 120, description: 'HVAC system optimization', category: '3' },
            { id: 'h8', name: 'Thermostat Install', price: 80, description: 'Smart thermostat installation', category: '3' }
        ]
    },
    {
        id: '4',
        name: 'Roofing',
        iconSrc: '~/images/icons/roofing.png',
        description: 'Professional roofing services and repairs',
        services: [
            { id: 'r1', name: 'Roof Repair', price: 300, description: 'Fix roof damage and leaks', category: '4' },
            { id: 'r2', name: 'New Installation', price: 5000, description: 'Complete roof installation', category: '4' },
            { id: 'r3', name: 'Inspection', price: 150, description: 'Comprehensive roof inspection', category: '4' },
            { id: 'r4', name: 'Gutter Service', price: 200, description: 'Gutter cleaning and repair', category: '4' },
            { id: 'r5', name: 'Shingle Repair', price: 250, description: 'Shingle replacement service', category: '4' },
            { id: 'r6', name: 'Leak Detection', price: 100, description: 'Roof leak detection service', category: '4' },
            { id: 'r7', name: 'Maintenance', price: 180, description: 'Regular roof maintenance', category: '4' },
            { id: 'r8', name: 'Emergency Service', price: 400, description: '24/7 emergency roof repairs', category: '4' }
        ]
    },
    {
        id: '5',
        name: 'Concrete',
        iconSrc: '~/images/icons/concrete.png',
        description: 'Expert concrete work and repairs',
        services: [
            { id: 'c1', name: 'Foundation Repair', price: 1000, description: 'Foundation repair service', category: '5' },
            { id: 'c2', name: 'Driveway Install', price: 2500, description: 'New driveway installation', category: '5' },
            { id: 'c3', name: 'Patio Creation', price: 1500, description: 'Custom patio installation', category: '5' },
            { id: 'c4', name: 'Sidewalk Repair', price: 500, description: 'Sidewalk repair service', category: '5' },
            { id: 'c5', name: 'Stamped Concrete', price: 800, description: 'Decorative concrete work', category: '5' },
            { id: 'c6', name: 'Concrete Sealing', price: 300, description: 'Concrete sealing service', category: '5' },
            { id: 'c7', name: 'Steps & Stairs', price: 1200, description: 'Concrete steps installation', category: '5' },
            { id: 'c8', name: 'Crack Repair', price: 200, description: 'Concrete crack repair', category: '5' }
        ]
    },
    {
        id: '6',
        name: 'Fencing',
        iconSrc: '~/images/icons/fencing.png',
        description: 'Quality fencing installation and repair',
        services: [
            { id: 'f1', name: 'Fence Installation', price: 400, description: 'New fence installation', category: '6' },
            { id: 'f2', name: 'Repair Service', price: 150, description: 'Fix damaged fencing', category: '6' },
            { id: 'f3', name: 'Gate Installation', price: 200, description: 'New gate installation', category: '6' },
            { id: 'f4', name: 'Wood Fence', price: 350, description: 'Custom wood fence installation', category: '6' },
            { id: 'f5', name: 'Chain Link', price: 250, description: 'Chain link fence installation', category: '6' },
            { id: 'f6', name: 'Vinyl Fence', price: 450, description: 'Vinyl fence installation', category: '6' },
            { id: 'f7', name: 'Electric Gate', price: 600, description: 'Automated gate system installation', category: '6' },
            { id: 'f8', name: 'Privacy Fence', price: 500, description: 'Privacy fence installation', category: '6' }
        ]
    },
    {
        id: '7',
        name: 'Landscaping',
        iconSrc: '~/images/icons/landscaping.png',
        description: 'Professional landscaping and garden services',
        services: [
            { id: 'l1', name: 'Lawn Care', price: 100, description: 'Regular lawn maintenance', category: '7' },
            { id: 'l2', name: 'Tree Service', price: 300, description: 'Tree trimming and removal', category: '7' },
            { id: 'l3', name: 'Garden Design', price: 500, description: 'Custom garden design', category: '7' },
            { id: 'l4', name: 'Irrigation', price: 400, description: 'Sprinkler system installation', category: '7' },
            { id: 'l5', name: 'Hardscaping', price: 1000, description: 'Custom hardscape installation', category: '7' },
            { id: 'l6', name: 'Mulching', price: 150, description: 'Professional mulching service', category: '7' },
            { id: 'l7', name: 'Pest Control', price: 200, description: 'Garden pest control service', category: '7' },
            { id: 'l8', name: 'Lighting', price: 350, description: 'Landscape lighting installation', category: '7' }
        ]
    },
    {
        id: '8',
        name: 'Recycling',
        iconSrc: '~/images/icons/recycling.png',
        description: 'Eco-friendly waste management solutions',
        services: [
            { id: 'w1', name: 'Waste Removal', price: 100, description: 'Regular waste collection', category: '8' },
            { id: 'w2', name: 'Recycling Service', price: 75, description: 'Recycling collection and sorting', category: '8' },
            { id: 'w3', name: 'Bulk Pickup', price: 150, description: 'Large item removal service', category: '8' },
            { id: 'w4', name: 'E-Waste', price: 80, description: 'Electronic waste disposal', category: '8' },
            { id: 'w5', name: 'Hazardous Waste', price: 200, description: 'Hazardous material disposal', category: '8' },
            { id: 'w6', name: 'Green Waste', price: 90, description: 'Yard waste collection', category: '8' },
            { id: 'w7', name: 'Construction Debris', price: 250, description: 'Construction waste removal', category: '8' },
            { id: 'w8', name: 'Commercial Service', price: 300, description: 'Business recycling solutions', category: '8' }
        ]
    }
];