# Atelier Aurélia — Quiet Luxury Clothing E-Commerce Store

**Atelier Aurélia** is an e-commerce online store for a modern luxury clothing brand. Handcrafted with an aesthetic of warm cream tones, dark charcoal typography, and serif headlines.

---

## 🌟 Key Features & Functionality

### 1. Minimalist & Modern Luxury Aesthetics
- **Warm Cream Palette**: Balanced shades (`#FAF8F5`, `#F3EFE8`, `#FFFFFF`) delivering an editorial look.
- **Dark Charcoal Typography**: High-contrast, legible ink (`#1A1918`, `#57524A`) with letter-spaced typography.
- **Serif Headings**: Google Fonts `Cormorant Garamond` and `Playfair Display`, paired with geometric `Plus Jakarta Sans`.
- **Micro-Interactions**: Smooth dual-image hover transitions, slide-over drawer glides, subtle box shadows, and toast notifications.

### 2. Full-Bleed Hero Banner & Homepage
- Editorial full-bleed hero with primary **"Shop The Collection"** CTA and **"Discover Our Atelier"** secondary button.
- Floating luxury badge: *Complimentary Worldwide Courier Above $250*.
- Value pillars: *Artisanal Heritage, Grade-A Fibers, Small-Batch Runs, White-Glove Courier*.
- The Curated Edit: Showcase of signature garments with quick view and add to bag.
- Category spotlight cards and Lookbook editorial section.
- Critical acclaim press quotes (*Vogue*, *Monocle*, *Harper's Bazaar*).

### 3. Shop Grid with Dynamic Category Filters
- Filter by category: **All Garments**, **Coats & Outerwear**, **Tailoring & Blazers**, **Cashmere & Knitwear**, **Silk & Shirts**, **Dresses & Evening**, **Fine Accessories**.
- Multi-column responsive layout with toggle between 3-column / 4-column grid and 2-column editorial view.
- Real-time sorting: *Featured*, *Price: Low to High*, *Price: High to Low*, *Highest Rated*, *New Arrivals*.
- **Image Hover States**: Smooth crossfade from studio front view to alternate styling angle on card hover.
- Quick Actions on hover: **Quick View Modal**, **Quick Add to Bag**, and animated **Wishlist heart**.

### 4. Individual Product Detail Page (PDP)
- Breadcrumb navigation (`Home / Shop / Category / Product`).
- Multi-angle thumbnail gallery with zoom preview.
- Installment calculation (*"or 4 interest-free payments with Klarna"*).
- Color swatches with live color label update.
- Size selector (`XS`, `S`, `M`, `L`, `XL`) linked to an interactive **Atelier Size Guide Modal**.
- Quantity counter stepper (`- 1 +`).
- Primary **"Add to Bag"** button and direct **"Buy It Now"** checkout shortcut.
- Expandable accordions: *Tailoring & Fit Details*, *Composition & Care*, *Complimentary Delivery & Concierge Returns*.
- **"Complete The Look"** complementary garment recommendations.

### 5. Working Shopping Cart (Slide-Over Bag Drawer)
- Opens smoothly upon adding any item or clicking the header bag icon.
- Dynamic free shipping progress bar (*"Add $45 more for Complimentary Shipping"*).
- Line item adjustment: increment, decrement, and remove with immediate recalculation.
- Promo code engine:
  - `LUXURY10` (10% Welcome Invitation)
  - `AURELIA` (15% Atelier Privilege)
- Financial breakdown: Subtotal, Discount, Shipping, Estimated Sales Tax, Total.
- Persisted locally across page reloads via `localStorage`.

### 6. Live Instant Search Overlay
- Accessible from header search icon or keyboard shortcut.
- Instant live results filtering across product names, categories, descriptions, and fabric compositions.
- Quick clickable trending tags (*Cashmere*, *Trench Overcoat*, *Tailored Blazer*, *Pure Silk*, *Artisanal Leather*).

### 7. Secure Checkout & Order Confirmation
- Clean, distraction-free luxury checkout.
- Express checkout buttons: Apple Pay, Google Pay, Klarna.
- Multi-step customer details: Contact Info, Shipping Destination, Delivery Method (Standard vs. DHL Express Priority), and Encrypted Credit Card payment with card brand detection.
- Sticky order summary on the right with items, discount code application, and guarantee badges.
- **Order Confirmation Receipt Screen**: Order Reference ID (e.g. `#AUR-187577`), DHL tracking number, estimated arrival date, itemized purchase breakdown, and printable receipt.

### 8. About, FAQ & Concierge Contact
- **About**: Atelier philosophy, northern Italian mills in Biella, and ethical commitments.
- **FAQ**: Interactive accordions covering sizing consultations, worldwide delivery, and luxury fiber care.
- **Contact Concierge**: Direct contact form with validation, boutique flagship addresses in Paris, Milan, and New York.

---

## 🚀 Running Locally

### Prerequisites
- Node.js (v18+)

### Installation & Launch
```bash
# Clone or navigate to the directory
cd x:\Code\ECommerce

# Install dependencies (Express)
npm install

# Start the luxury e-commerce server
npm start
```

Open your browser and navigate to:
**[http://localhost:3000](http://localhost:3000)**

---

## 📁 Project Architecture

```
x:/Code/ECommerce/
├── package.json               # Scripts and dependencies
├── server.js                  # Express backend with REST APIs (products, checkout, orders, newsletter)
├── public/
│   ├── index.html             # Semantic SPA shell with SEO tags, drawers, and modals
│   ├── css/
│   │   ├── variables.css      # Warm cream & charcoal luxury design tokens
│   │   ├── base.css           # Typography, buttons, badges, toast notifications
│   │   ├── navigation.css     # Sticky header, announcement bar, mobile drawer
│   │   ├── hero.css           # Full-bleed hero banner, value pillars
│   │   ├── shop.css           # Multi-column responsive product grid, hover states, filters
│   │   ├── product.css        # Product Detail Page (PDP) gallery, swatches, accordions
│   │   ├── cart.css           # Slide-over shopping bag drawer, shipping progress bar
│   │   ├── checkout.css       # Secure checkout layout, card validation, order receipt
│   │   ├── pages.css          # About, FAQ, Contact, Editorial Lookbook, Footer
│   │   └── modal.css          # Quick View, Size Guide, Live Search overlay
│   └── js/
│       ├── data/
│       │   └── products.js    # Curated catalog of 12 luxury clothing items
│       ├── store.js           # Reactive state management (Cart, Wishlist, Discounts)
│       ├── components/
│       │   ├── toast.js       # Toast notifications
│       │   ├── productCard.js # Card renderer with dual-image hover states
│       │   ├── cartDrawer.js  # Interactive slide-over cart drawer
│       │   └── searchModal.js # Instant live search overlay
│       ├── router.js          # Client-side router (#home, #shop, #product, #checkout, etc.)
│       └── app.js             # Application coordinator and event listeners
└── README.md
```
