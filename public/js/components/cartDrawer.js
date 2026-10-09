// Shopping Bag Slide-Over Drawer Component
const CartDrawer = (() => {
  let drawerEl = null;
  let overlayEl = null;

  function init() {
    drawerEl = document.getElementById('cart-drawer');
    overlayEl = document.getElementById('cart-drawer-overlay');

    if (!drawerEl || !overlayEl) return;

    // Overlay click closes drawer
    overlayEl.addEventListener('click', close);

    // Close button
    const closeBtn = drawerEl.querySelector('.btn-close-cart');
    if (closeBtn) closeBtn.addEventListener('click', close);

    // Subscribe to store updates
    Store.subscribe(render);
  }

  function open() {
    if (drawerEl && overlayEl) {
      drawerEl.classList.add('open');
      overlayEl.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function close() {
    if (drawerEl && overlayEl) {
      drawerEl.classList.remove('open');
      overlayEl.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function render(state) {
    if (!drawerEl) return;

    const { cart, totals, discount } = state;
    const itemsListEl = drawerEl.querySelector('#cart-items-list');
    const shippingProgressEl = drawerEl.querySelector('#cart-shipping-progress');
    const footerEl = drawerEl.querySelector('#cart-footer-content');
    const badgeCounters = document.querySelectorAll('.cart-count-badge');

    // Update global badge counters
    const totalCount = Store.getCartCount();
    badgeCounters.forEach(b => {
      b.textContent = totalCount;
      b.style.display = totalCount > 0 ? 'flex' : 'none';
      b.classList.add('pulse');
      setTimeout(() => b.classList.remove('pulse'), 300);
    });

    // Update Shipping Bar
    if (shippingProgressEl) {
      const freeThreshold = 250;
      const subtotal = totals.subtotal;
      const progressPercent = Math.min(100, Math.round((subtotal / freeThreshold) * 100));

      if (subtotal >= freeThreshold) {
        shippingProgressEl.innerHTML = `
          <div class="shipping-bar-text">✨ You've unlocked <strong>Complimentary Worldwide Courier</strong>!</div>
          <div class="shipping-progress-track">
            <div class="shipping-progress-fill" style="width: 100%;"></div>
          </div>
        `;
      } else {
        const remaining = freeThreshold - subtotal;
        shippingProgressEl.innerHTML = `
          <div class="shipping-bar-text">Add <strong>$${remaining}</strong> more for <strong>Complimentary Shipping</strong></div>
          <div class="shipping-progress-track">
            <div class="shipping-progress-fill" style="width: ${progressPercent}%;"></div>
          </div>
        `;
      }
    }

    // Render Items
    if (!itemsListEl) return;

    if (cart.length === 0) {
      itemsListEl.innerHTML = `
        <div class="cart-empty-state">
          <svg class="cart-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <h3 class="cart-empty-title">Your Bag is Empty</h3>
          <p class="cart-empty-text">Timeless pieces crafted with architectural discipline await in our collection.</p>
          <a href="#/shop" class="btn btn-primary" onclick="CartDrawer.close()">Explore Atelier Shop</a>
        </div>
      `;
      if (footerEl) footerEl.style.display = 'none';
      return;
    }

    if (footerEl) footerEl.style.display = 'block';

    itemsListEl.innerHTML = cart.map(item => `
      <div class="cart-item" data-cart-id="${item.cartItemId}">
        <img class="cart-item-image" src="${item.image}" alt="${item.name}" />
        <div class="cart-item-info">
          <h4 class="cart-item-name">${item.name}</h4>
          <span class="cart-item-variant">${item.color} • Size ${item.size}</span>
          <span class="cart-item-price">$${item.price}</span>
          <div class="cart-item-stepper">
            <button class="cart-qty-minus" data-action="minus" data-id="${item.cartItemId}">−</button>
            <span>${item.quantity}</span>
            <button class="cart-qty-plus" data-action="plus" data-id="${item.cartItemId}">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-action="remove" data-id="${item.cartItemId}" title="Remove Item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    `).join('');

    // Attach item action handlers
    itemsListEl.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        const cartId = btn.dataset.id;
        const item = cart.find(i => i.cartItemId === cartId);
        if (!item) return;

        if (action === 'plus') {
          Store.updateQuantity(cartId, item.quantity + 1);
        } else if (action === 'minus') {
          Store.updateQuantity(cartId, item.quantity - 1);
        } else if (action === 'remove') {
          Store.removeFromCart(cartId);
          Toast.success(`Removed "${item.name}" from your bag.`);
        }
      });
    });

    // Update Footer Calculations
    if (footerEl) {
      footerEl.innerHTML = `
        <div class="cart-promo-section">
          <form id="cart-promo-form" class="cart-promo-row">
            <input type="text" 
                   id="cart-promo-input" 
                   class="cart-promo-input" 
                   placeholder="Promo Code (e.g. LUXURY10)" 
                   value="${discount ? discount.code : ''}" />
            <button type="submit" class="btn-promo-apply">${discount ? 'Applied' : 'Apply'}</button>
          </form>
          ${discount ? `
            <div class="promo-tag">
              <span>✓ ${discount.label} applied</span>
              <button id="btn-remove-discount" style="text-decoration:underline; font-size:0.7rem; color:var(--text-muted); margin-left:0.5rem;">Remove</button>
            </div>
          ` : ''}
        </div>

        <div class="cart-summary-line">
          <span>Subtotal</span>
          <span>$${totals.subtotal}</span>
        </div>
        ${totals.discountAmount > 0 ? `
          <div class="cart-summary-line" style="color: var(--accent-gold);">
            <span>Privilege Discount</span>
            <span>-$${totals.discountAmount}</span>
          </div>
        ` : ''}
        <div class="cart-summary-line">
          <span>Shipping</span>
          <span>${totals.shippingCost === 0 ? 'Complimentary' : '$' + totals.shippingCost}</span>
        </div>
        <div class="cart-summary-line">
          <span>Estimated Sales Tax</span>
          <span>$${totals.taxAmount}</span>
        </div>
        <div class="cart-summary-line total-line">
          <span>Estimated Total</span>
          <span>$${totals.total}</span>
        </div>

        <a href="#/checkout" class="btn-checkout" onclick="CartDrawer.close()">
          <span>Proceed to Checkout</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>

        <div class="cart-security-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span>Guaranteed Authentic • 256-Bit Encrypted Atelier Checkout</span>
        </div>
      `;

      // Promo code form handler
      const promoForm = footerEl.querySelector('#cart-promo-form');
      if (promoForm) {
        promoForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const input = footerEl.querySelector('#cart-promo-input');
          const res = Store.applyDiscount(input.value);
          if (res.success) {
            Toast.success(`Privilege invitation applied: ${res.discount.label}!`);
          } else {
            Toast.error(res.message);
          }
        });
      }

      const removeDiscountBtn = footerEl.querySelector('#btn-remove-discount');
      if (removeDiscountBtn) {
        removeDiscountBtn.addEventListener('click', (e) => {
          e.preventDefault();
          Store.removeDiscount();
          Toast.success('Discount invitation removed.');
        });
      }
    }
  }

  return {
    init,
    open,
    close
  };
})();

if (typeof window !== 'undefined') {
  window.CartDrawer = CartDrawer;
}
