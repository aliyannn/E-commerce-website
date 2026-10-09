const PRODUCTS = [
  {
    id: "aur-001",
    name: "The Biella Double-Breasted Cashmere Trench",
    subtitle: "Hand-finished pure Grade-A Mongolian cashmere with horn buttoning",
    category: "outerwear",
    categoryName: "Coats & Outerwear",
    price: 890,
    originalPrice: 1050,
    badge: "Bestseller",
    rating: 4.9,
    reviewsCount: 54,
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Oatmeal Camel", hex: "#C5A880" },
      { name: "Chalk Cream", hex: "#EDE8DF" },
      { name: "Espresso Noir", hex: "#221E1C" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "An architectural tour de force crafted in northern Italy from unblended Mongolian cashmere. Designed with sharp peak lapels, a dropped shoulder for effortless layering, and hand-carved buffalo horn buttons. The interior is lined in breathable cupro silk for a frictionless glide over fine knits.",
    details: [
      "Double-breasted storm flap silhouette",
      "Removable sash belt with tonal topstitching",
      "Deep welt hand-warmer pockets",
      "Water-repellent cashmere finish",
      "Tailored vent at reverse for fluid movement"
    ],
    composition: "100% Grade-A Cashmere outer; 100% Bemberg Cupro lining",
    care: "Specialist dry clean only. Store on wide cedar hanger.",
    origin: "Handcrafted in Biella, Northern Italy",
    inStock: true,
    featured: true
  },
  {
    id: "aur-002",
    name: "The Sculptural Wool Chesterfield Blazer",
    subtitle: "Precision tailoring from high-twist virgin Merino wool",
    category: "tailoring",
    categoryName: "Tailoring & Blazers",
    price: 620,
    originalPrice: null,
    badge: "New Arrival",
    rating: 4.8,
    reviewsCount: 32,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Charcoal Heather", hex: "#2B2D2F" },
      { name: "Sandstone Beige", hex: "#DDD3C1" },
      { name: "Deep Navy", hex: "#161D2B" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A genderless tailored statement defined by a relaxed yet decisive shoulder line and clean, hidden placket closures. Spun from 130s high-twist virgin wool from the heritage mills of Biella, providing natural crease recovery and an impeccable drape.",
    details: [
      "Semi-canvassed construction for natural shaping",
      "Interior passport and pen pockets",
      "Single back vent with understated horn accents",
      "Clean pick-stitched edges along lapels",
      "Fully lined in tonal breathable silk-blend"
    ],
    composition: "100% Super 130s Virgin Wool; Lining: 60% Silk, 40% Cotton",
    care: "Dry clean only. Steam gently to refresh fibres.",
    origin: "Tailored in Florence, Italy",
    inStock: true,
    featured: true
  },
  {
    id: "aur-003",
    name: "The Ribbed Fisherman Cashmere Rollneck",
    subtitle: "Heavyweight 7-gauge Scottish cashmere knit",
    category: "knitwear",
    categoryName: "Cashmere & Knitwear",
    price: 495,
    originalPrice: null,
    badge: "Atelier Icon",
    rating: 5.0,
    reviewsCount: 78,
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Alabaster White", hex: "#F3EDE3" },
      { name: "Warm Taupe", hex: "#A89F91" },
      { name: "Forest Moss", hex: "#353D32" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "The quintessential cocoon knit. Spun from cloud-soft 7-gauge four-ply cashmere spun along the Scottish borders. Features an elongated ribbed funnel neck that stands gracefully or rolls softly, with sculptural raglan sleeves.",
    details: [
      "Dense 7-gauge fisherman rib structure",
      "Non-constrictive turtleneck collar",
      "Engineered tubular cuffs and hem",
      "Naturally insulating and exceptionally lightweight",
      "Zero synthetic blends"
    ],
    composition: "100% Grade-A Todd & Duncan Cashmere",
    care: "Hand wash cold in cashmere wash, dry flat on towel.",
    origin: "Knitted in Hawick, Scotland",
    inStock: true,
    featured: true
  },
  {
    id: "aur-004",
    name: "The Heavyweight Mulberry Silk Slip Dress",
    subtitle: "Bias-cut 22-momme pure silk with fluid liquid drape",
    category: "dresses",
    categoryName: "Dresses & Evening",
    price: 440,
    originalPrice: 520,
    badge: "Pure Silk",
    rating: 4.9,
    reviewsCount: 46,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Champagne Pearl", hex: "#EBE3D5" },
      { name: "Smoky Onyx", hex: "#1F1F1F" },
      { name: "Terracotta Earth", hex: "#A65B47" }
    ],
    sizes: ["XS", "S", "M", "L"],
    description: "Cut on the true 45-degree bias to hug and ripple naturally along the contours of the body. Crafted from substantial 22-momme sandwashed Mulberry silk that boasts an opulent matte luster and zero transparency.",
    details: [
      "Ultra-fine rolled spaghetti straps with adjusters",
      "Subtle soft cowl neckline",
      "Side slit falling gracefully to mid-calf",
      "French seams throughout",
      "Unlined for ultimate breathable flow"
    ],
    composition: "100% Grade 6A Organic Mulberry Silk (22 Momme)",
    care: "Hand wash in tepid water with silk shampoo or dry clean.",
    origin: "Handcrafted in Como, Italy",
    inStock: true,
    featured: true
  },
  {
    id: "aur-005",
    name: "The Oversized Poplin Architectural Shirt",
    subtitle: "120/2 Egyptian Giza cotton with mother-of-pearl hardware",
    category: "shirts",
    categoryName: "Silk & Shirts",
    price: 280,
    originalPrice: null,
    badge: "Essential",
    rating: 4.7,
    reviewsCount: 61,
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Crisp Chalk", hex: "#FAF8F5" },
      { name: "Sky Chambray", hex: "#C5D4E0" },
      { name: "French Stripe", hex: "#D6DBDF" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A masterclass in modern proportion. Cut deliberately oversized with high side-slits, extended barrel cuffs, and a structured collar engineered to frame the collarbone. Woven from long-staple Egyptian Giza cotton that feels silky against skin while retaining crisp geometry.",
    details: [
      "Genuine Australian Mother-of-Pearl buttons",
      "Extended French cuffs with double buttoning",
      "Curved high-low hem ideal for half-tuck",
      "Back box pleat for ease of movement",
      "Reinforced collar stays"
    ],
    composition: "100% Long-Staple Egyptian Giza Cotton",
    care: "Machine wash delicate 30°C. Warm iron while slightly damp.",
    origin: "Crafted in Porto, Portugal",
    inStock: true,
    featured: false
  },
  {
    id: "aur-006",
    name: "The Pleated High-Rise Silk-Wool Trousers",
    subtitle: "Double inverted front pleats with relaxed wide leg",
    category: "tailoring",
    categoryName: "Tailoring & Blazers",
    price: 390,
    originalPrice: null,
    badge: "Tailored Cut",
    rating: 4.8,
    reviewsCount: 29,
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Espresso Cream", hex: "#5C4F44" },
      { name: "Ivory Ecru", hex: "#ECE6DC" },
      { name: "Midnight", hex: "#1A1D24" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Cut with a dramatic high-rise waistband and cascading wide silhouette, these trousers combine the structured hand of fine wool with the soft sheen and fluid swing of raw mulberry silk.",
    details: [
      "Extended tab waistband with horn closure",
      "Inverted deep double pleats",
      "Side slant pockets and clean welt back pockets",
      "Half-lined to the knee in soft cupro",
      "Generous 2-inch hem allowance for tailored adjustment"
    ],
    composition: "65% Virgin Wool, 35% Mulberry Silk",
    care: "Dry clean only.",
    origin: "Crafted in Naples, Italy",
    inStock: true,
    featured: false
  },
  {
    id: "aur-007",
    name: "The Structured Smooth Calfskin Atelier Tote",
    subtitle: "Full-grain Italian vegetable tanned leather with raw edge finish",
    category: "accessories",
    categoryName: "Fine Accessories",
    price: 580,
    originalPrice: null,
    badge: "Artisanal",
    rating: 5.0,
    reviewsCount: 39,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Cognac Tan", hex: "#9E5B32" },
      { name: "Saddle Black", hex: "#141414" },
      { name: "Olive Earth", hex: "#4A4D3B" }
    ],
    sizes: ["One Size"],
    description: "An architectural companion built to develop a rich, luminous patina over decades of wear. Hand-stitched with waxed linen thread by Tuscan leather artisans, featuring a structured base that stands independently and fits up to a 15-inch laptop.",
    details: [
      "Hand-burnished, painted raw edges",
      "Internal magnetic closure in antique brushed brass",
      "Detachable zip clutch pouch included",
      "Solid brass protective base studs",
      "Subtle gold foil blind debossed atelier serial number"
    ],
    composition: "100% Full-Grain Vegetable-Tanned Tuscan Calf Leather",
    care: "Condition annually with organic beeswax leather balm.",
    origin: "Handmade in Florence, Italy",
    inStock: true,
    featured: true
  },
  {
    id: "aur-008",
    name: "The Brushed Mohair Wool Cardigan",
    subtitle: "Cloud-soft textured knit with tactile tortoiseshell buttons",
    category: "knitwear",
    categoryName: "Cashmere & Knitwear",
    price: 360,
    originalPrice: 420,
    badge: "Limited Edition",
    rating: 4.8,
    reviewsCount: 22,
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Sage Lichen", hex: "#8A9482" },
      { name: "Warm Biscuit", hex: "#D4BE9F" },
      { name: "Charcoal Ash", hex: "#3A3A3C" }
    ],
    sizes: ["XS", "S", "M", "L"],
    description: "Spun from RMS-certified sustainable kid mohair and fine merino wool, gently brushed with natural dried teasels to achieve a dreamy, halo-like texture. Features a relaxed V-neckline and deep patch pockets.",
    details: [
      "Custom Italian bio-resin tortoiseshell buttons",
      "Dropped shoulder seams for relaxed styling",
      "Dual front patch pockets",
      "Ribbed cuffs that hold comfortably pushed up",
      "Lightweight yet deeply insulating"
    ],
    composition: "60% RMS Kid Mohair, 30% Merino Wool, 10% Organic Silk",
    care: "Gentle cold hand wash; do not tumble dry; brush gently with wool comb.",
    origin: "Spun in Bergamo, Italy",
    inStock: true,
    featured: false
  },
  {
    id: "aur-009",
    name: "The Minimalist Alpaca Wrap Overcoat",
    subtitle: "Unstructured luxury with dramatic cascading shawl collar",
    category: "outerwear",
    categoryName: "Coats & Outerwear",
    price: 980,
    originalPrice: null,
    badge: "Runway Piece",
    rating: 4.9,
    reviewsCount: 19,
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Peruvian Camel", hex: "#B88E5F" },
      { name: "Raw Ecru", hex: "#E9E3D8" }
    ],
    sizes: ["S", "M", "L"],
    description: "A sweeping unlined statement piece crafted from double-faced baby alpaca that envelops the wearer in weightless warmth. Clean seams, generous front overlap, and a self-tie belt with hand-turned edges.",
    details: [
      "Double-face construction with hand-sewn invisible seams",
      "Shawl collar that drapes effortlessly over shoulders",
      "Generous side slip pockets",
      "Subtle kimono cut sleeves",
      "Ankle-grazing length with high side vents"
    ],
    composition: "80% Baby Alpaca, 20% Virgin Wool",
    care: "Professional dry clean only.",
    origin: "Crafted in Arequipa, Peru & Finished in Milan",
    inStock: true,
    featured: false
  },
  {
    id: "aur-010",
    name: "The Draped Silk Crepe de Chine Blouse",
    subtitle: "Water-washed silk with concealed front placket",
    category: "shirts",
    categoryName: "Silk & Shirts",
    price: 320,
    originalPrice: null,
    badge: "Pure Silk",
    rating: 4.8,
    reviewsCount: 35,
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Malted Milk", hex: "#EBE5D8" },
      { name: "Midnight Plum", hex: "#352533" },
      { name: "Olive Slate", hex: "#4B5145" }
    ],
    sizes: ["XS", "S", "M", "L"],
    description: "Woven in the historic textile mills of Lake Como, this blouse is finished with a proprietary water-wash technique giving the pure silk a velvety peach-skin hand that resists creasing throughout the day.",
    details: [
      "Concealed button front with genuine mother-of-pearl buttons",
      "Soft gathered detailing at the rear yoke",
      "Single-button cuffs with elongated placket",
      "Fluid curved hem designed to tuck cleanly or flow loose",
      "Naturally thermoregulating"
    ],
    composition: "100% Italian Silk Crepe de Chine (18 Momme)",
    care: "Hand wash cold with silk detergent or dry clean.",
    origin: "Como, Northern Italy",
    inStock: true,
    featured: false
  },
  {
    id: "aur-011",
    name: "The Hand-Fringed Cashmere Stole",
    subtitle: "Oversized featherweight blanket scarf in 100% fine cashmere",
    category: "accessories",
    categoryName: "Fine Accessories",
    price: 240,
    originalPrice: null,
    badge: "Gift Edit",
    rating: 4.9,
    reviewsCount: 52,
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Heather Oatmeal", hex: "#D6CCC2" },
      { name: "Charcoal Mélange", hex: "#3D3D3F" },
      { name: "Warm Amber", hex: "#9C663D" }
    ],
    sizes: ["200cm × 75cm"],
    description: "An heirloom-grade accessory hand-woven on antique shuttle looms. Sized generously enough to serve as an evening wrap, travel cocoon, or everyday sculptural scarf, with delicate twisted eyelashes fringe.",
    details: [
      "Hand-twisted 8cm eyelash fringe along both ends",
      "Featherweight weave with incredible thermal yield",
      "Subtle woven selvedge borders",
      "Includes protective organic cotton atelier pouch"
    ],
    composition: "100% Pure Himalayan Cashmere",
    care: "Dry clean or gentle hand wash in lukewarm water.",
    origin: "Loomed in Nepal; Finished in Florence",
    inStock: true,
    featured: false
  },
  {
    id: "aur-012",
    name: "The Column Crepe Evening Gown",
    subtitle: "Sculptural backless gown with understated draped train",
    category: "dresses",
    categoryName: "Dresses & Evening",
    price: 740,
    originalPrice: null,
    badge: "Evening Edit",
    rating: 5.0,
    reviewsCount: 18,
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Noir Intemporel", hex: "#111111" },
      { name: "Ivory Parchment", hex: "#F3EDE2" }
    ],
    sizes: ["XS", "S", "M", "L"],
    description: "Minimalism at its most dramatic. Cut from dense Italian wool-crepe that falls straight and sculptural from a high bateau neckline to an open cowl spine. Features a subtle trailing back hem designed for grand entrances.",
    details: [
      "High architectural neckline",
      "Draped low cowl back with internal ribbon stabilization",
      "Subtle floor-skimming back train (8 inches)",
      "Concealed side zipper with safety hook",
      "Double-layered bodice for support without undergarments"
    ],
    composition: "70% Wool Crepe, 30% Silk; Lining: 100% Silk Crepe",
    care: "Dry clean only by eveningwear specialist.",
    origin: "Atelier Made in Paris, France",
    inStock: true,
    featured: false
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PRODUCTS;
}
if (typeof window !== 'undefined') {
  window.PRODUCTS = PRODUCTS;
}
