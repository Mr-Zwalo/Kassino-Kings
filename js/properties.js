/* ── LuxeEstates — properties.js ───────────────────────────────────────────
   Interactive property website logic
   ─────────────────────────────────────────────────────────────────────────── */

'use strict';

/* ═══════════════════════════  DATA  ══════════════════════════════════════ */

const PROPERTIES = [
    {
        id: 1,
        name: 'The Skyline Penthouse',
        type: 'penthouse',
        location: 'Mbabane Heights, Mbabane',
        price: 4200000,
        beds: 4, baths: 3, size: 280, garage: 2,
        rating: 4.9, reviews: 14,
        badges: ['featured', 'new'],
        icon: '🌆',
        colorClass: 'prop-color-1',
        desc: 'Breathtaking panoramic views over Mbabane city from this stunning penthouse. Floor-to-ceiling glass, Italian marble and a rooftop terrace make this the most sought-after residence in the capital.',
        amenities: ['Swimming Pool','Rooftop Terrace','Concierge Service','Smart Home System','Wine Cellar','Home Theatre','Gym Access','Underground Parking','24/7 Security','Generator Backup','Solar Panels','Air Conditioning'],
        rooms: [{name:'Master Suite',size:'52 sqm'},{name:'Bedroom 2',size:'34 sqm'},{name:'Bedroom 3',size:'28 sqm'},{name:'Bedroom 4',size:'22 sqm'},{name:'Open Lounge',size:'68 sqm'},{name:'Kitchen',size:'32 sqm'}],
        rentalYield: 6.8,
        priceHistory: [3200000, 3600000, 3900000, 4200000],
        featured: true
    },
    {
        id: 2,
        name: 'Ezulwini Garden Villa',
        type: 'villa',
        location: 'Ezulwini Valley',
        price: 3750000,
        beds: 5, baths: 4, size: 380, garage: 3,
        rating: 4.8, reviews: 22,
        badges: ['hot'],
        icon: '🏖',
        colorClass: 'prop-color-3',
        desc: 'Nestled in the lush Ezulwini Valley, this magnificent villa offers a private oasis with an infinity pool, koi pond and mature gardens. The perfect blend of nature and refined comfort.',
        amenities: ['Infinity Pool','Koi Pond','Private Garden','Outdoor Kitchen','Staff Quarters','Borehole Water','Solar Power','3-Car Garage','Guest Cottage','Double Volume Lounge','Study/Library','Fireplace'],
        rooms: [{name:'Master Suite',size:'65 sqm'},{name:'Guest Bedroom',size:'38 sqm'},{name:'Bedroom 3',size:'32 sqm'},{name:'Bedroom 4',size:'28 sqm'},{name:'Bedroom 5',size:'24 sqm'},{name:'Entertainment',size:'55 sqm'}],
        rentalYield: 5.9,
        priceHistory: [2800000, 3100000, 3400000, 3750000],
        featured: false
    },
    {
        id: 3,
        name: 'Riverside Family Home',
        type: 'house',
        location: 'Lobamba, Ezulwini',
        price: 1850000,
        beds: 4, baths: 3, size: 220, garage: 2,
        rating: 4.7, reviews: 18,
        badges: ['new'],
        icon: '🏠',
        colorClass: 'prop-color-4',
        desc: 'A warm and welcoming family home on a spacious plot with direct river frontage. Modern open-plan kitchen, large back garden perfect for children, and a cosy wrap-around stoep.',
        amenities: ['River Frontage','Swimming Pool','Large Garden','Double Garage','Staff Quarters','Borehole Water','Backup Generator','Underfloor Heating','Fireplace','Study','Solar Geyser','Security System'],
        rooms: [{name:'Master Bedroom',size:'38 sqm'},{name:'Bedroom 2',size:'28 sqm'},{name:'Bedroom 3',size:'24 sqm'},{name:'Bedroom 4',size:'20 sqm'},{name:'Lounge/Dining',size:'48 sqm'},{name:'Kitchen',size:'22 sqm'}],
        rentalYield: 7.2,
        priceHistory: [1400000, 1550000, 1700000, 1850000],
        featured: false
    },
    {
        id: 4,
        name: 'City Centre Studio Plus',
        type: 'apartment',
        location: 'Swazi Plaza, Mbabane',
        price: 480000,
        beds: 1, baths: 1, size: 58, garage: 1,
        rating: 4.5, reviews: 31,
        badges: ['reduced'],
        icon: '🏢',
        colorClass: 'prop-color-5',
        desc: 'Smart city living at its best. This compact but clever studio-plus on the 8th floor boasts city views, a fully fitted kitchen, and access to building amenities — perfect for young professionals.',
        amenities: ['City Views','Secure Parking','Gym Access','Rooftop Lounge','Fibre Internet','Concierge','Intercom Security','Backup Power','Air Conditioning','Storeroom'],
        rooms: [{name:'Open Studio',size:'38 sqm'},{name:'Kitchenette',size:'10 sqm'},{name:'Bathroom',size:'7 sqm'},{name:'Balcony',size:'6 sqm'}],
        rentalYield: 9.4,
        priceHistory: [380000, 410000, 450000, 480000],
        featured: false
    },
    {
        id: 5,
        name: 'Manzini Executive House',
        type: 'house',
        location: 'Greenfields, Manzini',
        price: 1200000,
        beds: 3, baths: 2, size: 175, garage: 2,
        rating: 4.6, reviews: 12,
        badges: ['new'],
        icon: '🏡',
        colorClass: 'prop-color-2',
        desc: 'An immaculate executive home in the desirable Greenfields suburb. Newly renovated with contemporary finishes, a modern kitchen and a manicured garden with a splash pool.',
        amenities: ['Splash Pool','Double Garage','Alarm System','Modern Kitchen','Granite Countertops','Built-in Braai','Garden Irrigation','Solar Geyser','Fibre Ready','Storeroom'],
        rooms: [{name:'Master Bedroom',size:'32 sqm'},{name:'Bedroom 2',size:'24 sqm'},{name:'Bedroom 3',size:'20 sqm'},{name:'Lounge',size:'36 sqm'},{name:'Kitchen/Dining',size:'28 sqm'}],
        rentalYield: 8.1,
        priceHistory: [950000, 1050000, 1150000, 1200000],
        featured: false
    },
    {
        id: 6,
        name: 'Mountain Retreat Estate',
        type: 'estate',
        location: 'Piggs Peak, Eswatini',
        price: 6800000,
        beds: 6, baths: 5, size: 520, garage: 4,
        rating: 4.9, reviews: 8,
        badges: ['featured'],
        icon: '🏔',
        colorClass: 'prop-color-1',
        desc: 'A one-of-a-kind mountain estate offering complete privacy and spectacular views of the Piggs Peak forest. Features a private helipad, equestrian facilities, and a 10-car collection garage.',
        amenities: ['Private Helipad','Equestrian Facilities','Heated Pool','Wine Cellar','Staff Village','Solar Farm','Borehole Water','Home Cinema','Trophy Room','Gym & Spa','10-Car Garage','Tennis Court'],
        rooms: [{name:'Master Suite',size:'80 sqm'},{name:'Guest Master',size:'60 sqm'},{name:'Bedroom 3',size:'40 sqm'},{name:'Bedroom 4',size:'38 sqm'},{name:'Bedroom 5',size:'34 sqm'},{name:'Bedroom 6',size:'30 sqm'}],
        rentalYield: 4.2,
        priceHistory: [5200000, 5800000, 6200000, 6800000],
        featured: true
    },
    {
        id: 7,
        name: 'Lusito Luxury Townhouse',
        type: 'townhouse',
        location: 'Lusito Lane, Mbabane',
        price: 2100000,
        beds: 3, baths: 3, size: 195, garage: 2,
        rating: 4.7, reviews: 16,
        badges: [],
        icon: '🏘',
        colorClass: 'prop-color-6',
        desc: 'A stylish three-storey townhouse in a secure estate. Rooftop entertainment area, private courtyard garden, and premium German kitchen appliances make this a lock-up-and-go dream.',
        amenities: ['Rooftop Terrace','Private Courtyard','German Appliances','Smart Home','Underfloor Heating','Double Garage','Communal Pool','Fibre Internet','24/7 Security','Solar Power'],
        rooms: [{name:'Master Suite',size:'42 sqm'},{name:'Bedroom 2',size:'30 sqm'},{name:'Bedroom 3',size:'26 sqm'},{name:'Rooftop Deck',size:'45 sqm'},{name:'Open Plan Living',size:'52 sqm'}],
        rentalYield: 7.5,
        priceHistory: [1700000, 1850000, 2000000, 2100000],
        featured: false
    },
    {
        id: 8,
        name: 'Waterfront Apartment 14B',
        type: 'apartment',
        location: 'Ezulwini Dam, Lobamba',
        price: 1450000,
        beds: 2, baths: 2, size: 112, garage: 1,
        rating: 4.8, reviews: 24,
        badges: ['new', 'hot'],
        icon: '🌊',
        colorClass: 'prop-color-3',
        desc: 'Wake up to shimmering water views every morning. This beautifully appointed 2-bedroom apartment sits on the water\'s edge with a private jetty, fishing rights and sunset terrace.',
        amenities: ['Private Jetty','Fishing Rights','Sunset Terrace','Backup Generator','Fibre Internet','Secure Parking','Communal Braai Area','Security Guard','Air Conditioning','Water Views'],
        rooms: [{name:'Master Bedroom',size:'30 sqm'},{name:'Bedroom 2',size:'22 sqm'},{name:'Lounge/Dining',size:'36 sqm'},{name:'Kitchen',size:'14 sqm'},{name:'Terrace',size:'18 sqm'}],
        rentalYield: 8.8,
        priceHistory: [1100000, 1200000, 1350000, 1450000],
        featured: false
    }
];

const HOOD_DATA = {
    Mbabane: {
        title: '📍 Mbabane, Capital City',
        scores: [
            { label: 'Education', icon: '🎓', cls: 'hi-education', barCls: 'bar-blue', score: 88 },
            { label: 'Safety & Security', icon: '🛡', cls: 'hi-safety', barCls: 'bar-accent', score: 74 },
            { label: 'Transport Links', icon: '🚌', cls: 'hi-transport', barCls: '', score: 82 },
            { label: 'Entertainment', icon: '🎭', cls: 'hi-entertainment', barCls: 'bar-purple', score: 76 },
            { label: 'Nature & Parks', icon: '🌿', cls: 'hi-nature', barCls: 'bar-green', score: 65 }
        ]
    },
    Ezulwini: {
        title: '📍 Ezulwini Valley',
        scores: [
            { label: 'Education', icon: '🎓', cls: 'hi-education', barCls: 'bar-blue', score: 80 },
            { label: 'Safety & Security', icon: '🛡', cls: 'hi-safety', barCls: 'bar-accent', score: 85 },
            { label: 'Transport Links', icon: '🚌', cls: 'hi-transport', barCls: '', score: 70 },
            { label: 'Entertainment', icon: '🎭', cls: 'hi-entertainment', barCls: 'bar-purple', score: 90 },
            { label: 'Nature & Parks', icon: '🌿', cls: 'hi-nature', barCls: 'bar-green', score: 96 }
        ]
    },
    Manzini: {
        title: '📍 Manzini City',
        scores: [
            { label: 'Education', icon: '🎓', cls: 'hi-education', barCls: 'bar-blue', score: 78 },
            { label: 'Safety & Security', icon: '🛡', cls: 'hi-safety', barCls: 'bar-accent', score: 62 },
            { label: 'Transport Links', icon: '🚌', cls: 'hi-transport', barCls: '', score: 90 },
            { label: 'Entertainment', icon: '🎭', cls: 'hi-entertainment', barCls: 'bar-purple', score: 84 },
            { label: 'Nature & Parks', icon: '🌿', cls: 'hi-nature', barCls: 'bar-green', score: 58 }
        ]
    },
    Lobamba: {
        title: '📍 Lobamba Royal Village',
        scores: [
            { label: 'Education', icon: '🎓', cls: 'hi-education', barCls: 'bar-blue', score: 72 },
            { label: 'Safety & Security', icon: '🛡', cls: 'hi-safety', barCls: 'bar-accent', score: 92 },
            { label: 'Transport Links', icon: '🚌', cls: 'hi-transport', barCls: '', score: 60 },
            { label: 'Entertainment', icon: '🎭', cls: 'hi-entertainment', barCls: 'bar-purple', score: 68 },
            { label: 'Nature & Parks', icon: '🌿', cls: 'hi-nature', barCls: 'bar-green', score: 94 }
        ]
    },
    Matsapha: {
        title: '📍 Matsapha Industrial',
        scores: [
            { label: 'Education', icon: '🎓', cls: 'hi-education', barCls: 'bar-blue', score: 65 },
            { label: 'Safety & Security', icon: '🛡', cls: 'hi-safety', barCls: 'bar-accent', score: 58 },
            { label: 'Transport Links', icon: '🚌', cls: 'hi-transport', barCls: '', score: 95 },
            { label: 'Entertainment', icon: '🎭', cls: 'hi-entertainment', barCls: 'bar-purple', score: 50 },
            { label: 'Nature & Parks', icon: '🌿', cls: 'hi-nature', barCls: 'bar-green', score: 45 }
        ]
    }
};

const QUIZ_RESULTS = {
    estate: {
        icon: '🏰',
        type: 'The Estate Dweller',
        desc: 'You crave space, prestige and privacy. A sprawling estate or grand villa with private grounds would be your perfect match. Think infinity pools, manicured gardens and views that never get old.',
        tags: ['Villa', 'Estate', 'House', '4+ Beds']
    },
    urban: {
        icon: '🌆',
        type: 'The Urban Sophisticate',
        desc: 'City energy, world-class convenience. A penthouse or high-rise apartment with skyline views and walking access to everything is your ideal home.',
        tags: ['Penthouse', 'Apartment', 'City Centre', 'Modern']
    },
    family: {
        icon: '🏡',
        type: 'The Family Nester',
        desc: 'Warm spaces, room to grow, and a great school nearby. A family home or townhouse with a garden, safe neighbourhood and extra bedrooms is calling your name.',
        tags: ['House', 'Townhouse', '3–5 Beds', 'Safe Area']
    },
    investor: {
        icon: '📈',
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

/* ═══════════════════════════  INIT  ══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    renderProperties();
    updateCounts();
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
        document.getElementById('nav').style.background =
            window.scrollY > 20 ? 'rgba(10,10,10,.95)' : 'rgba(10,10,10,.85)';
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
    const list = getFilteredSorted();

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

    const div = document.createElement('article');
    div.className = 'property-card';
    div.style.animationDelay = `${Math.min(delay * 0.07, 0.5)}s`;
    div.setAttribute('role', 'listitem');
    div.setAttribute('tabindex', '0');
    div.setAttribute('aria-label', `${p.name}, ${formatPrice(p.price)}, ${p.beds} bedrooms`);

    div.innerHTML = `
        <div class="prop-img-wrap">
            <div class="prop-img-placeholder ${p.colorClass}">
                <div class="prop-house-icon">${p.icon}</div>
                <div class="prop-style-tag">${capitalize(p.type)}</div>
            </div>
            <div class="prop-badges">${badgesHtml}</div>
            <div class="prop-actions">
                <button class="prop-action-btn ${isFav ? 'favorited' : ''}" 
                    data-id="${p.id}" 
                    aria-label="${isFav ? 'Remove from favourites' : 'Add to favourites'}"
                    onclick="toggleFav(event, ${p.id}, this)">
                    ${isFav ? '❤️' : '🤍'}
                </button>
                <button class="prop-action-btn" 
                    aria-label="Share property"
                    onclick="shareProperty(event, ${p.id})">
                    🔗
                </button>
            </div>
            <button class="btn btn-accent btn-sm prop-tour-btn" 
                onclick="openModal(${p.id})" 
                aria-label="Open virtual tour for ${p.name}">
                🎬 Quick View
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
            <div class="prop-location"><span aria-hidden="true">📍</span>${p.location}</div>
            <div class="prop-features">
                <span class="prop-feat"><span class="prop-feat-icon" aria-hidden="true">🛏</span>${p.beds} Beds</span>
                <span class="prop-feat"><span class="prop-feat-icon" aria-hidden="true">🚿</span>${p.baths} Baths</span>
                <span class="prop-feat"><span class="prop-feat-icon" aria-hidden="true">📐</span>${p.size} sqm</span>
                <span class="prop-feat"><span class="prop-feat-icon" aria-hidden="true">🚗</span>${p.garage}</span>
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

function updateCounts() {
    const types = ['house','apartment','villa','penthouse','estate'];
    const all = PROPERTIES.filter(matchesSearch);
    document.getElementById('count-all').textContent = all.length;
    types.forEach(t => {
        const el = document.getElementById('count-' + t);
        if (el) el.textContent = PROPERTIES.filter(p => p.type === t && matchesSearch(p)).length;
    });
}

function badgeLabel(b) {
    const map = { new: '✨ New', hot: '🔥 Hot', featured: '⭐ Featured', reduced: '💥 Reduced', sold: '✅ Sold' };
    return map[b] || b;
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function formatPrice(n) {
    if (n >= 1000000) return 'E ' + (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1) + 'M';
    return 'E ' + n.toLocaleString('en-ZA');
}

/* ═══════════════════════════  FAVOURITES  ════════════════════════════════ */

function toggleFav(e, id, btn) {
    e.stopPropagation();
    if (favorites.has(id)) {
        favorites.delete(id);
        btn.classList.remove('favorited');
        btn.innerHTML = '🤍';
        btn.setAttribute('aria-label', 'Add to favourites');
        showToast('Removed from saved properties', 'info');
    } else {
        favorites.add(id);
        btn.classList.add('favorited');
        btn.innerHTML = '❤️';
        btn.setAttribute('aria-label', 'Remove from favourites');
        showToast('❤️ Saved to your list!', 'success');
    }
    localStorage.setItem('lxe_favorites', JSON.stringify([...favorites]));
}

function toggleFeaturedFav(btn) {
    const wasFav = btn.textContent.includes('❤');
    btn.innerHTML = wasFav ? '🤍 Save' : '❤️ Saved';
    showToast(wasFav ? 'Removed from saved' : '❤️ Saved to your list!', wasFav ? 'info' : 'success');
}

function toggleModalFav() {
    if (!activeModal) return;
    const btn = document.getElementById('modal-fav-btn');
    const isFav = favorites.has(activeModal.id);
    if (isFav) {
        favorites.delete(activeModal.id);
        btn.innerHTML = '🤍 Save';
        showToast('Removed from saved', 'info');
    } else {
        favorites.add(activeModal.id);
        btn.innerHTML = '❤️ Saved';
        showToast('❤️ Saved to your list!', 'success');
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
            showToast('🔗 Link copied to clipboard!', 'success');
        }).catch(() => {
            showToast('🔗 Share: ' + window.location.href, 'info');
        });
    }
}

/* ═══════════════════════════  MODAL  ════════════════════════════════════ */

const GALLERY_ICONS = ['🏠','🌅','🛋','🍳','🛁','🌳','🌇','🛏'];

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
    document.getElementById('modal-loc').innerHTML          = '📍 ' + p.location;
    document.getElementById('modal-price').textContent      = formatPrice(p.price);
    document.getElementById('modal-price-note').textContent = 'Negotiable · Transfer included';
    document.getElementById('modal-beds').textContent       = p.beds;
    document.getElementById('modal-baths').textContent      = p.baths;
    document.getElementById('modal-size').textContent       = p.size;
    document.getElementById('modal-garage').textContent     = p.garage;
    document.getElementById('modal-desc').textContent       = p.desc;
    document.getElementById('modal-fav-btn').innerHTML      = favorites.has(p.id) ? '❤️ Saved' : '🤍 Save';

    // Amenities
    document.getElementById('modal-amenities').innerHTML = p.amenities.map(a =>
        `<div class="modal-amenity"><span class="amenity-check" aria-hidden="true">✅</span>${a}</div>`
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
            💡 <strong style="color:var(--accent)">Analyst Note:</strong> Based on current market trends in ${p.location.split(',')[0]}, 
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
    const icons = [p.icon, ...GALLERY_ICONS].slice(0, 5);
    document.getElementById('modal-gallery-icon').textContent = icons[galleryIndex] || p.icon;

    // Update dots
    const dotsEl = document.getElementById('gallery-dots');
    dotsEl.innerHTML = icons.map((_, i) =>
        `<div class="gallery-dot ${i === galleryIndex ? 'active' : ''}" onclick="setGallery(${i})"></div>`
    ).join('');
}

function galleryNav(dir) {
    if (!activeModal) return;
    const icons = [activeModal.icon, ...GALLERY_ICONS].slice(0, 5);
    galleryIndex = (galleryIndex + dir + icons.length) % icons.length;
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

// Close modal on backdrop click
document.getElementById('prop-modal').addEventListener('click', e => {
    if (e.target === document.getElementById('prop-modal')) closeModal();
});

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
});

// Featured modal
function openFeaturedModal() {
    openModal(6); // Mountain Retreat as featured
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
        el.style.background = `linear-gradient(to right, #f59e0b 0%, #f59e0b ${pct}%, #374151 ${pct}%, #374151 100%)`;
    });
}

/* ═══════════════════════════  LIFESTYLE QUIZ  ════════════════════════════ */

function initQuiz() {
    // Option selection
    document.getElementById('quiz-container').addEventListener('click', e => {
        const opt = e.target.closest('.quiz-option');
        if (!opt) return;
        const step = opt.closest('.quiz-step');
        step.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        quizAnswers[step.dataset.step] = opt.dataset.value;
    });

    // Keyboard selection for quiz options
    document.getElementById('quiz-container').addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            const opt = e.target.closest('.quiz-option');
            if (opt) { e.preventDefault(); opt.click(); }
        }
    });

    // Next/back buttons
    document.getElementById('quiz-container').addEventListener('click', e => {
        const nextBtn = e.target.closest('.quiz-next');
        const backBtn = e.target.closest('.quiz-back');
        if (nextBtn) showQuizStep(nextBtn.dataset.next);
        if (backBtn) showQuizStep(backBtn.dataset.back);
    });

    // Finish
    document.getElementById('btn-quiz-finish').addEventListener('click', () => {
        showQuizResult();
    });

    // Restart
    document.getElementById('btn-quiz-restart').addEventListener('click', () => {
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
    loadHoodScores(document.querySelector('[data-hood="Mbabane"]'));
}

function loadHoodScores(btn) {
    const area = btn.dataset.hood;
    const data = HOOD_DATA[area];
    if (!data) return;

    // Update buttons
    document.querySelectorAll('[data-hood]').forEach(b => {
        const isActive = b.dataset.hood === area;
        b.className = isActive ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm';
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

/* ═══════════════════════════  MAP PINS  ══════════════════════════════════ */

function initMapPins() {
    document.querySelectorAll('.map-pin').forEach(pin => {
        pin.addEventListener('click', () => {
            const area = pin.dataset.area;
            const btn = document.querySelector(`[data-hood="${area}"]`);
            if (btn) {
                loadHoodScores(btn);
                document.getElementById('neighborhood-section').scrollIntoView({ behavior: 'smooth' });
                showToast('📍 Showing scores for ' + area, 'info');
            }
        });

        pin.addEventListener('keydown', e => {
            if (e.key === 'Enter') pin.click();
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
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
}

/* ═══════════════════════════  TOAST  ════════════════════════════════════ */

function showToast(msg, type) {
    const toast   = document.getElementById('toast');
    const icon    = document.getElementById('toast-icon');
    const msgEl   = document.getElementById('toast-msg');
    const icons   = { success: '✅', info: 'ℹ️', error: '❌' };

    msgEl.textContent = msg;
    icon.textContent  = icons[type] || 'ℹ️';
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
