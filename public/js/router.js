// Client-Side Router and Page Views Renderer
const Router = (() => {
  const routes = {
    'home': renderHome,
    'shop': renderShop,
    'product': renderProduct,
    'checkout': renderCheckout,
    'order-success': renderOrderSuccess,
    'about': renderAbout,
    'faq': renderFaq,
    'contact': renderContact
  };

  let activeRoute = 'home';
  let activeParams = {};

  function parseHash() {
    const hash = window.location.hash.slice(1) || '/home';
    const [pathPart, queryPart] = hash.split('?');
    const segments = pathPart.split('/').filter(Boolean);

    const route = segments[0] || 'home';
    const id = segments[1] || null;

    const query = {};
    if (queryPart) {
      new URLSearchParams(queryPart).forEach((val, key) => {
        query[key] = val;
      });
    }

    return { route, id, query };
  }

  function handleRoute() {
    const { route, id, query } = parseHash();
    activeRoute = route;
    activeParams = { id, ...query };

    // Update active nav links
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      const linkHref = link.getAttribute('href') || '';
      if (linkHref === `#/${route}` || (route === 'home' && (linkHref === '#/' || linkHref === '#/home'))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    const appContainer = document.getElementById('app-root');
    if (!appContainer) return;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const renderer = routes[route] || routes['home'];
    renderer(appContainer, activeParams);
  }

  // View: Homepage
  function renderHome(container) {
    container.innerHTML = `
      <!-- Full Bleed Hero Banner -->
      <section class="hero-section">
        <div class="hero-background-wrapper">
          <img class="hero-bg-image" 
               src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1800&q=85" 
               alt="Atelier Aurélia Autumn Winter Collection" />
          <div class="hero-overlay"></div>
        </div>

        <div class="container">
          <div class="hero-content">
            <span class="hero-eyebrow">Autumn / Winter Atelier Edit</span>
            <h1 class="hero-title">The Architecture of <em>Quiet Luxury</em></h1>
            <p class="hero-description">
              Handcrafted in Northern Italy from pure Grade-A Mongolian cashmere and virgin wool. Architectural silhouettes engineered to transcend seasons.
            </p>
            <div class="hero-cta-group">
              <a href="#/shop" class="btn hero-btn-primary">Shop The Collection</a>
              <a href="#/about" class="btn hero-btn-secondary">Discover Our Atelier</a>
            </div>
          </div>
        </div>

        <div class="hero-floating-badge">
          <span class="badge-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </span>
          <span class="hero-floating-badge-text">Complimentary Worldwide Courier Above $250</span>
        </div>
      </section>

      <!-- Value Pillars Section -->
      <section class="pillars-section">
        <div class="container">
          <div class="pillars-grid">
            <div class="pillar-item">
              <span class="pillar-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </span>
              <div>
                <h4 class="pillar-title">Artisanal Heritage</h4>
                <p class="pillar-text">Master tailoring woven in northern Italian heritage mills.</p>
              </div>
            </div>

            <div class="pillar-item">
              <span class="pillar-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </span>
              <div>
                <h4 class="pillar-title">Grade-A Fibers</h4>
                <p class="pillar-text">Unblended 100% Mongolian cashmere & 22-momme Mulberry silk.</p>
              </div>
            </div>

            <div class="pillar-item">
              <span class="pillar-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
                </svg>
              </span>
              <div>
                <h4 class="pillar-title">Small-Batch Runs</h4>
                <p class="pillar-text">Zero overproduction. Conscious limited craftsmanship.</p>
              </div>
            </div>

            <div class="pillar-item">
              <span class="pillar-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <div>
                <h4 class="pillar-title">White-Glove Courier</h4>
                <p class="pillar-text">Carbon-neutral insured transit in custom silk atelier bags.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Curated Edit -->
      <section class="section-spacing">
        <div class="container">
          <div class="section-header">
            <span class="eyebrow-tag">Iconic Tailoring</span>
            <h2 class="section-title">The Curated Edit</h2>
            <p class="section-description">
              A disciplined collection of foundational silhouettes designed to be worn across years, not seasons.
            </p>
          </div>

          <div class="product-grid" id="home-featured-grid"></div>

          <div style="text-align: center; margin-top: 3.5rem;">
            <a href="#/shop" class="btn btn-secondary" style="padding: 1.1rem 3rem;">View All 12 Garments</a>
          </div>
        </div>
      </section>

      <!-- Category Highlights Section -->
      <section class="section-spacing" style="background-color: var(--bg-secondary); border-top: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light);">
        <div class="container">
          <div class="section-header">
            <span class="eyebrow-tag">Wardrobe Architecture</span>
            <h2 class="section-title">Shop by Category</h2>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
            <a href="#/shop?category=outerwear" class="editorial-media-box" style="height: 420px; display: block; position: relative; text-decoration: none;">
              <img src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80" style="width: 100%; height: 100%; object-fit: cover;" alt="Coats & Outerwear" />
              <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(26,25,24,0.75) 0%, transparent 60%); display: flex; flex-direction: column; justify-content: flex-end; padding: 2rem; color: #FAF8F5;">
                <span style="font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent-gold-light);">Sculptural</span>
                <h3 style="font-family: var(--font-serif); font-size: 1.6rem; color: #FAF8F5;">Coats & Outerwear</h3>
                <span style="font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 0.5rem; text-decoration: underline;">Discover Edit →</span>
              </div>
            </a>

            <a href="#/shop?category=knitwear" class="editorial-media-box" style="height: 420px; display: block; position: relative; text-decoration: none;">
              <img src="https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80" style="width: 100%; height: 100%; object-fit: cover;" alt="Cashmere & Knitwear" />
              <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(26,25,24,0.75) 0%, transparent 60%); display: flex; flex-direction: column; justify-content: flex-end; padding: 2rem; color: #FAF8F5;">
                <span style="font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent-gold-light);">Mongolian Fibers</span>
                <h3 style="font-family: var(--font-serif); font-size: 1.6rem; color: #FAF8F5;">Cashmere & Knitwear</h3>
                <span style="font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 0.5rem; text-decoration: underline;">Discover Edit →</span>
              </div>
            </a>

            <a href="#/shop?category=tailoring" class="editorial-media-box" style="height: 420px; display: block; position: relative; text-decoration: none;">
              <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80" style="width: 100%; height: 100%; object-fit: cover;" alt="Tailoring & Blazers" />
              <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(26,25,24,0.75) 0%, transparent 60%); display: flex; flex-direction: column; justify-content: flex-end; padding: 2rem; color: #FAF8F5;">
                <span style="font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent-gold-light);">Virgin Wool</span>
                <h3 style="font-family: var(--font-serif); font-size: 1.6rem; color: #FAF8F5;">Tailoring & Blazers</h3>
                <span style="font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 0.5rem; text-decoration: underline;">Discover Edit →</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <!-- Editorial Lookbook Section -->
      <section class="section-spacing">
        <div class="container">
          <div class="editorial-grid">
            <div class="editorial-media-box">
              <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80" alt="Editorial Lookbook" />
            </div>
            <div class="editorial-content-box">
              <span class="eyebrow-tag">Lookbook Volume IV</span>
              <blockquote class="editorial-quote">
                "We do not design garments to shout in a crowded room. We tailor them for the confident presence of quiet certainty."
              </blockquote>
              <p style="margin-bottom: 1.5rem; font-size: 1rem; line-height: 1.8;">
                Every seam in Atelier Aurélia is balanced with millimeter precision. From our bi-annual cashmere combing in inner Mongolia to our bespoke horn hardware carved in Bergamo, luxury is not excess—it is uncompromising patience.
              </p>
              <a href="#/shop" class="btn btn-primary">Shop The Lookbook</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Press Acclaim Section -->
      <section style="padding: 4rem 0; border-top: 1px solid var(--border-light); background-color: var(--bg-surface);">
        <div class="container">
          <div style="text-align: center; margin-bottom: 2.5rem;">
            <span class="eyebrow-tag">Critical Acclaim</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 2.5rem; text-align: center;">
            <div>
              <p style="font-family: var(--font-serif); font-size: 1.25rem; font-style: italic; margin-bottom: 0.75rem;">“The benchmark for post-minimalist luxury tailoring.”</p>
              <span style="font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 700; color: var(--text-primary);">Vogue International</span>
            </div>
            <div>
              <p style="font-family: var(--font-serif); font-size: 1.25rem; font-style: italic; margin-bottom: 0.75rem;">“Impeccable cut, heavy drape, and fibers that outlive trends.”</p>
              <span style="font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 700; color: var(--text-primary);">Monocle</span>
            </div>
            <div>
              <p style="font-family: var(--font-serif); font-size: 1.25rem; font-style: italic; margin-bottom: 0.75rem;">“Atelier Aurélia redefines cashmere with architectural grace.”</p>
              <span style="font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 700; color: var(--text-primary);">Harper's Bazaar</span>
            </div>
          </div>
        </div>
      </section>
    `;

    // Populate featured products
    const featuredGrid = container.querySelector('#home-featured-grid');
    if (featuredGrid) {
      const featuredItems = PRODUCTS.filter(p => p.featured).slice(0, 6);
      featuredItems.forEach(prod => {
        featuredGrid.appendChild(ProductCard.render(prod));
      });
    }
  }

  // View: Shop Grid with Filters
  function renderShop(container, params = {}) {
    const selectedCategory = params.category || 'all';

    container.innerHTML = `
      <section class="shop-section">
        <div class="container">
          <div class="section-header" style="margin-bottom: 2.5rem;">
            <span class="eyebrow-tag">The Complete Atelier</span>
            <h1 class="section-title" style="font-size: clamp(2.4rem, 4vw, 3.5rem);">Garments & Silhouettes</h1>
            <p class="section-description">
              Explore meticulously tailored outerwear, unblended knitwear, pure silks, and artisanal Italian leather.
            </p>
          </div>

          <!-- Filter Bar -->
          <div class="shop-filter-bar">
            <!-- Category Pills -->
            <div class="category-filter-list" id="shop-category-pills">
              <button class="category-pill ${selectedCategory === 'all' ? 'active' : ''}" data-cat="all">All Garments</button>
              <button class="category-pill ${selectedCategory === 'outerwear' ? 'active' : ''}" data-cat="outerwear">Coats & Outerwear</button>
              <button class="category-pill ${selectedCategory === 'tailoring' ? 'active' : ''}" data-cat="tailoring">Tailoring & Blazers</button>
              <button class="category-pill ${selectedCategory === 'knitwear' ? 'active' : ''}" data-cat="knitwear">Cashmere & Knitwear</button>
              <button class="category-pill ${selectedCategory === 'shirts' ? 'active' : ''}" data-cat="shirts">Silk & Shirts</button>
              <button class="category-pill ${selectedCategory === 'dresses' ? 'active' : ''}" data-cat="dresses">Dresses & Evening</button>
              <button class="category-pill ${selectedCategory === 'accessories' ? 'active' : ''}" data-cat="accessories">Fine Accessories</button>
            </div>

            <!-- Toolbar Controls -->
            <div class="shop-toolbar">
              <span class="results-count" id="shop-results-count">Showing garments...</span>

              <div class="toolbar-controls">
                <div class="filter-select-wrapper">
                  <label class="filter-select-label" for="sort-dropdown">Sort By:</label>
                  <select id="sort-dropdown" class="sort-select">
                    <option value="featured">Featured Selection</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">New Arrivals</option>
                  </select>
                </div>

                <div class="grid-view-switcher">
                  <button class="view-btn active" id="btn-grid-3" title="3 Column Grid">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                    </svg>
                  </button>
                  <button class="view-btn" id="btn-grid-2" title="2 Column Editorial Grid">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="3" width="8" height="18"></rect>
                      <rect x="13" y="3" width="8" height="18"></rect>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Product Grid -->
          <div class="product-grid" id="shop-product-grid"></div>
        </div>
      </section>
    `;

    // Filter Logic
    let currentCat = selectedCategory;
    let currentSort = 'featured';

    const gridEl = container.querySelector('#shop-product-grid');
    const countEl = container.querySelector('#shop-results-count');
    const pills = container.querySelectorAll('.category-pill');
    const sortDropdown = container.querySelector('#sort-dropdown');
    const gridBtn2 = container.querySelector('#btn-grid-2');
    const gridBtn3 = container.querySelector('#btn-grid-3');

    function updateGrid() {
      let filtered = [...PRODUCTS];

      if (currentCat !== 'all') {
        filtered = filtered.filter(p => p.category === currentCat);
      }

      if (currentSort === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (currentSort === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (currentSort === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
      } else if (currentSort === 'newest') {
        filtered.sort((a, b) => (b.badge === 'New Arrival' ? 1 : 0) - (a.badge === 'New Arrival' ? 1 : 0));
      }

      countEl.textContent = `Showing ${filtered.length} Garment${filtered.length === 1 ? '' : 's'}`;
      gridEl.innerHTML = '';

      if (filtered.length === 0) {
        gridEl.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 0;">
            <p style="font-size: 1.2rem; font-family: var(--font-serif); margin-bottom: 0.5rem;">No silhouettes found in this category.</p>
            <p style="color: var(--text-muted);">Explore our all-garments catalogue.</p>
          </div>
        `;
        return;
      }

      filtered.forEach(p => {
        gridEl.appendChild(ProductCard.render(p));
      });
    }

    // Attach pill events
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentCat = pill.dataset.cat;
        // update url query quietly
        window.history.replaceState(null, '', `#/shop?category=${currentCat}`);
        updateGrid();
      });
    });

    // Sort event
    sortDropdown.addEventListener('change', (e) => {
      currentSort = e.target.value;
      updateGrid();
    });

    // View toggles
    gridBtn2.addEventListener('click', () => {
      gridBtn2.classList.add('active');
      gridBtn3.classList.remove('active');
      gridEl.className = 'product-grid grid-cols-2';
    });

    gridBtn3.addEventListener('click', () => {
      gridBtn3.classList.add('active');
      gridBtn2.classList.remove('active');
      gridEl.className = 'product-grid';
    });

    // Initial render
    updateGrid();
  }

  // View: Product Detail Page (PDP)
  function renderProduct(container, params = {}) {
    const product = PRODUCTS.find(p => p.id === params.id) || PRODUCTS[0];
    const isWishlisted = Store.isWishlisted(product.id);
    let selectedColor = product.colors ? product.colors[0] : { name: 'Standard', hex: '#CCCCCC' };
    let selectedSize = product.sizes ? product.sizes[0] : 'M';
    let currentQty = 1;
    let activeImageIndex = 0;

    container.innerHTML = `
      <section class="pdp-section">
        <div class="container">
          <!-- Breadcrumb -->
          <nav class="breadcrumb-nav">
            <a href="#/home">Home</a>
            <span class="breadcrumb-separator">/</span>
            <a href="#/shop">Shop</a>
            <span class="breadcrumb-separator">/</span>
            <a href="#/shop?category=${product.category}">${product.categoryName}</a>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">${product.name}</span>
          </nav>

          <div class="pdp-layout">
            <!-- Left Gallery -->
            <div class="pdp-gallery-wrap">
              <div class="pdp-main-image-box">
                ${product.badge ? `<span class="pdp-badge">${product.badge}</span>` : ''}
                <img id="pdp-main-image" 
                     class="pdp-main-image" 
                     src="${product.images[0]}" 
                     alt="${product.name}" />
              </div>

              <div class="pdp-thumbnails">
                ${product.images.map((img, idx) => `
                  <div class="pdp-thumb-item ${idx === 0 ? 'active' : ''}" data-index="${idx}">
                    <img src="${img}" alt="${product.name} view ${idx + 1}" />
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Right Details & Actions -->
            <div class="pdp-info-panel">
              <div>
                <span class="pdp-eyebrow">${product.categoryName}</span>
                <h1 class="pdp-title">${product.name}</h1>
                <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 0.35rem;">${product.subtitle}</p>
              </div>

              <div class="pdp-rating-row">
                <div class="rating-stars">★★★★★</div>
                <span class="pdp-rating-text">${product.rating} (${product.reviewsCount} Atelier Reviews)</span>
              </div>

              <div class="pdp-price-row">
                <span class="pdp-current-price">$${product.price}</span>
                ${product.originalPrice ? `<span class="pdp-orig-price">$${product.originalPrice}</span>` : ''}
                <span class="pdp-installments">or 4 interest-free payments of $${(product.price / 4).toFixed(2)} with <strong>Klarna</strong></span>
              </div>

              <p class="pdp-desc">${product.description}</p>

              <!-- Color Selector -->
              <div class="pdp-color-section">
                <div class="pdp-color-label">
                  <span>Color:</span>
                  <span id="pdp-selected-color-name" class="pdp-color-selected">${selectedColor.name}</span>
                </div>
                <div class="pdp-swatches-list">
                  ${(product.colors || []).map((c, i) => `
                    <button class="pdp-swatch-btn ${i === 0 ? 'active' : ''}" 
                            style="background-color: ${c.hex};" 
                            data-name="${c.name}"
                            title="${c.name}"></button>
                  `).join('')}
                </div>
              </div>

              <!-- Size Selector -->
              <div class="pdp-size-section">
                <div class="pdp-size-header">
                  <span class="pdp-size-label">Select Size:</span>
                  <button class="btn-size-guide" id="btn-open-size-guide">Atelier Size Guide</button>
                </div>
                <div class="pdp-sizes-list">
                  ${(product.sizes || []).map((sz, i) => `
                    <button class="pdp-size-btn ${i === 0 ? 'active' : ''}" data-size="${sz}">${sz}</button>
                  `).join('')}
                </div>
              </div>

              <!-- Quantity and Purchase Buttons -->
              <div class="pdp-actions-row">
                <div class="qty-stepper">
                  <button class="qty-btn" id="pdp-qty-minus">−</button>
                  <input type="text" class="qty-input" id="pdp-qty-input" value="1" readonly />
                  <button class="qty-btn" id="pdp-qty-plus">+</button>
                </div>

                <button class="btn btn-primary btn-add-to-bag" id="pdp-btn-add">
                  Add to Bag • $${product.price}
                </button>

                <button class="btn-wishlist-pdp ${isWishlisted ? 'active' : ''}" id="pdp-btn-wishlist" title="Save to Wishlist">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>

              <button class="btn-buy-now" id="pdp-btn-buynow">
                Buy It Now • Direct Checkout
              </button>

              <!-- Trust Perks -->
              <div class="pdp-trust-list">
                <div class="pdp-trust-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Complimentary Shipping & Returns</span>
                </div>
                <div class="pdp-trust-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>${product.origin}</span>
                </div>
                <div class="pdp-trust-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>100% Traceable Ethical Fibers</span>
                </div>
                <div class="pdp-trust-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Lifetime Garment Repair Guarantee</span>
                </div>
              </div>

              <!-- Accordions -->
              <div class="pdp-accordions">
                <div class="accordion-item open">
                  <button class="accordion-header">
                    <span>Tailoring & Silhouette Details</span>
                    <span class="accordion-icon">+</span>
                  </button>
                  <div class="accordion-body">
                    <ul>
                      ${(product.details || []).map(d => `<li>${d}</li>`).join('')}
                    </ul>
                  </div>
                </div>

                <div class="accordion-item">
                  <button class="accordion-header">
                    <span>Composition & Care</span>
                    <span class="accordion-icon">+</span>
                  </button>
                  <div class="accordion-body">
                    <p><strong>Fabric:</strong> ${product.composition}</p>
                    <p style="margin-top:0.4rem;"><strong>Care:</strong> ${product.care}</p>
                    <p style="margin-top:0.4rem;"><strong>Provenance:</strong> ${product.origin}</p>
                  </div>
                </div>

                <div class="accordion-item">
                  <button class="accordion-header">
                    <span>Complimentary Delivery & Concierge Returns</span>
                    <span class="accordion-icon">+</span>
                  </button>
                  <div class="accordion-body">
                    <p>We offer complimentary carbon-neutral shipping on orders over $250. Orders are placed in signature cotton-silk garment bags and dispatched within 24 hours.</p>
                    <p style="margin-top:0.5rem;">Complimentary 30-day home collection exchanges on all unworn items with tags intact.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Related Edit -->
          <div class="related-section">
            <div class="section-header">
              <span class="eyebrow-tag">Complete The Look</span>
              <h2 class="section-title">Complementary Pieces</h2>
            </div>
            <div class="product-grid" id="pdp-related-grid"></div>
          </div>
        </div>
      </section>
    `;

    // Interactive gallery thumbnails
    const mainImg = container.querySelector('#pdp-main-image');
    const thumbEls = container.querySelectorAll('.pdp-thumb-item');
    thumbEls.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbEls.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const idx = parseInt(thumb.dataset.index, 10);
        mainImg.src = product.images[idx];
      });
    });

    // Swatches selection
    const colorLabel = container.querySelector('#pdp-selected-color-name');
    const swatchBtns = container.querySelectorAll('.pdp-swatch-btn');
    swatchBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        swatchBtns.forEach(s => s.classList.remove('active'));
        btn.classList.add('active');
        selectedColor = { name: btn.dataset.name };
        colorLabel.textContent = selectedColor.name;
      });
    });

    // Size selection
    const sizeBtns = container.querySelectorAll('.pdp-size-btn');
    sizeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sizeBtns.forEach(s => s.classList.remove('active'));
        btn.classList.add('active');
        selectedSize = btn.dataset.size;
      });
    });

    // Stepper
    const qtyInput = container.querySelector('#pdp-qty-input');
    container.querySelector('#pdp-qty-plus').addEventListener('click', () => {
      currentQty++;
      qtyInput.value = currentQty;
    });
    container.querySelector('#pdp-qty-minus').addEventListener('click', () => {
      if (currentQty > 1) {
        currentQty--;
        qtyInput.value = currentQty;
      }
    });

    // Add to Bag Button
    container.querySelector('#pdp-btn-add').addEventListener('click', () => {
      Store.addToCart(product, {
        size: selectedSize,
        color: selectedColor.name,
        quantity: currentQty
      });
      Toast.success(`Added ${currentQty} × ${product.name} (Size ${selectedSize}) to bag.`);
      CartDrawer.open();
    });

    // Buy Now Button
    container.querySelector('#pdp-btn-buynow').addEventListener('click', () => {
      Store.addToCart(product, {
        size: selectedSize,
        color: selectedColor.name,
        quantity: currentQty
      });
      window.location.hash = '#/checkout';
    });

    // Wishlist Toggle
    const wishlistBtn = container.querySelector('#pdp-btn-wishlist');
    wishlistBtn.addEventListener('click', () => {
      const active = Store.toggleWishlist(product.id);
      wishlistBtn.classList.toggle('active', active);
      const svg = wishlistBtn.querySelector('svg');
      svg.setAttribute('fill', active ? 'currentColor' : 'none');
      Toast.success(active ? `Saved "${product.name}" to your wishlist.` : 'Removed from wishlist.');
    });

    // Accordions
    container.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        item.classList.toggle('open');
      });
    });

    // Size Guide Trigger
    container.querySelector('#btn-open-size-guide').addEventListener('click', () => {
      App.openSizeGuide();
    });

    // Related items
    const relatedGrid = container.querySelector('#pdp-related-grid');
    if (relatedGrid) {
      const related = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);
      related.forEach(rel => {
        relatedGrid.appendChild(ProductCard.render(rel));
      });
    }
  }

  // View: Secure Checkout Page
  function renderCheckout(container) {
    const { cart, totals, discount } = Store.getState();

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="container section-spacing" style="text-align: center;">
          <h2 style="font-family: var(--font-serif); font-size: 2.2rem; margin-bottom: 1rem;">Your Shopping Bag is Empty</h2>
          <p style="margin-bottom: 2rem;">Please add items to your atelier bag before proceeding to checkout.</p>
          <a href="#/shop" class="btn btn-primary">Discover Atelier Shop</a>
        </div>
      `;
      return;
    }

    let selectedShipping = totals.subtotal >= 250 ? 'standard' : 'standard';

    container.innerHTML = `
      <section class="checkout-page">
        <div class="container">
          <header class="checkout-header">
            <a href="#/home" class="checkout-header-logo">ATELIER AURÉLIA</a>
            <div style="margin-top: 0.25rem;">
              <span class="checkout-secure-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                256-Bit SSL Encrypted Atelier Checkout
              </span>
            </div>
          </header>

          <div class="checkout-layout">
            <!-- Left Column: Multi-Step Forms -->
            <div class="checkout-form-container">
              <!-- Express Checkout -->
              <div class="express-checkout-box">
                <span class="express-checkout-title">Express Luxury Checkout</span>
                <div class="express-btns-row">
                  <button type="button" class="btn-express-apple" onclick="App.simulateExpress('Apple Pay')"> Pay</button>
                  <button type="button" class="btn-express-google" onclick="App.simulateExpress('Google Pay')">G Pay</button>
                  <button type="button" class="btn-express-klarna" onclick="App.simulateExpress('Klarna')">Klarna.</button>
                </div>
              </div>

              <div class="checkout-divider">OR CONTINUE WITH ATELIER DISPATCH</div>

              <form id="checkout-main-form">
                <!-- Step 1: Customer Contact -->
                <div class="checkout-card-section" style="margin-bottom: 2rem;">
                  <h3 class="checkout-step-title">
                    <span class="step-num">1</span>
                    Client Information
                  </h3>
                  <div class="form-group">
                    <label class="form-label">Email Address for Dispatch & Tracking</label>
                    <input type="email" id="checkout-email" class="form-input" required placeholder="sophie.devon@atelier.com" value="sophie.devon@privemail.com" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Phone (For Courier Delivery Updates)</label>
                    <input type="tel" id="checkout-phone" class="form-input" placeholder="+1 (555) 349-2910" value="+1 (555) 234-8900" />
                  </div>
                </div>

                <!-- Step 2: Shipping Destination -->
                <div class="checkout-card-section" style="margin-bottom: 2rem;">
                  <h3 class="checkout-step-title">
                    <span class="step-num">2</span>
                    Shipping Destination
                  </h3>
                  <div class="form-row-2">
                    <div class="form-group">
                      <label class="form-label">First Name</label>
                      <input type="text" id="checkout-first-name" class="form-input" required placeholder="Sophie" value="Sophie" />
                    </div>
                    <div class="form-group">
                      <label class="form-label">Last Name</label>
                      <input type="text" id="checkout-last-name" class="form-input" required placeholder="Devon" value="Devon" />
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Street Address</label>
                    <input type="text" id="checkout-address" class="form-input" required placeholder="742 Evergreen Terrace, Suite 4B" value="452 West Broadway, Penthouse 4" />
                  </div>

                  <div class="form-row-3">
                    <div class="form-group">
                      <label class="form-label">City</label>
                      <input type="text" id="checkout-city" class="form-input" required placeholder="New York" value="New York" />
                    </div>
                    <div class="form-group">
                      <label class="form-label">State / Region</label>
                      <input type="text" id="checkout-state" class="form-input" required placeholder="NY" value="NY" />
                    </div>
                    <div class="form-group">
                      <label class="form-label">Postal / ZIP</label>
                      <input type="text" id="checkout-zip" class="form-input" required placeholder="10012" value="10012" />
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Country</label>
                    <select id="checkout-country" class="form-select">
                      <option value="United States" selected>United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="France">France</option>
                      <option value="Italy">Italy</option>
                      <option value="Japan">Japan</option>
                      <option value="Canada">Canada</option>
                      <option value="Switzerland">Switzerland</option>
                    </select>
                  </div>
                </div>

                <!-- Step 3: Delivery Speed -->
                <div class="checkout-card-section" style="margin-bottom: 2rem;">
                  <h3 class="checkout-step-title">
                    <span class="step-num">3</span>
                    Delivery Method
                  </h3>
                  <div class="shipping-options-group">
                    <label class="shipping-method-card selected" id="method-standard-label">
                      <div class="shipping-method-left">
                        <input type="radio" name="shipping-method" value="standard" checked id="radio-standard" />
                        <div class="shipping-method-info">
                          <span class="shipping-method-name">Atelier Standard Delivery (Carbon-Neutral)</span>
                          <span class="shipping-method-sub">3-5 business days • Silk garment presentation</span>
                        </div>
                      </div>
                      <span class="shipping-method-price">${totals.subtotal >= 250 ? 'Complimentary' : '$20'}</span>
                    </label>

                    <label class="shipping-method-card" id="method-express-label">
                      <div class="shipping-method-left">
                        <input type="radio" name="shipping-method" value="express" id="radio-express" />
                        <div class="shipping-method-info">
                          <span class="shipping-method-name">DHL Express Priority Courier</span>
                          <span class="shipping-method-sub">1-2 business days • Dedicated courier concierge</span>
                        </div>
                      </div>
                      <span class="shipping-method-price">$25</span>
                    </label>
                  </div>
                </div>

                <!-- Step 4: Secure Payment Details -->
                <div class="checkout-card-section" style="margin-bottom: 2rem;">
                  <h3 class="checkout-step-title">
                    <span class="step-num">4</span>
                    Payment & Security
                  </h3>

                  <div class="card-logos-row">
                    <span class="card-badge highlighted" id="card-badge-visa">VISA</span>
                    <span class="card-badge" id="card-badge-mastercard">MASTERCARD</span>
                    <span class="card-badge" id="card-badge-amex">AMEX</span>
                    <span class="card-badge">APPLE PAY</span>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Card Number</label>
                    <input type="text" 
                           id="checkout-card-number" 
                           class="form-input" 
                           required 
                           placeholder="4000 1234 5678 9010" 
                           value="4242 •••• •••• 4242" 
                           maxlength="19" />
                  </div>

                  <div class="form-row-2">
                    <div class="form-group">
                      <label class="form-label">Expiration Date (MM / YY)</label>
                      <input type="text" id="checkout-card-expiry" class="form-input" required placeholder="12 / 28" value="10 / 28" maxlength="7" />
                    </div>
                    <div class="form-group">
                      <label class="form-label">Security CVC</label>
                      <input type="password" id="checkout-card-cvc" class="form-input" required placeholder="890" value="890" maxlength="4" />
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Name on Card</label>
                    <input type="text" id="checkout-card-name" class="form-input" required placeholder="Sophie Devon" value="Sophie Devon" />
                  </div>
                </div>

                <!-- Complete Button -->
                <button type="submit" class="btn btn-primary" id="btn-submit-order" style="width: 100%; padding: 1.25rem; font-size: 0.95rem; letter-spacing: 0.16em;">
                  Complete Order • $<span id="checkout-btn-total">${totals.total}</span>
                </button>
              </form>
            </div>

            <!-- Right Column: Order Summary Panel -->
            <div class="checkout-summary-panel">
              <h3 class="checkout-summary-title">Order Summary (${cart.length} item${cart.length > 1 ? 's' : ''})</h3>

              <div class="checkout-items-list">
                ${cart.map(item => `
                  <div class="checkout-item">
                    <img class="checkout-item-img" src="${item.image}" alt="${item.name}" />
                    <div class="checkout-item-details">
                      <span class="checkout-item-name">${item.name}</span>
                      <span class="checkout-item-meta">${item.color} • Size ${item.size} • Qty ${item.quantity}</span>
                    </div>
                    <span class="checkout-item-price">$${item.price * item.quantity}</span>
                  </div>
                `).join('')}
              </div>

              <!-- Promo Code in Checkout -->
              <div style="margin-bottom: 1.5rem;">
                <form id="checkout-promo-form" style="display: flex; gap: 0.5rem;">
                  <input type="text" 
                         id="checkout-promo-input" 
                         class="form-input" 
                         style="padding: 0.65rem 0.85rem; font-size: 0.82rem; text-transform: uppercase;" 
                         placeholder="Promo Code (LUXURY10)" 
                         value="${discount ? discount.code : ''}" />
                  <button type="submit" class="btn btn-secondary" style="padding: 0.65rem 1rem; font-size: 0.75rem;">Apply</button>
                </form>
                ${discount ? `<div class="promo-tag" style="margin-top:0.4rem;">✓ ${discount.label} applied</div>` : ''}
              </div>

              <div class="cart-summary-line">
                <span>Subtotal</span>
                <span id="checkout-subtotal">$${totals.subtotal}</span>
              </div>
              ${totals.discountAmount > 0 ? `
                <div class="cart-summary-line" style="color: var(--accent-gold);">
                  <span>Privilege Discount</span>
                  <span id="checkout-discount">-$${totals.discountAmount}</span>
                </div>
              ` : ''}
              <div class="cart-summary-line">
                <span>Estimated Shipping</span>
                <span id="checkout-shipping-val">${totals.shippingCost === 0 ? 'Complimentary' : '$' + totals.shippingCost}</span>
              </div>
              <div class="cart-summary-line">
                <span>Estimated Sales Tax</span>
                <span id="checkout-tax">$${totals.taxAmount}</span>
              </div>
              <div class="cart-summary-line total-line">
                <span>Total Due</span>
                <span id="checkout-grand-total">$${totals.total}</span>
              </div>

              <div class="checkout-perks-box">
                <div class="checkout-perk">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>30-Day Complimentary Home Concierge Returns</span>
                </div>
                <div class="checkout-perk">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Authenticity & Small-Batch Certified</span>
                </div>
                <div class="checkout-perk">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Encrypted 256-Bit Financial Security</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    // Recalculate shipping upon radio selection
    function refreshTotals(shippingMethod) {
      const newTotals = Store.getTotals(shippingMethod);
      container.querySelector('#checkout-shipping-val').textContent = newTotals.shippingCost === 0 ? 'Complimentary' : '$' + newTotals.shippingCost;
      container.querySelector('#checkout-tax').textContent = '$' + newTotals.taxAmount;
      container.querySelector('#checkout-grand-total').textContent = '$' + newTotals.total;
      container.querySelector('#checkout-btn-total').textContent = newTotals.total;
    }

    const radStandard = container.querySelector('#radio-standard');
    const radExpress = container.querySelector('#radio-express');
    const lblStandard = container.querySelector('#method-standard-label');
    const lblExpress = container.querySelector('#method-express-label');

    radStandard.addEventListener('change', () => {
      lblStandard.classList.add('selected');
      lblExpress.classList.remove('selected');
      refreshTotals('standard');
    });

    radExpress.addEventListener('change', () => {
      lblExpress.classList.add('selected');
      lblStandard.classList.remove('selected');
      refreshTotals('express');
    });

    // Promo code handler
    const checkoutPromoForm = container.querySelector('#checkout-promo-form');
    checkoutPromoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = container.querySelector('#checkout-promo-input').value;
      const res = Store.applyDiscount(code);
      if (res.success) {
        Toast.success(`Discount invitation ${res.discount.label} applied!`);
        renderCheckout(container);
      } else {
        Toast.error(res.message);
      }
    });

    // Handle form submit
    const checkoutForm = container.querySelector('#checkout-main-form');
    checkoutForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = container.querySelector('#btn-submit-order');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span style="display:inline-block; animation: spin 1s linear infinite;">↻</span>
        <span>Securing Atelier Dispatch...</span>
      `;

      const shippingMethodVal = radExpress.checked ? 'express' : 'standard';

      const orderPayload = {
        items: cart,
        customer: {
          email: container.querySelector('#checkout-email').value,
          phone: container.querySelector('#checkout-phone').value,
          firstName: container.querySelector('#checkout-first-name').value,
          lastName: container.querySelector('#checkout-last-name').value
        },
        shippingAddress: {
          address: container.querySelector('#checkout-address').value,
          city: container.querySelector('#checkout-city').value,
          state: container.querySelector('#checkout-state').value,
          zip: container.querySelector('#checkout-zip').value,
          country: container.querySelector('#checkout-country').value
        },
        shippingMethod: shippingMethodVal,
        discountCode: discount ? discount.code : null,
        payment: {
          method: 'card',
          cardNumber: container.querySelector('#checkout-card-number').value
        }
      };

      try {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload)
        });

        const data = await response.json();
        if (data.success && data.order) {
          // Store order in session and clear cart
          sessionStorage.setItem('last_order', JSON.stringify(data.order));
          Store.clearCart();
          window.location.hash = `#/order-success?id=${data.order.orderId}`;
        } else {
          Toast.error(data.message || 'Checkout failed. Please check your details.');
          submitBtn.disabled = false;
          submitBtn.textContent = 'Complete Order';
        }
      } catch (err) {
        // Fallback simulation in case API is running purely client-side
        console.warn('Backend API fallback triggered:', err);
        const fallbackOrder = {
          orderId: 'AUR-' + Math.floor(100000 + Math.random() * 900000),
          createdAt: new Date().toISOString(),
          customer: orderPayload.customer,
          shippingAddress: orderPayload.shippingAddress,
          shippingMethod: shippingMethodVal === 'express' ? 'DHL Express Priority Courier' : 'Atelier White-Glove Standard',
          trackingNumber: 'DHL-LUX-' + Math.floor(10000000 + Math.random() * 90000000),
          items: cart,
          pricing: totals
        };
        sessionStorage.setItem('last_order', JSON.stringify(fallbackOrder));
        Store.clearCart();
        window.location.hash = `#/order-success?id=${fallbackOrder.orderId}`;
      }
    });
  }

  // View: Order Success Confirmation Receipt
  function renderOrderSuccess(container, params = {}) {
    let order = null;
    try {
      const saved = sessionStorage.getItem('last_order');
      if (saved) order = JSON.parse(saved);
    } catch (e) {}

    const orderId = params.id || (order ? order.orderId : 'AUR-849201');
    const customerName = order?.customer ? `${order.customer.firstName} ${order.customer.lastName}` : 'Valued Patron';
    const trackingNumber = order?.trackingNumber || 'DHL-LUX-84920194';
    const items = order?.items || [];
    const total = order?.pricing ? order.pricing.total : '$0';

    container.innerHTML = `
      <section class="section-spacing">
        <div class="container">
          <div class="order-success-container">
            <div class="success-icon-wrap">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <span class="eyebrow-tag">Order Confirmed</span>
            <h1 class="order-success-title">Thank You, ${customerName}</h1>
            <p class="order-success-lead">
              Your garments have entered preparation at our northern Italian atelier. A formal receipt and white-glove dispatch notification have been dispatched to your email.
            </p>

            <div class="order-meta-box">
              <div class="order-meta-item">
                <span>Order Reference</span>
                <strong>#${orderId}</strong>
              </div>
              <div class="order-meta-item">
                <span>Courier Tracking</span>
                <strong>${trackingNumber}</strong>
              </div>
              <div class="order-meta-item">
                <span>Estimated Arrival</span>
                <strong>3–5 Business Days</strong>
              </div>
            </div>

            ${items.length > 0 ? `
              <div style="text-align: left; margin-bottom: 2rem; border: 1px solid var(--border-light); border-radius: var(--radius-xs); padding: 1.5rem; background: var(--bg-surface);">
                <h4 style="font-family: var(--font-serif); font-size: 1.15rem; margin-bottom: 1rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.5rem;">Purchased Silhouettes</h4>
                <div style="display: flex; flex-direction: column; gap: 0.85rem;">
                  ${items.map(it => `
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.88rem;">
                      <div>
                        <strong>${it.name}</strong>
                        <span style="color: var(--text-muted); font-size: 0.78rem; display: block;">${it.color} • Size ${it.size} • Qty ${it.quantity}</span>
                      </div>
                      <span style="font-weight: 600;">$${it.price * it.quantity}</span>
                    </div>
                  `).join('')}
                </div>
                <div style="display: flex; justify-content: space-between; font-weight: 700; margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--border-light);">
                  <span>Total Paid</span>
                  <span>$${total}</span>
                </div>
              </div>
            ` : ''}

            <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
              <a href="#/shop" class="btn btn-primary">Continue Browsing Atelier</a>
              <button class="btn btn-secondary" onclick="window.print()">Print Official Receipt</button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // View: About Atelier
  function renderAbout(container) {
    container.innerHTML = `
      <section class="container">
        <div class="about-hero">
          <span class="eyebrow-tag">Atelier Philosophy</span>
          <h1 class="about-title">The Architecture of Thoughtful Craft</h1>
          <p class="about-lead">
            Atelier Aurélia was established with a singular objective: to strip fashion of ephemeral noise and return to the serene integrity of master tailoring, unblended natural fibers, and timeless proportion.
          </p>
        </div>

        <div class="about-story-grid">
          <div class="editorial-media-box">
            <img src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80" alt="Master Tailoring at Atelier Aurélia" />
          </div>
          <div class="about-story-text">
            <span class="eyebrow-tag">Biella Mills, Northern Italy</span>
            <h3>Where Fabric Dictates Form</h3>
            <p>
              In an era dominated by rapid synthetic production, we remain anchored in the foothills of Piedmont and the textile mills of Biella. Here, spring water rich in alpine minerals rinses our Mongolian cashmere and virgin Merino wools, giving our fabrics a hand that cannot be manufactured artificially.
            </p>
            <p>
              Our patterns are cut with architectural consideration: high armholes for unimpeded movement, soft canvassing that molds to your silhouette over time, and double-stitched silk seams that endure across generations.
            </p>
          </div>
        </div>

        <div class="section-header" style="margin-top: 5rem; margin-bottom: 2rem;">
          <span class="eyebrow-tag">Our Ethical Commitments</span>
          <h2 class="section-title">The Three Pillars</h2>
        </div>

        <div class="about-pillars-grid">
          <div class="about-pillar-card">
            <h4>1. Zero Overproduction</h4>
            <p>We produce exclusively in small, numbered artisan batches. When a roll of vintage wool or silk runs out, the style concludes gracefully. We never incinerate or liquidate surplus stock.</p>
          </div>
          <div class="about-pillar-card">
            <h4>2. Traceable Origins</h4>
            <p>From Todd & Duncan Scottish cashmere spinning to Como silk printers, every supplier is personally audited for fair wages, humane livestock husbandry, and ecological stewardship.</p>
          </div>
          <div class="about-pillar-card">
            <h4>3. Lifetime Repair Pledge</h4>
            <p>Every Aurélia overcoat and suit is backed by our complimentary atelier repair service. If a horn button loosens or an elbow needs re-weaving, our craftsmen restore it.</p>
          </div>
        </div>
      </section>
    `;
  }

  // View: FAQ Page
  function renderFaq(container) {
    container.innerHTML = `
      <section class="container faq-section">
        <div class="section-header">
          <span class="eyebrow-tag">Concierge Answers</span>
          <h1 class="section-title">Frequently Asked Questions</h1>
          <p class="section-description">
            Everything you need to know about our tailoring, sizing consultations, carbon-neutral worldwide courier, and care.
          </p>
        </div>

        <div class="faq-group">
          <h3 class="faq-group-title">Sizing, Cut & Fit Consultations</h3>

          <div class="accordion-item open">
            <button class="accordion-header">
              <span>How do Atelier Aurélia garments fit?</span>
              <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-body">
              <p>Our outerwear and tailoring are engineered with a relaxed yet structured European drape. If you prefer a tailored, closer silhouette, we suggest taking your standard size. For an oversized cocoon look, our pieces accommodate layering with ease. Consult our Atelier Size Guide on any product page for exact centimetre and inch specifications.</p>
            </div>
          </div>

          <div class="accordion-item">
            <button class="accordion-header">
              <span>Can I schedule a virtual sizing appointment?</span>
              <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-body">
              <p>Yes. Our client advisors are available via video concierge Monday through Saturday. We review your measurements and advise on proportional pairings. Contact concierge@atelieraurelia.com to book your session.</p>
            </div>
          </div>
        </div>

        <div class="faq-group">
          <h3 class="faq-group-title">Global Shipping & Delivery</h3>

          <div class="accordion-item open">
            <button class="accordion-header">
              <span>What are your international delivery options?</span>
              <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-body">
              <p>We provide complimentary white-glove courier shipping on all international orders exceeding $250 USD. Orders are insured against loss or damage and tracked with live milestone updates via DHL Express.</p>
            </div>
          </div>

          <div class="accordion-item">
            <button class="accordion-header">
              <span>Are customs duties and import taxes included?</span>
              <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-body">
              <p>For shipments to North America, the European Union, the United Kingdom, and Japan, all duties and taxes are calculated and settled transparently during checkout with zero surprise fees upon arrival.</p>
            </div>
          </div>
        </div>

        <div class="faq-group">
          <h3 class="faq-group-title">Returns, Exchanges & Care</h3>

          <div class="accordion-item open">
            <button class="accordion-header">
              <span>What is your return policy?</span>
              <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-body">
              <p>We offer 30-day complimentary home pickup returns for all unworn garments with security tags attached. A prepaid return courier slip is included in your parcel.</p>
            </div>
          </div>

          <div class="accordion-item">
            <button class="accordion-header">
              <span>How do I preserve 100% Cashmere and Silk?</span>
              <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-body">
              <p>Cashmere thrives when rested between wears. We advise airing after use and dry cleaning only when necessary. Mulberry silk should be steamed with a clean cloth barrier or dry cleaned by a luxury specialist.</p>
            </div>
          </div>
        </div>
      </section>
    `;

    // Attach accordion triggers
    container.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        header.parentElement.classList.toggle('open');
      });
    });
  }

  // View: Contact & Concierge
  function renderContact(container) {
    container.innerHTML = `
      <section class="container contact-section">
        <div class="section-header">
          <span class="eyebrow-tag">Atelier Concierge</span>
          <h1 class="section-title">Client Advisory & Inquiries</h1>
          <p class="section-description">
            Whether inquiring about custom measurements, archive sourcing, or wholesale appointments, our client advisors are at your service.
          </p>
        </div>

        <div class="contact-layout">
          <div class="contact-info-panel">
            <h3>Direct Concierge</h3>
            <p style="margin-bottom: 1.5rem; line-height: 1.8;">
              Our dedicated client advisory team is available Monday through Friday, 9:00 AM to 7:00 PM CET.
            </p>

            <p style="font-weight: 600; color: var(--text-primary); margin-bottom: 0.35rem;">General Inquiries</p>
            <p style="color: var(--accent-gold); margin-bottom: 1.5rem;">concierge@atelieraurelia.com</p>

            <p style="font-weight: 600; color: var(--text-primary); margin-bottom: 0.35rem;">Concierge Line</p>
            <p style="color: var(--accent-gold); margin-bottom: 2rem;">+33 (0) 1 42 68 50 00</p>

            <div class="boutique-card">
              <h5>Atelier Flagship Paris</h5>
              <p>18 Place Vendôme, 75001 Paris, France</p>
            </div>

            <div class="boutique-card">
              <h5>Atelier Flagship Milano</h5>
              <p>Via Montenapoleone 14, 20121 Milano, Italy</p>
            </div>

            <div class="boutique-card">
              <h5>Atelier Flagship New York</h5>
              <p>452 West Broadway, SoHo, NY 10012, USA</p>
            </div>
          </div>

          <div class="contact-form-box">
            <h3 style="font-family: var(--font-serif); font-size: 1.6rem; margin-bottom: 1.5rem;">Send a Concierge Note</h3>
            <form id="contact-form">
              <div class="form-row-2">
                <div class="form-group">
                  <label class="form-label">Full Name</label>
                  <input type="text" id="contact-name" class="form-input" required placeholder="Elena Rostova" />
                </div>
                <div class="form-group">
                  <label class="form-label">Email</label>
                  <input type="email" id="contact-email" class="form-input" required placeholder="elena@example.com" />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Inquiry Subject</label>
                <select id="contact-subject" class="form-select">
                  <option value="sizing">Sizing & Silhouette Consultation</option>
                  <option value="order">Order Status or Dispatch Tracking</option>
                  <option value="private-appointment">Private Boutique Appointment</option>
                  <option value="press">Press & Editorial Loan Request</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Message</label>
                <textarea id="contact-message" class="form-textarea" rows="5" required placeholder="Please let us know how we can assist your wardrobe curation..."></textarea>
              </div>

              <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
                Send Inscription to Concierge
              </button>
            </form>
          </div>
        </div>
      </section>
    `;

    const contactForm = container.querySelector('#contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = container.querySelector('#contact-name').value;
        const email = container.querySelector('#contact-email').value;
        const subject = container.querySelector('#contact-subject').value;
        const message = container.querySelector('#contact-message').value;

        try {
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, subject, message })
          });
          const data = await res.json();
          Toast.success(data.message || `Thank you, ${name}. Your inquiry has been dispatched to our concierge.`);
          contactForm.reset();
        } catch (err) {
          Toast.success(`Thank you, ${name}. Your message has been received by the Atelier Concierge.`);
          contactForm.reset();
        }
      });
    }
  }

  function init() {
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }

  return {
    init,
    navigate: (route) => {
      window.location.hash = `#/${route}`;
    }
  };
})();

if (typeof window !== 'undefined') {
  window.Router = Router;
}
