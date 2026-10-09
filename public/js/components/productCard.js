// Product Card UI Component
const ProductCard = {
  render(product) {
    const isWishlisted = Store.isWishlisted(product.id);
    const primaryImg = product.images[0];
    const secondaryImg = product.images[1] || product.images[0];
    const hasSecondary = product.images.length > 1;

    const badgeHtml = product.badge
      ? `<span class="product-card-badge">${product.badge}</span>`
      : '';

    const originalPriceHtml = product.originalPrice
      ? `<span class="product-card-price-original">$${product.originalPrice}</span>`
      : '';

    const swatchesHtml = (product.colors || [])
      .slice(0, 4)
      .map((c, i) => `
        <span class="swatch-dot ${i === 0 ? 'active' : ''}" 
              style="background-color: ${c.hex};" 
              title="${c.name}"></span>
      `)
      .join('');

    const card = document.createElement('article');
    card.className = `product-card ${!hasSecondary ? 'no-secondary' : ''}`;
    card.dataset.id = product.id;

    card.innerHTML = `
      <div class="product-card-image-wrap" data-link="#/product/${product.id}">
        ${badgeHtml}
        <button class="product-card-wishlist ${isWishlisted ? 'active' : ''}" 
                title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}"
                data-wishlist-id="${product.id}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        <img class="product-card-img-primary" 
             src="${primaryImg}" 
             alt="${product.name}" 
             loading="lazy" />
        ${hasSecondary ? `<img class="product-card-img-secondary" src="${secondaryImg}" alt="${product.name} styling view" loading="lazy" />` : ''}

        <div class="product-card-actions">
          <button class="btn-card-quickview" data-quickview-id="${product.id}">Quick View</button>
          <button class="btn-card-add" data-quickadd-id="${product.id}">Add to Bag</button>
        </div>
      </div>

      <div class="product-card-info">
        <span class="product-card-category">${product.categoryName}</span>
        <h3 class="product-card-title">
          <a href="#/product/${product.id}">${product.name}</a>
        </h3>
        <div class="product-card-price-row">
          <span class="product-card-price">$${product.price}</span>
          ${originalPriceHtml}
        </div>
        <div class="product-card-swatches">
          ${swatchesHtml}
        </div>
      </div>
    `;

    // Event Listeners on Card
    const imageWrap = card.querySelector('.product-card-image-wrap');
    imageWrap.addEventListener('click', (e) => {
      // Ignore if wishlist or action button clicked
      if (e.target.closest('.product-card-wishlist') || e.target.closest('.product-card-actions')) {
        return;
      }
      window.location.hash = `#/product/${product.id}`;
    });

    const wishlistBtn = card.querySelector('.product-card-wishlist');
    wishlistBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const active = Store.toggleWishlist(product.id);
      wishlistBtn.classList.toggle('active', active);
      const svg = wishlistBtn.querySelector('svg');
      svg.setAttribute('fill', active ? 'currentColor' : 'none');
      Toast.success(active ? `Saved "${product.name}" to your wishlist.` : `Removed from wishlist.`);
    });

    const quickViewBtn = card.querySelector('.btn-card-quickview');
    quickViewBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      App.openQuickView(product.id);
    });

    const quickAddBtn = card.querySelector('.btn-card-add');
    quickAddBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      Store.addToCart(product, {
        size: product.sizes[0] || 'M',
        color: product.colors[0]?.name || 'Standard',
        quantity: 1
      });
      Toast.success(`Added "${product.name}" to your shopping bag.`);
      CartDrawer.open();
    });

    return card;
  }
};

if (typeof window !== 'undefined') {
  window.ProductCard = ProductCard;
}
