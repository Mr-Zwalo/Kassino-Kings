/* ── LuxeEstates — properties.js ───────────────────────────────────────────
   Interactive property website logic
   ─────────────────────────────────────────────────────────────────────────── */

'use strict';

/* ═══════════════════════════  DATA  ══════════════════════════════════════ */

const PROPERTIES = [
    {
        id: 1,
        name: 'Margate Luxury Apartment',
        type: 'apartment',
        location: '121 Marine Drive, Margate',
        price: 2200000,
        beds: 4, baths: 3, size: 163, garage: 1,
        rating: 4.9, reviews: 18,
        badges: ['featured', 'new'],
        icon: '◆',
        colorClass: 'prop-color-1',
        desc: 'Spectacular oceanfront luxury apartment with stunning beachfront views. Fully furnished with elegant granite countertops, open-plan living, and wide balcony overlooking the sea. Located in an exceptionally well-maintained complex perfect for seaside living.',
        amenities: ['Ocean Views','Balcony','Granite Countertops','Fully Furnished','Built-in Braai','Communal Pool','Sea Facing','Air Conditioning','Security Gate','Fibre Internet','Secure Parking','Tourist Potential'],
        rooms: [{name:'Master Bedroom',size:'28 sqm'},{name:'Bedroom 2',size:'22 sqm'},{name:'Bedroom 3',size:'18 sqm'},{name:'Bedroom 4',size:'16 sqm'},{name:'Open Living/Dining',size:'44 sqm'},{name:'Kitchen',size:'20 sqm'}],
        rentalYield: 8.5,
        priceHistory: [1900000, 2000000, 2100000, 2200000],
        featured: true,
        images: {
            hero: 'images/balooga-7/1.jpg',
            gallery: [
                'images/balooga-7/1.jpg',
                'images/balooga-7/2.jpg',
                'images/balooga-7/3.jpg',
                'images/balooga-7/4.jpg',
                'images/balooga-7/5.jpg',
                'images/balooga-7/6.jpg',
                'images/balooga-7/7.jpg',
                'images/balooga-7/8.jpg'
            ]
        }
    },
    {
        id: 2,
        name: 'Port Edward Eco Estate Townhouse',
        type: 'townhouse',
        location: 'Unit 12 Bayview, Ekubo Eco Estate, Port Edward',
        price: 3960000,
        beds: 4, baths: 3, size: 280, garage: 2,
        rating: 4.9, reviews: 26,
        badges: ['hot'],
        icon: '◆',
        colorClass: 'prop-color-3',
        desc: 'Luxurious fully furnished Balinese-inspired townhouse in exclusive Ekubo Eco Coastal Estate. Double-volume living, sea views, private pool, entertainment braai room, direct beach access, and 137 hectares of pristine coastal forest.',
        amenities: ['Private Pool','Beach Access','Sea Views','Braai Room','Double Garage','Entertainment Area','Garden Services','Fibre Internet','Security','Wildlife Estate'],
        rooms: [{name:'Master Bedroom',size:'35 sqm'},{name:'Bedroom 2',size:'28 sqm'},{name:'Bedroom 3',size:'24 sqm'},{name:'Bedroom 4',size:'18 sqm'},{name:'Lounge/Dining',size:'48 sqm'},{name:'Kitchen',size:'22 sqm'}],
        rentalYield: 8.9,
        priceHistory: [3200000, 3500000, 3750000, 3960000],
        featured: false,
        images: {
            hero: 'images/bayview-12/1.jpg',
            gallery: [
                'images/bayview-12/1.jpg',
                'images/bayview-12/2.jpg',
                'images/bayview-12/3.jpg',
                'images/bayview-12/4.jpg',
                'images/bayview-12/5.jpg',
                'images/bayview-12/6.jpg',
                'images/bayview-12/7.jpg',
                'images/bayview-12/8.jpg'
            ]
        }
    },
    {
        id: 3,
        name: 'Seaview Home',
        type: 'house',
        location: '67 Elizabeth Road, Margate',
        price: 1450000,
        beds: 3, baths: 2, size: 192, garage: 2,
        rating: 4.7, reviews: 22,
        badges: ['new'],
        icon: '◆',
        colorClass: 'prop-color-4',
        desc: 'Expansive 3-bedroom home on 1,976 m² of lush green lawns with breathtaking sea views. Located in safe neighbourhood close to schools, shopping mall and hospital. Perfect for families or investors with large pool and double garage.',
        amenities: ['Ocean Views','Swimming Pool','Large Garden','Double Garage','Carport','Sea Views','Outdoor Toilet','Fibre Internet','Security Fenced','Pet Friendly','Rental Potential','Spacious Yard'],
        rooms: [{name:'Master Bedroom',size:'32 sqm'},{name:'Bedroom 2',size:'26 sqm'},{name:'Bedroom 3',size:'20 sqm'},{name:'Lounge',size:'42 sqm'},{name:'Kitchen',size:'24 sqm'},{name:'Bathrooms',size:'18 sqm'}],
        rentalYield: 9.2,
        priceHistory: [3600000, 3800000, 3900000, 5000000],
        featured: false,
        images: {
            hero: 'images/elizabeth-road/1.jpg',
            gallery: [
                'images/elizabeth-road/1.jpg',
                'images/elizabeth-road/2.jpg',
                'images/elizabeth-road/3.jpg',
                'images/elizabeth-road/4.jpg',
                'images/elizabeth-road/5.jpg',
                'images/elizabeth-road/6.jpg',
                'images/elizabeth-road/7.jpg',
                'images/elizabeth-road/8.jpg'
            ]
        }
    },
    {
        id: 4,
        name: 'Margate Beach Beachfront Apartment',
        type: 'apartment',
        location: '53 Marine Drive, Margate Beach',
        price: 799000,
        beds: 2, baths: 1, size: 61, garage: 1,
        rating: 4.7, reviews: 28,
        badges: ['reduced'],
        icon: '◆',
        colorClass: 'prop-color-5',
        desc: 'Absolute steal! Wake up to ocean waves and panoramic views directly opposite the beach. Fully furnished, 2-bedroom apartment with beach access, high rental yield potential. Priced under R1 million - rare find in high-demand area.',
        amenities: ['Beach Opposite','Ocean Views','Fully Furnished','Balcony','Secure Parking','Sea Views','Communal Pool','Fibre Internet','Granite Kitchen','No Transfer Duty'],
        rooms: [{name:'Master Bedroom',size:'20 sqm'},{name:'Bedroom 2',size:'16 sqm'},{name:'Lounge/Dining',size:'28 sqm'},{name:'Kitchen',size:'10 sqm'},{name:'Balcony',size:'12 sqm'}],
        rentalYield: 11.2,
        priceHistory: [600000, 680000, 740000, 799000],
        featured: false,
        images: {
            hero: 'images/seagull/1.jpg',
            gallery: [
                'images/seagull/1.jpg',
                'images/seagull/2.jpg',
                'images/seagull/3.jpg',
                'images/seagull/4.jpg',
                'images/seagull/5.jpg',
                'images/seagull/6.jpg',
                'images/seagull/7.jpg',
                'images/seagull/8.jpg'
            ]
        }
    },
    {
        id: 5,
        name: 'Santana Resort Beachfront Apartment',
        type: 'apartment',
        location: '98 Duke Road, Margate North Beach',
        price: 1296000,
        beds: 3, baths: 2, size: 96, garage: 1,
        rating: 4.8, reviews: 19,
        badges: ['hot'],
        icon: '◆',
        colorClass: 'prop-color-5',
        desc: 'Stunning beachfront apartment on the eighth floor with panoramic sea views. Fully furnished 96m² unit featuring open-plan lounge, dining area, and granite-topped kitchen flowing onto a spacious balcony. Located in Santana Resort with direct beach access, heated pools, 24-hour security, and strong rental income potential.',
        amenities: ['Direct Beach Access','Ocean Views','Fully Furnished','Heated Pool','Communal Pool','Granite Kitchen','Balcony','Secure Parking','24/7 Security','Fibre Internet','Children Play Area','Wheelchair Accessible'],
        rooms: [{name:'Master Bedroom (En Suite)',size:'20 sqm'},{name:'Bedroom 2',size:'16 sqm'},{name:'Bedroom 3',size:'14 sqm'},{name:'Open Plan Living/Dining',size:'28 sqm'},{name:'Kitchen',size:'10 sqm'}],
        rentalYield: 12.5,
        priceHistory: [950000, 1050000, 1150000, 1296000],
        featured: false,
        images: {
            hero: 'images/santana-807/1.jpg',
            gallery: [
                'images/santana-807/1.jpg',
                'images/santana-807/2.jpg',
                'images/santana-807/3.jpg',
                'images/santana-807/4.jpg',
                'images/santana-807/5.jpg',
                'images/santana-807/6.jpg',
                'images/santana-807/7.jpg',
                'images/santana-807/8.jpg'
            ]
        }
    },
    {
        id: 6,
        name: 'Ekubo Coastal Estate Luxury Home',
        type: 'house',
        location: 'Port Edward, South Africa',
        price: 4950000,
        beds: 4, baths: 5, size: 350, garage: 2,
        rating: 4.9, reviews: 12,
        badges: ['featured'],
        icon: '◆',
        colorClass: 'prop-color-2',
        desc: 'Luxury beachfront residence in Ekubo Coastal Estate featuring modern Balinese-inspired design. Fully furnished, stunning sea views, double-storey with pool, entertainment area, and access to clubhouse, tennis courts, and private beach.',
        amenities: ['Private Pool','Entertainment Room','Balcony','Built-in Braai','Solar Panels','Water Tank','Fitness Gym','Tennis Court','Squash Court','Clubhouse','Private Beach Access','24/7 Security'],
        rooms: [{name:'Master Bedroom',size:'42 sqm'},{name:'Bedroom 2',size:'35 sqm'},{name:'Bedroom 3',size:'30 sqm'},{name:'Bedroom 4',size:'28 sqm'},{name:'Lounge/Dining',size:'50 sqm'},{name:'Kitchen',size:'28 sqm'}],
        rentalYield: 7.8,
        priceHistory: [4200000, 4500000, 4750000, 4950000],
        featured: true,
        images: {
            hero: 'images/ekubo-1585/1.jpg',
            gallery: [
                'images/ekubo-1585/1.jpg',
                'images/ekubo-1585/2.jpg',
                'images/ekubo-1585/3.jpg',
                'images/ekubo-1585/4.jpg',
                'images/ekubo-1585/5.jpg',
                'images/ekubo-1585/6.jpg',
                'images/ekubo-1585/7.jpg',
                'images/ekubo-1585/8.jpg'
            ]
        }
    },
    {
        id: 7,
        name: 'Ramsgate Twin Family Homes',
        type: 'house',
        location: '2134 Clarence Road, Ramsgate',
        price: 4400000,
        beds: 6, baths: 5, size: 450, garage: 3,
        rating: 4.9, reviews: 24,
        badges: [],
        icon: '◆',
        colorClass: 'prop-color-6',
        desc: 'Two immaculate family homes on one stand. Main home has 3 bedrooms, modern kitchen with gas hob, beautiful patio with sea views. Second home features 3 en-suite bedrooms, open-plan living with stone tops, automated double garage. Perfect for extended families.',
        amenities: ['Twin Homes','Pool','Garden','Stone/Marble Tops','Automated Garage','Sea Views','Modern Kitchen','Deck Access','Double Carport','Landscape Garden','Forest Views','Pet Friendly'],
        rooms: [{name:'Main Bedroom',size:'38 sqm'},{name:'Bedroom 2',size:'32 sqm'},{name:'Bedroom 3',size:'28 sqm'},{name:'Bedroom 4',size:'35 sqm'},{name:'Bedroom 5',size:'30 sqm'},{name:'Bedroom 6',size:'26 sqm'}],
        rentalYield: 8.5,
        priceHistory: [3200000, 3500000, 3750000, 3960000],
        featured: false,
        images: {
            hero: 'images/clarence-road/1.jpg',
            gallery: [
                'images/clarence-road/1.jpg',
                'images/clarence-road/2.jpg',
                'images/clarence-road/3.jpg',
                'images/clarence-road/4.jpg',
                'images/clarence-road/5.jpg',
                'images/clarence-road/6.jpg',
                'images/clarence-road/7.jpg',
                'images/clarence-road/8.jpg'
            ]
        }
    },
    {
        id: 8,
        name: 'Astor Lane Coastal Plot',
        type: 'land',
        location: '24 Astor Lane, Margate',
        price: 730000,
        beds: 0, baths: 0, size: 800, garage: 0,
        rating: 4.8, reviews: 12,
        badges: ['featured'],
        icon: '◆',
        colorClass: 'prop-color-6',
        desc: 'Rare opportunity! Elevated vacant land plot with breathtaking sea views in sought-after Margate. 800m² of prime residential land perfect for building your dream retirement home or investment property. Last available lot in premium coastal location with lower cost of living and vibrant community.',
        amenities: ['Breathtaking Sea Views','Elevated Position','800m² Plot','Residential Zoning','Beachfront Access','Coastal Walk','Local Amenities','Lower Cost of Living','Community Lifestyle','Development Ready'],
        rooms: [{name:'Future Living Space',size:'Customizable'},{name:'Sea View Orientation',size:'Premium Aspect'},{name:'Lot Boundaries',size:'800 sqm'}],
        rentalYield: 0,
        priceHistory: [650000, 680000, 700000, 730000],
        featured: true,
        images: {
            hero: 'images/ridge-road/1.jpg',
            gallery: [
                'images/ridge-road/1.jpg',
                'images/ridge-road/2.jpg',
                'images/ridge-road/3.jpg',
                'images/ridge-road/4.jpg',
                'images/ridge-road/5.jpg',
                'images/ridge-road/6.jpg',
                'images/ridge-road/7.jpg',
                'images/ridge-road/8.jpg'
            ]
        }
    },
    {
        id: 9,
        name: 'Ekubo Coastal Estate Vacant Stand',
        type: 'land',
        location: '1555 Ekubo Coastal Estate, Port Edward',
        price: 220000,
        beds: 0, baths: 0, size: 1822, garage: 0,
        rating: 4.7, reviews: 9,
        badges: ['new'],
        icon: '\u25c6',
        colorClass: 'prop-color-2',
        desc: 'Bargain-priced vacant stand in Ekubo Coastal Estate with ocean views and a generous 1,822 sqm footprint. The estate offers premium lifestyle facilities including clubhouse, tennis and squash courts, communal pool, gym, restaurant, and secure beach access pathways.',
        amenities: ['Ocean View Stand','1822 sqm Plot','Single Residential Zoning','Gated Security Estate','Clubhouse','Tennis Court','Squash Court','Communal Pool','Gymnasium','Restaurant','Beach Access','Fibre Ready'],
        rooms: [{name:'Land Parcel',size:'1822 sqm'},{name:'Zoning',size:'Single Residential'},{name:'Estate Facilities',size:'Full Access'}],
        rentalYield: 0,
        priceHistory: [180000, 195000, 205000, 220000],
        featured: false,
        images: {
            hero: 'images/ekubo-1555/1.jpg',
            gallery: [
                'images/ekubo-1555/1.jpg',
                'images/ekubo-1555/2.jpg',
                'images/ekubo-1555/3.jpg',
                'images/ekubo-1555/4.jpg',
                'images/ekubo-1555/5.jpg',
                'images/ekubo-1555/6.jpg',
                'images/ekubo-1555/7.jpg',
                'images/ekubo-1555/8.jpg',
                'images/ekubo-1555/9.jpg',
                'images/ekubo-1555/10.jpg'
            ]
        }
    },
    {
        id: 10,
        name: 'Ekubo Coastal Estate Development Plot',
        type: 'land',
        location: 'Ekubo Coastal Estate, Port Edward',
        price: 7700000,
        beds: 0, baths: 0, size: 16000, garage: 0,
        rating: 4.9, reviews: 14,
        badges: ['featured'],
        icon: '\u25c6',
        colorClass: 'prop-color-2',
        desc: 'A rare 1.6-hectare development opportunity in the prestigious Ekubo Coastal Estate with sweeping sea views, premium positioning, and exceptional long-term upside. Ideal for a signature private residence or a landmark luxury coastal project.',
        amenities: ['1.6 Hectares','16000 sqm Development Site','Sea Views','Prime Zone','Eco Estate Setting','Beach Access','Clubhouse Access','Security Estate','Development Potential','Coastal Prestige','Balinese Design Context','Investment Grade Opportunity'],
        rooms: [{name:'Land Parcel',size:'16000 sqm'},{name:'Estate Positioning',size:'Prime Zone'},{name:'Development Scope',size:'Luxury Residential'}],
        rentalYield: 0,
        priceHistory: [6200000, 6800000, 7300000, 7700000],
        featured: true,
        images: {
            hero: 'images/ekubo-1364/hero.jpg',
            gallery: [
                'images/ekubo-1364/1.jpg',
                'images/ekubo-1364/2.jpg',
                'images/ekubo-1364/3.jpg',
                'images/ekubo-1364/4.jpg',
                'images/ekubo-1364/5.jpg',
                'images/ekubo-1364/6.jpg',
                'images/ekubo-1364/7.jpg',
                'images/ekubo-1364/8.jpg',
                'images/ekubo-1364/9.jpg',
                'images/ekubo-1364/10.jpg'
            ]
        }
    },
    {
        id: 11,
        name: 'Margate Oceanfront Apartment',
        type: 'apartment',
        location: '29 Marine Drive, Margate',
        price: 2550000,
        beds: 3, baths: 2, size: 217, garage: 2,
        rating: 4.8, reviews: 11,
        badges: ['featured', 'new'],
        icon: '\u25c6',
        colorClass: 'prop-color-1',
        desc: 'Oceanfront elegance above Margate promenade. This fully furnished third-floor apartment offers uninterrupted sea views, a private balcony for sunrise and sunset entertaining, premium finishes, and strong short-term rental appeal in a boutique beachfront building.',
        amenities: ['Uninterrupted Sea Views','Private Balcony','Fully Furnished','Designer Kitchen','Stone Surfaces','Lift Access','Communal Pool','Double Basement Parking','Air Conditioning','Fibre Internet','Boutique Building','Holiday Let Potential'],
        rooms: [{name:'Main Bedroom',size:'Spacious En Suite'},{name:'Bedroom 2',size:'Built-in Cupboards'},{name:'Bedroom 3',size:'Built-in Cupboards'},{name:'Open Plan Living',size:'Sea Facing'},{name:'Designer Kitchen',size:'Premium Finish'},{name:'Balcony',size:'Promenade View'}],
        rentalYield: 9.4,
        priceHistory: [2250000, 2350000, 2450000, 2550000],
        featured: true,
        images: {
            hero: 'images/rondevoux-17/1.jpg',
            gallery: [
                'images/rondevoux-17/1.jpg',
                'images/rondevoux-17/2.jpg',
                'images/rondevoux-17/3.jpg',
                'images/rondevoux-17/4.jpg',
                'images/rondevoux-17/5.jpg',
                'images/rondevoux-17/6.jpg',
                'images/rondevoux-17/7.jpg',
                'images/rondevoux-17/8.jpg',
                'images/rondevoux-17/9.jpg',
                'images/rondevoux-17/10.jpg'
            ]
        }
    },
    {
        id: 12,
        name: 'Uvongo Sea-Facing Home',
        type: 'house',
        location: '31A Broad Street, Uvongo',
        price: 2800000,
        beds: 3, baths: 3, size: 450, garage: 2,
        rating: 4.9, reviews: 14,
        badges: ['new', 'hot'],
        icon: '◆',
        colorClass: 'prop-color-2',
        desc: 'The discerning buyer\'s dream home! A large sea-facing double-storey with 180° ocean views, jacuzzi, pool, and spacious open-plan living on a 1,000 m² erf. Features a modern farm-style kitchen, braai/entertainment area, landscaped zen garden, and a self-contained outbuilding. A short stroll from the beach.',
        amenities: ['180° Sea Views','Jacuzzi','Swimming Pool','Braai/Entertainment Area','Double Garage','Zen Garden','Outbuilding','Open Plan Living','Balconies','Water Tank','Alarm System','Fibre Internet','Pet Friendly','Totally Walled'],
        rooms: [
            {name:'Master Bedroom', size:'En Suite, Balcony'},
            {name:'Bedroom 2', size:'Built-in Cupboards, Balcony'},
            {name:'Bedroom 3', size:'Built-in Cupboards, Balcony'},
            {name:'Open Plan Lounge/Dining', size:'Sea Facing, Veranda'},
            {name:'Kitchen', size:'Breakfast Nook, Scullery, Pantry'},
            {name:'Entertainment/Braai Room', size:'Open Plan, Recreation'}
        ],
        rentalYield: 8.7,
        priceHistory: [2400000, 2550000, 2700000, 2800000],
        featured: false,
        images: {
            hero: 'images/broad-street-uvongo/1.jpg',
            gallery: [
                'images/broad-street-uvongo/1.jpg',
                'images/broad-street-uvongo/2.jpg',
                'images/broad-street-uvongo/3.jpg',
                'images/broad-street-uvongo/4.jpg',
                'images/broad-street-uvongo/5.jpg',
                'images/broad-street-uvongo/6.jpg',
                'images/broad-street-uvongo/7.jpg',
                'images/broad-street-uvongo/8.jpg',
                'images/broad-street-uvongo/9.jpg',
                'images/broad-street-uvongo/10.jpg'
            ]
        }
    },
    {
        id: 13,
        name: 'Leisure Bay Development Land',
        type: 'land',
        hideFromListings: true,
        location: '1 Ekubo Estate, Leisure Bay, Port Edward',
        price: 40000000,
        beds: 0, baths: 0, size: 58339, garage: 0,
        rating: 5.0, reviews: 3,
        badges: ['featured', 'hot'],
        icon: '◆',
        colorClass: 'prop-color-5',
        desc: 'A once-in-a-lifetime development opportunity within one of KwaZulu-Natal\'s most sought-after eco estates. 58,339 m² of prime coastal land fully approved for 59 luxurious villas. All environmental impact assessments, studies, consolidation and sectional title registration already completed. Ready for immediate construction. Sole Mandate — qualified buyers only.',
        amenities: ['58,339 m² Erf','Approved for 59 Villas','EIA Completed','Sectional Title Registered','Gated Eco Estate','Coastal/Beach Lifestyle','General Residential Zoning','All Studies Paid','Infrastructure Ready','Warm Indian Ocean Borders'],
        rooms: [
            {name: 'Approved Villas', size: '59 units'},
            {name: 'Erf Size', size: '58,339 m²'},
            {name: 'Zoning', size: 'General Residential'},
            {name: 'Description', size: 'New Development'},
            {name: 'Lifestyle', size: 'Eco Estate, Gated, Coastal'}
        ],
        rentalYield: 0,
        priceHistory: [40000000],
        featured: false,
        images: {}
    }
];

const HOOD_DATA = {
    Margate: {
        title: 'Margate, South Africa',
        scores: [
            { label: 'Beaches & Swimming', icon: '\u25C6', cls: 'hi-education', barCls: 'bar-blue', score: 95 },
            { label: 'Tourism & Attractions', icon: '\u25C6', cls: 'hi-transit', barCls: 'bar-green', score: 92 },
            { label: 'Shopping & Dining', icon: '\u25C6', cls: 'hi-safety', barCls: 'bar-purple', score: 88 },
            { label: 'Rental Yield', icon: '\u25C6', cls: 'hi-value', barCls: 'bar-gold', score: 89 },
            { label: 'International Access', icon: '\u25C6', cls: 'hi-schools', barCls: 'bar-blue', score: 85 },
        ]
    },
    PortShepstone: {
        title: 'Port Shepstone, South Africa',
        scores: [
            { label: 'Coastal Beauty', icon: '\u25C6', cls: 'hi-education', barCls: 'bar-blue', score: 93 },
            { label: 'Marina & Activities', icon: '\u25C6', cls: 'hi-transit', barCls: 'bar-green', score: 91 },
            { label: 'Shopping & Services', icon: '\u25C6', cls: 'hi-safety', barCls: 'bar-purple', score: 87 },
            { label: 'Investment Potential', icon: '\u25C6', cls: 'hi-value', barCls: 'bar-gold', score: 90 },
            { label: 'Airport Proximity', icon: '\u25C6', cls: 'hi-schools', barCls: 'bar-blue', score: 82 },
        ]
    },
    PortEdward: {
        title: 'Port Edward, South Africa',
        scores: [
            { label: 'Pristine Beaches', icon: '\u25C6', cls: 'hi-education', barCls: 'bar-blue', score: 94 },
            { label: 'Eco-Tourism', icon: '\u25C6', cls: 'hi-transit', barCls: 'bar-green', score: 90 },
            { label: 'Luxury Amenities', icon: '\u25C6', cls: 'hi-safety', barCls: 'bar-purple', score: 89 },
            { label: 'Wildlife & Nature', icon: '\u25C6', cls: 'hi-value', barCls: 'bar-gold', score: 88 },
            { label: 'Premium Developments', icon: '\u25C6', cls: 'hi-schools', barCls: 'bar-blue', score: 91 },
        ]
    },
    Southbroom: {
        title: 'Southbroom, South Africa',
        scores: [
            { label: 'Blue Flag Beaches', icon: '\u25C6', cls: 'hi-education', barCls: 'bar-blue', score: 96 },
            { label: 'Golf & Recreation', icon: '\u25C6', cls: 'hi-transit', barCls: 'bar-green', score: 92 },
            { label: 'Fine Dining', icon: '\u25C6', cls: 'hi-safety', barCls: 'bar-purple', score: 90 },
            { label: 'Upmarket Living', icon: '\u25C6', cls: 'hi-value', barCls: 'bar-gold', score: 94 },
            { label: 'International Clientele', icon: '\u25C6', cls: 'hi-schools', barCls: 'bar-blue', score: 93 },
        ]
    },
    Ramsgate: {
        title: 'Ramsgate, South Africa',
        scores: [
            { label: 'Scenic Coastal Views', icon: '\u25C6', cls: 'hi-education', barCls: 'bar-blue', score: 91 },
            { label: 'Family Activities', icon: '\u25C6', cls: 'hi-transit', barCls: 'bar-green', score: 88 },
            { label: 'Local Character', icon: '\u25C6', cls: 'hi-safety', barCls: 'bar-purple', score: 85 },
            { label: 'Property Value Growth', icon: '\u25C6', cls: 'hi-value', barCls: 'bar-gold', score: 87 },
            { label: 'Accessibility', icon: '\u25C6', cls: 'hi-schools', barCls: 'bar-blue', score: 83 },
        ]
    }
};

const QUIZ_RESULTS = {
    estate: {
        icon: '\u25C6',
        type: 'The Estate Dweller',
        desc: 'You crave space, prestige and privacy. A sprawling estate or grand villa with private grounds would be your perfect match. Think infinity pools, manicured gardens and views that never get old.',
        tags: ['Villa', 'Estate', 'House', '4+ Beds']
    },
    urban: {
        icon: '\u25C6',
        type: 'The Urban Sophisticate',
        desc: 'City energy, world-class convenience. A penthouse or high-rise apartment with skyline views and walking access to everything is your ideal home.',
        tags: ['Penthouse', 'Apartment', 'City Centre', 'Modern']
    },
    family: {
        icon: '\u25C6',
        type: 'The Family Nester',
        desc: 'Warm spaces, room to grow, and a great school nearby. A family home or townhouse with a garden, safe neighbourhood and extra bedrooms is calling your name.',
        tags: ['House', 'Townhouse', '3–5 Beds', 'Safe Area']
    },
    investor: {
        icon: '\u25C6',
        type: 'The Smart Investor',
        desc: 'You see property as wealth-building. A high-yield apartment or studio in a growth area will maximise your returns while keeping maintenance low.',
        tags: ['Apartment', 'High Yield', 'Growth Area', 'Low Maintenance']
    }
};

/* ═══════════════════════════  STATE  ═════════════════════════════════════ */

let currentFilter   = 'all';
let currentSort     = 'default';
let currentSearch   = {};
let favorites       = new Set(JSON.parse(localStorage.getItem('lxe_favorites') || '[]'));
let visibleCount    = PROPERTIES.length;
let activeModal     = null;
let galleryIndex    = 0;
let quizAnswers     = {};
let toastTimer      = null;
let featuredRevealTimer = null;

/* ═══════════════════════════  INIT  ══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    renderProperties();
    updateCounts();
    initListingsHoverBackdrop();
    initFeaturedGateway();
    initCalculator();
    initQuiz();
    initNav();
    initSearch();
    initNeighbourhood();
    initBackToTop();
    initCounters();
    initMapPins();
});

/* ═══════════════════════════  NAV  ═══════════════════════════════════════ */

function initNav() {
    const hamburger = document.getElementById('nav-hamburger');
    const links     = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', open);
    });

    // Close menu on link click
    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            links.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Nav scroll style
    window.addEventListener('scroll', () => {
        document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

    // Active nav link highlight on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links-item');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(a => {
                    a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
                });
            }
        });
    }, { threshold: 0.4 });
    sections.forEach(s => observer.observe(s));
}

/* ═══════════════════════════  SEARCH  ════════════════════════════════════ */

function initSearch() {
    const form = document.getElementById('search-form');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            currentSearch = {
                location: document.getElementById('search-location').value.toLowerCase().trim(),
                type:     document.getElementById('search-type').value,
                price:    Number(document.getElementById('search-price').value) || Infinity,
                beds:     Number(document.getElementById('search-beds').value)  || 0
            };
            renderProperties();
            document.getElementById('listings').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // Hero search bar
    const heroBtn = document.getElementById('hero-search-btn');
    const heroInput = document.getElementById('hero-search-input');
    if (heroBtn && heroInput) {
        const doHeroSearch = () => {
            currentSearch = { location: heroInput.value.toLowerCase().trim() };
            renderProperties();
            document.getElementById('listings').scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
        heroBtn.addEventListener('click', doHeroSearch);
        heroInput.addEventListener('keydown', e => { if (e.key === 'Enter') doHeroSearch(); });
    }
}

function matchesSearch(p) {
    if (currentSearch.type && p.type !== currentSearch.type) return false;
    if (p.price > (currentSearch.price || Infinity)) return false;
    if (p.beds < (currentSearch.beds || 0)) return false;
    if (currentSearch.location && !p.location.toLowerCase().includes(currentSearch.location) && !p.name.toLowerCase().includes(currentSearch.location)) return false;
    return true;
}

/* ═══════════════════════════  FILTER TABS  ═══════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('filter-tabs').addEventListener('click', e => {
        const tab = e.target.closest('.filter-tab');
        if (!tab) return;
        document.querySelectorAll('.filter-tab').forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        currentFilter = tab.dataset.filter;
        renderProperties();
    });

    document.getElementById('sort-select').addEventListener('change', e => {
        currentSort = e.target.value;
        renderProperties();
    });
});

/* ═══════════════════════════  RENDER PROPERTIES  ════════════════════════ */

function getFilteredSorted() {
    let list = PROPERTIES.filter(p => {
        if (p.hideFromListings) return false;
        if (currentFilter !== 'all' && p.type !== currentFilter) return false;
        return matchesSearch(p);
    });

    switch (currentSort) {
        case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
        case 'price-desc': list.sort((a, b) => b.price - a.price); break;
        case 'newest':     list.sort((a, b) => b.id - a.id); break;
        case 'beds-desc':  list.sort((a, b) => b.beds - a.beds); break;
        default:           list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
    }
    return list;
}

function renderProperties() {
    const grid = document.getElementById('properties-grid');
    const listings = document.getElementById('listings');
    const list = getFilteredSorted();

    if (listings) {
        listings.classList.remove('has-hover-bg');
        listings.style.removeProperty('--listings-hover-bg');
        listings.style.removeProperty('background-image');
        delete listings.dataset.activeBg;
    }

    grid.innerHTML = '';
    list.forEach((p, i) => {
        const card = buildCard(p, i);
        grid.appendChild(card);
    });

    document.getElementById('visible-count').textContent = list.length;
    updateCounts();

    // Animate bars in viewport
    requestAnimationFrame(() => {
        document.querySelectorAll('.hood-score-bar').forEach(bar => {
            bar.style.width = bar.dataset.width;
        });
    });
}

function buildCard(p, delay) {
    const isFav = favorites.has(p.id);
    const badgesHtml = p.badges.map(b => `<span class="prop-badge badge-${b}">${badgeLabel(b)}</span>`).join('');
    
    // Prepare image HTML - use real image if available, fallback to placeholder
    let imgHtml;
    if (p.images && p.images.hero) {
        imgHtml = `<img src="${p.images.hero}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover;">`;
    } else {
        imgHtml = `
            <div class="prop-house-icon">${p.icon}</div>
            <div class="prop-style-tag">${capitalize(p.type)}</div>
        `;
    }

    const div = document.createElement('article');
    div.className = 'property-card';
    div.style.animationDelay = `${Math.min(delay * 0.07, 0.5)}s`;
    if (p.images && p.images.hero) div.dataset.bgImage = p.images.hero;
    div.setAttribute('role', 'listitem');
    div.setAttribute('tabindex', '0');
    div.setAttribute('aria-label', `${p.name}, ${formatPrice(p.price)}, ${p.beds} bedrooms`);

    div.innerHTML = `
        <div class="prop-img-wrap">
            <div class="prop-img-placeholder ${p.colorClass}">
                ${imgHtml}
            </div>
            <div class="prop-badges">${badgesHtml}</div>
            <div class="prop-actions">
                <button class="prop-action-btn ${isFav ? 'favorited' : ''}" 
                    data-id="${p.id}" 
                    aria-label="${isFav ? 'Remove from favourites' : 'Add to favourites'}"
                    onclick="toggleFav(event, ${p.id}, this)">
                    ${isFav ? '❤' : '♡'}
                </button>
            </div>
            <button class="btn btn-accent btn-sm prop-tour-btn" 
                onclick="openModal(${p.id})" 
                aria-label="View ${p.name}">
                Quick View
            </button>
        </div>
        <div class="prop-body">
            <div class="prop-type-row">
                <span class="prop-type-tag">${capitalize(p.type)}</span>
                <span class="prop-rating">
                    <span class="star" aria-hidden="true">★</span>
                    <span>${p.rating} (${p.reviews})</span>
                </span>
            </div>
            <div class="prop-name" title="${p.name}">${p.name}</div>
            <div class="prop-location">${p.location}</div>
            <div class="prop-features">
                <span class="prop-feat">${p.beds} Beds</span>
                <span class="prop-feat">${p.baths} Baths</span>
                <span class="prop-feat">${p.size} sqm</span>
                <span class="prop-feat">${p.garage} Garage</span>
            </div>
            <div class="prop-footer">
                <div>
                    <div class="prop-price">${formatPrice(p.price)}</div>
                    <div class="prop-price-sub">Yield: ${p.rentalYield}%</div>
                </div>
                <button class="btn btn-primary btn-sm" onclick="openModal(${p.id})" aria-label="View details for ${p.name}">
                    View Details
                </button>
            </div>
        </div>
    `;

    div.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(p.id);
        }
    });

    return div;
}

function initListingsHoverBackdrop() {
    const listings = document.getElementById('listings');
    const grid = document.getElementById('properties-grid');
    if (!listings || !grid) return;
    let bgRequestId = 0;

    const clearActiveCard = () => {
        grid.classList.remove('isolate-hover');
        grid.querySelectorAll('.property-card.is-active-card').forEach(card => {
            card.classList.remove('is-active-card');
        });
    };

    const setActiveCard = card => {
        if (!card || !grid.contains(card)) return;
        grid.classList.add('isolate-hover');
        grid.querySelectorAll('.property-card.is-active-card').forEach(active => {
            if (active !== card) active.classList.remove('is-active-card');
        });
        card.classList.add('is-active-card');
    };

    const clearBackground = () => {
        bgRequestId += 1;
        clearActiveCard();
        listings.classList.remove('has-hover-bg');
        listings.style.removeProperty('--listings-hover-bg');
        listings.style.removeProperty('background-image');
        delete listings.dataset.activeBg;
    };

    const setBackground = card => {
        if (!card || !grid.contains(card)) return;
        setActiveCard(card);
        const img = card.dataset.bgImage;
        if (!img) {
            clearBackground();
            return;
        }

        if (listings.dataset.activeBg === img) {
            listings.classList.add('has-hover-bg');
            return;
        }

        const requestId = ++bgRequestId;
        const preloader = new Image();
        preloader.onload = () => {
            if (requestId !== bgRequestId) return;
            listings.style.backgroundImage = `url("${img}")`;
            listings.dataset.activeBg = img;
            listings.classList.add('has-hover-bg');
        };
        preloader.onerror = () => {
            if (requestId !== bgRequestId) return;
            clearBackground();
        };
        preloader.src = img;
    };

    grid.addEventListener('pointerover', e => {
        const card = e.target.closest('.property-card');
        if (card) setBackground(card);
    });

    grid.addEventListener('pointerleave', () => {
        clearBackground();
    });

    grid.addEventListener('focusin', e => {
        const card = e.target.closest('.property-card');
        if (card) setBackground(card);
    });

    grid.addEventListener('focusout', e => {
        if (!grid.contains(e.relatedTarget)) clearBackground();
    });
}

function initFeaturedGateway() {
    const section = document.getElementById('featured-section');
    const header = document.getElementById('featured-header');
    const intro = document.getElementById('featured-intro');
    const content = document.getElementById('featured-content');
    const bgWrap = document.getElementById('featured-bg-video-wrap');
    const bgVideo = document.getElementById('featured-bg-video');
    if (!section || !intro || !content) return;

    section.classList.remove('video-bg-active');
    if (header) header.classList.add('hidden');
    if (bgWrap) bgWrap.classList.add('hidden');
    if (bgVideo) {
        bgVideo.pause();
        bgVideo.currentTime = 0;
    }
    if (featuredRevealTimer) {
        clearTimeout(featuredRevealTimer);
        featuredRevealTimer = null;
    }

    intro.classList.remove('is-fading');
    intro.classList.remove('hidden');
    content.classList.add('hidden');
}

function openRareCoastalListings() {
    const section = document.getElementById('featured-section');
    const header = document.getElementById('featured-header');
    const intro = document.getElementById('featured-intro');
    const content = document.getElementById('featured-content');
    const bgWrap = document.getElementById('featured-bg-video-wrap');
    const bgVideo = document.getElementById('featured-bg-video');
    if (!section || !intro || !content) return;
    if (intro.classList.contains('is-fading')) return;

    const introVideo = intro.querySelector('video');
    if (introVideo) introVideo.pause();

    intro.classList.add('is-fading');
    featuredRevealTimer = setTimeout(() => {
        intro.classList.remove('is-fading');
        intro.classList.add('hidden');
        if (header) header.classList.remove('hidden');
        content.classList.remove('hidden');
        section.classList.remove('video-bg-active');

        if (bgWrap) bgWrap.classList.add('hidden');
        if (bgVideo) {
            bgVideo.pause();
            bgVideo.currentTime = 0;
        }

        content.scrollIntoView({ behavior: 'smooth', block: 'start' });
        featuredRevealTimer = null;
    }, 1000);
}

function openEkuboDriveVideo() {
    const modal = document.getElementById('ekubo-video-modal');
    const video = document.getElementById('ekubo-drive-video');
    const source = document.getElementById('ekubo-drive-video-source');
    const downloadLink = document.getElementById('ekubo-video-download-link');
    if (!modal || !video || !source) return;

    const mp4Path = 'images/ekubo-1364/drive-through-ekubo.mp4';
    const movPath = 'images/ekubo-1364/drive-through-ekubo.mov';
    source.src = mp4Path;
    if (downloadLink) downloadLink.href = mp4Path;
    video.load();

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
            showToast('Autoplay blocked or unsupported. Use Play, Open In New Tab, or Download.', 'info');
        });
    }
}

function openEkuboVideoInNewTab() {
    const mp4Path = 'images/ekubo-1364/drive-through-ekubo.mp4';
    const movPath = 'images/ekubo-1364/drive-through-ekubo.mov';
    const testVideo = document.createElement('video');
    const openPath = testVideo.canPlayType('video/mp4') ? mp4Path : movPath;
    window.open(openPath, '_blank', 'noopener,noreferrer');
}

function closeEkuboDriveVideo() {
    const modal = document.getElementById('ekubo-video-modal');
    const video = document.getElementById('ekubo-drive-video');
    if (!modal || !video) return;

    video.pause();
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

function updateCounts() {
    const types = ['house','apartment','villa','penthouse','estate'];
    const all = PROPERTIES.filter(p => !p.hideFromListings && matchesSearch(p));
    document.getElementById('count-all').textContent = all.length;
    types.forEach(t => {
        const el = document.getElementById('count-' + t);
        if (el) el.textContent = PROPERTIES.filter(p => !p.hideFromListings && p.type === t && matchesSearch(p)).length;
    });
}

function badgeLabel(b) {
    const map = { new: 'New', hot: 'Hot', featured: 'Featured', reduced: 'Reduced', sold: 'Sold' };
    return map[b] || b;
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function formatPrice(n) {
    if (n >= 1000000) return 'R ' + (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1) + 'M';
    return 'R ' + n.toLocaleString('en-ZA');
}

/* ═══════════════════════════  FAVOURITES  ════════════════════════════════ */

function toggleFav(e, id, btn) {
    e.stopPropagation();
    if (favorites.has(id)) {
        favorites.delete(id);
        btn.classList.remove('favorited');
        btn.innerHTML = '\u2661';
        btn.setAttribute('aria-label', 'Add to favourites');
        showToast('Removed from saved properties', 'info');
    } else {
        favorites.add(id);
        btn.classList.add('favorited');
        btn.innerHTML = '\u2764';
        btn.setAttribute('aria-label', 'Remove from favourites');
        showToast('Saved to your list!', 'success');
    }
    localStorage.setItem('lxe_favorites', JSON.stringify([...favorites]));
}

function toggleFeaturedFav(btn) {
    const wasFav = btn.textContent.includes('Saved');
    btn.innerHTML = wasFav ? '\u2661 Save' : '\u2764 Saved';
    showToast(wasFav ? 'Removed from saved' : 'Saved to your list!', wasFav ? 'info' : 'success');
}

function toggleModalFav() {
    if (!activeModal) return;
    const btn = document.getElementById('modal-fav-btn');
    const isFav = favorites.has(activeModal.id);
    if (isFav) {
        favorites.delete(activeModal.id);
        btn.innerHTML = '\u2661 Save';
        showToast('Removed from saved', 'info');
    } else {
        favorites.add(activeModal.id);
        btn.innerHTML = '\u2764 Saved';
        showToast('Saved to your list!', 'success');
    }
    localStorage.setItem('lxe_favorites', JSON.stringify([...favorites]));
}

function shareProperty(e, id) {
    e.stopPropagation();
    const p = PROPERTIES.find(x => x.id === id);
    if (navigator.share) {
        navigator.share({ title: p.name, text: `Check out ${p.name} — ${formatPrice(p.price)}`, url: window.location.href });
    } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('Link copied to clipboard', 'success');
        }).catch(() => {
            showToast('Share: ' + window.location.href, 'info');
        });
    }
}

/* ═══════════════════════════  MODAL  ════════════════════════════════════ */

const GALLERY_ICONS = ['Home','Garden','Living','Kitchen','Bath','Outdoor','View','Bedroom'];

function openModal(id) {
    const p = PROPERTIES.find(x => x.id === id);
    if (!p) return;
    activeModal  = p;
    galleryIndex = 0;

    // Gallery
    updateGallery(p);
    document.getElementById('modal-gallery-badge').textContent = p.badges.map(badgeLabel).join(' · ') || 'Property';

    // Overview
    document.getElementById('modal-title-text').textContent = p.name;
    document.getElementById('modal-loc').innerHTML          = p.location;
    document.getElementById('modal-price').textContent      = formatPrice(p.price);
    document.getElementById('modal-price-note').textContent = 'Negotiable · Transfer included';
    document.getElementById('modal-beds').textContent       = p.beds;
    document.getElementById('modal-baths').textContent      = p.baths;
    document.getElementById('modal-size').textContent       = p.size;
    document.getElementById('modal-garage').textContent     = p.garage;
    document.getElementById('modal-desc').textContent       = p.desc;
    document.getElementById('modal-fav-btn').innerHTML      = favorites.has(p.id) ? '\u2764 Saved' : '\u2661 Save';

    // Amenities
    document.getElementById('modal-amenities').innerHTML = p.amenities.map(a =>
        `<div class="modal-amenity"><span class="amenity-check" aria-hidden="true">&#9632;</span>${a}</div>`
    ).join('');

    // Floor plan
    document.getElementById('floorplan-grid').innerHTML = p.rooms.map(r =>
        `<div class="floorplan-room">
            <div class="floorplan-room-name">${r.name}</div>
            <div class="floorplan-room-size">${r.size}</div>
        </div>`
    ).join('');

    // Investment analysis
    const loanAmt   = p.price * 0.8;
    const monthRate = 0.095 / 12;
    const months    = 240;
    const monthly   = loanAmt * monthRate * Math.pow(1 + monthRate, months) / (Math.pow(1 + monthRate, months) - 1);
    const grossRent = (p.price * p.rentalYield / 100) / 12;
    document.getElementById('modal-invest-content').innerHTML = `
        <div class="calc-breakdown">
            <div class="calc-breakdown-row"><span class="cbd-label">Rental Yield</span><span class="cbd-val" style="color:var(--accent)">${p.rentalYield}% p.a.</span></div>
            <div class="calc-breakdown-row"><span class="cbd-label">Est. Monthly Rent</span><span class="cbd-val">${formatPrice(Math.round(grossRent))}</span></div>
            <div class="calc-breakdown-row"><span class="cbd-label">Bond Repayment (20yr @ 9.5%)</span><span class="cbd-val">${formatPrice(Math.round(monthly))}/mo</span></div>
            <div class="calc-breakdown-row"><span class="cbd-label">5-Year Appreciation (est.)</span><span class="cbd-val" style="color:var(--accent)">~${Math.round((p.priceHistory[3] / p.priceHistory[0] - 1) * 100)}% growth</span></div>
            <div class="calc-breakdown-row"><span class="cbd-label">Estimated Value 2029</span><span class="cbd-val">${formatPrice(Math.round(p.price * 1.35))}</span></div>
        </div>
        <div style="margin-top:20px;padding:14px;background:rgba(16,185,129,.08);border:1px solid rgba(16,185,129,.2);border-radius:10px;font-size:.85em;color:var(--text-secondary)">
            <strong style="color:var(--accent)">Analyst Note:</strong> Based on current market trends in ${p.location.split(',')[0]}, 
            this property shows ${p.rentalYield > 7 ? 'strong' : 'solid'} rental fundamentals with ${p.rentalYield > 8 ? 'excellent' : 'good'} yield potential.
        </div>
    `;

    // Tabs reset
    document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.modal-tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelector('.modal-tab[data-panel="overview"]').classList.add('active');
    document.getElementById('panel-overview').classList.add('active');

    document.getElementById('prop-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function updateGallery(p) {
    const galleryEl = document.getElementById('modal-gallery-icon');
    
    // Check if property has real images
    if (p.images && p.images.gallery && p.images.gallery.length > 0) {
        const imageUrl = p.images.gallery[galleryIndex];
        galleryEl.src = imageUrl;
        galleryEl.alt = `${p.name} gallery image ${galleryIndex + 1}`;
        
        // Update dots based on gallery length
        const dotsEl = document.getElementById('gallery-dots');
        dotsEl.innerHTML = p.images.gallery.map((_, i) =>
            `<div class="gallery-dot ${i === galleryIndex ? 'active' : ''}" onclick="setGallery(${i})"></div>`
        ).join('');
    } else {
        const label = encodeURIComponent(`${p.name}\n${capitalize(p.type)} · ${p.size} sqm`);
        galleryEl.src = `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720"><rect width="1200" height="720" fill="%23f8f6f3"/><rect x="36" y="36" width="1128" height="648" fill="none" stroke="%23d4bfa8" stroke-width="2"/><text x="600" y="330" text-anchor="middle" fill="%239a7d65" font-family="Georgia, serif" font-size="34">Kassini Kings</text><text x="600" y="390" text-anchor="middle" fill="%231a1a1a" font-family="Arial, sans-serif" font-size="28">${label}</text></svg>`;
        galleryEl.alt = `${p.name} placeholder image`;
        const icons = [p.icon, ...GALLERY_ICONS].slice(0, 5);

        // Update dots based on icon count
        const dotsEl = document.getElementById('gallery-dots');
        dotsEl.innerHTML = icons.map((_, i) =>
            `<div class="gallery-dot ${i === galleryIndex ? 'active' : ''}" onclick="setGallery(${i})"></div>`
        ).join('');
    }
}

function galleryNav(dir) {
    if (!activeModal) return;
    
    let itemCount = 5; // Default emoji gallery count
    if (activeModal.images && activeModal.images.gallery) {
        itemCount = activeModal.images.gallery.length;
    } else {
        itemCount = [activeModal.icon, ...GALLERY_ICONS].length; // includes all icon options
    }
    
    galleryIndex = (galleryIndex + dir + itemCount) % itemCount;
    updateGallery(activeModal);
}

function setGallery(i) {
    galleryIndex = i;
    if (activeModal) updateGallery(activeModal);
}

function closeModal() {
    document.getElementById('prop-modal').classList.add('hidden');
    document.body.style.overflow = '';
    activeModal = null;
}

const ENQUIRY_EMAIL_RECIPIENTS = [
    'ayanda@alphaestates.co.za',
    'mrzwalo@gmail.com'
];

function openEnquiryEmail(enquiryType) {
    const propertyName = activeModal ? activeModal.name : 'Property Enquiry';
    const propertyLocation = activeModal ? activeModal.location : 'N/A';
    const actionLabel = enquiryType === 'booking' ? 'Request a Booking' : 'Book Now';
    const subject = `${actionLabel}: ${propertyName}`;
    const body = [
        'Hello Alpha Estates,',
        '',
        `I would like to ${enquiryType === 'booking' ? 'request a booking' : 'book now'} for this property.`,
        '',
        `Property: ${propertyName}`,
        `Location: ${propertyLocation}`,
        '',
        'Preferred date/time:',
        'Phone number:',
        '',
        'Thank you.'
    ].join('\n');

    const mailtoUrl = `mailto:${ENQUIRY_EMAIL_RECIPIENTS.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
}

function sendContactEnquiry() {
    openEnquiryEmail('book-now');
}

function sendBookingRequest() {
    openEnquiryEmail('booking');
}

// Close modal on backdrop click
document.getElementById('prop-modal').addEventListener('click', e => {
    if (e.target === document.getElementById('prop-modal')) closeModal();
});

document.getElementById('ekubo-video-modal').addEventListener('click', e => {
    if (e.target === document.getElementById('ekubo-video-modal')) closeEkuboDriveVideo();
});

const ekuboVideoEl = document.getElementById('ekubo-drive-video');
if (ekuboVideoEl) {
    ekuboVideoEl.addEventListener('error', () => {
        showToast('This browser may not decode MOV. Try Open In New Tab or Download.', 'warning');
    });
}

// Modal tab switching
document.addEventListener('click', e => {
    const tab = e.target.closest('.modal-tab');
    if (!tab) return;
    const panel = tab.dataset.panel;
    document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.modal-tab-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('panel-' + panel).classList.add('active');
});

// ESC to close modal
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && activeModal) closeModal();
    if (e.key === 'Escape') closeEkuboDriveVideo();
});

// Featured modal
function openFeaturedModal() {
    openModal(10);
}

/* ═══════════════════════════  MORTGAGE CALCULATOR  ══════════════════════ */

function initCalculator() {
    const inputs = ['calc-price','calc-deposit','calc-term','calc-rate'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        el.addEventListener('input', updateCalc);
    });
    updateCalc();
}

function updateCalc() {
    const price   = Number(document.getElementById('calc-price').value);
    const deposit = Number(document.getElementById('calc-deposit').value) / 100;
    const term    = Number(document.getElementById('calc-term').value);
    const rate    = Number(document.getElementById('calc-rate').value) / 100;

    const depositAmt  = price * deposit;
    const loan        = price - depositAmt;
    const monthRate   = rate / 12;
    const months      = term * 12;
    const monthly     = loan > 0
        ? loan * monthRate * Math.pow(1 + monthRate, months) / (Math.pow(1 + monthRate, months) - 1)
        : 0;
    const totalRepay  = monthly * months;
    const totalInt    = totalRepay - loan;

    document.getElementById('calc-price-val').textContent   = formatPrice(price);
    document.getElementById('calc-deposit-val').textContent = formatPrice(depositAmt) + ` (${Math.round(deposit * 100)}%)`;
    document.getElementById('calc-term-val').textContent    = term + ' year' + (term === 1 ? '' : 's');
    document.getElementById('calc-rate-val').textContent    = (rate * 100).toFixed(1) + '%';
    document.getElementById('calc-monthly').textContent     = formatPrice(Math.round(monthly));
    document.getElementById('calc-total-label').textContent = 'Total repayment: ' + formatPrice(Math.round(totalRepay));
    document.getElementById('cbd-loan').textContent         = formatPrice(Math.round(loan));
    document.getElementById('cbd-interest').textContent     = formatPrice(Math.round(totalInt));

    const incomeNeeded = monthly / 0.3;
    document.getElementById('cbd-tip').textContent = 'Need ~' + formatPrice(Math.round(incomeNeeded)) + '/mo income';

    // Update range gradient fill
    ['calc-price','calc-deposit','calc-term','calc-rate'].forEach(id => {
        const el = document.getElementById(id);
        const pct = ((el.value - el.min) / (el.max - el.min)) * 100;
        el.style.background = `linear-gradient(to right, var(--accent,#b8977e) 0%, var(--accent,#b8977e) ${pct}%, #e5e5e5 ${pct}%, #e5e5e5 100%)`;
    });
}

/* ═══════════════════════════  LIFESTYLE QUIZ  ════════════════════════════ */

function initQuiz() {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    // Option selection
    container.addEventListener('click', e => {
        const opt = e.target.closest('.quiz-option');
        if (!opt) return;
        const step = opt.closest('.quiz-step');
        step.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        quizAnswers[step.dataset.step] = opt.dataset.value;
    });

    // Keyboard selection for quiz options
    container.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            const opt = e.target.closest('.quiz-option');
            if (opt) { e.preventDefault(); opt.click(); }
        }
    });

    // Next/back buttons
    container.addEventListener('click', e => {
        const nextBtn = e.target.closest('.quiz-next');
        const backBtn = e.target.closest('.quiz-back');
        if (nextBtn) showQuizStep(nextBtn.dataset.next);
        if (backBtn) showQuizStep(backBtn.dataset.back);
    });

    // Finish
    const finishBtn = document.getElementById('btn-quiz-finish');
    if (finishBtn) finishBtn.addEventListener('click', () => showQuizResult());

    // Restart
    const restartBtn = document.getElementById('btn-quiz-restart');
    if (restartBtn) restartBtn.addEventListener('click', () => {
        quizAnswers = {};
        document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
        showQuizStep('1');
    });
}

function showQuizStep(stepNum) {
    document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
    const target = document.querySelector(`.quiz-step[data-step="${stepNum}"]`);
    if (target) target.classList.add('active');
}

function showQuizResult() {
    // Simple scoring based on answers
    const a1 = quizAnswers['1'] || 'space';
    const a3 = quizAnswers['3'] || 'family';
    const a4 = quizAnswers['4'] || 'budget-mid';

    let type = 'family';
    if (a1 === 'urban' || a3 === 'single' || a3 === 'couple') type = 'urban';
    else if (a1 === 'luxury' || a4 === 'budget-ultra' || a4 === 'budget-high') type = 'estate';
    else if (a1 === 'value') type = 'investor';
    else type = 'family';

    const result = QUIZ_RESULTS[type];
    document.getElementById('quiz-result-content').innerHTML = `
        <div class="quiz-result-icon" aria-hidden="true">${result.icon}</div>
        <div class="quiz-result-type">${result.type}</div>
        <p class="quiz-result-desc">${result.desc}</p>
        <div class="quiz-result-tags" role="list">
            ${result.tags.map(t => `<span class="quiz-tag" role="listitem">${t}</span>`).join('')}
        </div>
    `;
    showQuizStep('result');
}

/* ═══════════════════════════  NEIGHBOURHOOD  ════════════════════════════ */

function initNeighbourhood() {
    loadHoodScores(document.querySelector('[data-hood="Margate"]'));
}

function loadHoodScores(btn) {
    const area = btn.dataset.hood;
    const data = HOOD_DATA[area];
    if (!data) return;

    // Update buttons
    document.querySelectorAll('[data-hood]').forEach(b => {
        const isActive = b.dataset.hood === area;
        b.className = isActive ? 'hood-area-btn active' : 'hood-area-btn';
    });

    document.getElementById('hood-area-title').textContent = data.title;

    const container = document.getElementById('hood-scores');
    container.innerHTML = data.scores.map(s => `
        <div class="hood-score-card" role="region" aria-label="${s.label} score for ${area}">
            <div class="hood-score-header">
                <div class="hood-score-title">
                    <div class="hood-score-icon ${s.cls}" aria-hidden="true">${s.icon}</div>
                    ${s.label}
                </div>
                <span class="hood-score-val" aria-label="${s.score} out of 100">${s.score}/100</span>
            </div>
            <div class="hood-score-bar-wrap" role="progressbar" aria-valuenow="${s.score}" aria-valuemin="0" aria-valuemax="100">
                <div class="hood-score-bar ${s.barCls}" style="width:0" data-width="${s.score}%"></div>
            </div>
        </div>
    `).join('');

    // Animate bars
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            container.querySelectorAll('.hood-score-bar').forEach(bar => {
                bar.style.width = bar.dataset.width;
            });
        });
    });
}

/* ═══════════════════════════  LEAFLET MAP  ═══════════════════════════════ */

const NEIGHBOURHOOD_COORDS = {
    Margate:       { lat: -30.8649, lng: 30.3668, label: 'Margate' },
    PortShepstone: { lat: -30.7377, lng: 30.4534, label: 'Port Shepstone' },
    PortEdward:    { lat: -31.0528, lng: 30.2285, label: 'Port Edward' },
    Southbroom:    { lat: -30.9275, lng: 30.3149, label: 'Southbroom' },
    Ramsgate:      { lat: -30.9014, lng: 30.3369, label: 'Ramsgate' },
};

function initMapPins() {
    if (typeof L === 'undefined') {
        // Leaflet CDN not yet loaded — retry once it has
        setTimeout(initMapPins, 300);
        return;
    }

    const mapEl = document.getElementById('hood-map');
    if (!mapEl) return;

    // Centre the map on the South Coast area
    const map = L.map('hood-map', {
        center: [-30.9, 30.34],
        zoom: 11,
        scrollWheelZoom: false,
        zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);

    // Custom pin icon matching site accent colour
    const accentIcon = L.divIcon({
        className: '',
        html: '<div style="width:14px;height:14px;background:var(--accent,#b8860b);border:2px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,.35);cursor:pointer;"></div>',
        iconSize: [14, 14],
        iconAnchor: [7, 7],
        popupAnchor: [0, -10],
    });

    Object.entries(NEIGHBOURHOOD_COORDS).forEach(([area, { lat, lng, label }]) => {
        const marker = L.marker([lat, lng], { icon: accentIcon, title: label })
            .addTo(map)
            .bindPopup(`<strong style="font-family:var(--font-heading,serif)">${label}</strong>`);

        marker.on('click', () => {
            const btn = document.querySelector(`[data-hood="${area}"]`);
            if (btn) {
                loadHoodScores(btn);
                showToast('Showing scores for ' + label, 'info');
            }
        });
    });
}

/* ═══════════════════════════  COUNTER ANIMATION  ════════════════════════ */

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
    const target   = Number(el.dataset.target);
    const duration = 1800;
    const start    = performance.now();

    function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

/* ═══════════════════════════  BACK TO TOP  ═══════════════════════════════ */

function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ═══════════════════════════  TOAST  ════════════════════════════════════ */

function showToast(msg, type) {
    const toast   = document.getElementById('toast');
    const icon    = document.getElementById('toast-icon');
    const msgEl   = document.getElementById('toast-msg');
    const icons   = { success: '\u2713', info: '\u2022', error: '\u2717' };

    msgEl.textContent = msg;
    icon.textContent  = icons[type] || '\u2022';
    toast.className   = 'show toast-' + (type || 'info');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.className = toast.className.replace('show', '').trim();
    }, 3200);
}

/* ═══════════════════════════  FILTER HELPER  ════════════════════════════ */

function filterByType(type) {
    currentFilter = type;
    document.querySelectorAll('.filter-tab').forEach(t => {
        const isActive = t.dataset.filter === type;
        t.classList.toggle('active', isActive);
        t.setAttribute('aria-selected', isActive);
    });
    renderProperties();
}
