// Atelier Aurélia Main Application Controller
const App = (() => {
  let quickViewModal = null;
  let sizeGuideModal = null;

  function init() {
    // Initialize components
    CartDrawer.init();
    SearchModal.init();
    Router.init();

    // Cache modals
    quickViewModal = document.getElementById('quick-view-modal');
    sizeGuideModal = document.getElementById('size-guide-modal');

    setupHeaderScroll();
    setupMobileNav();
    setupGlobalModals();
    setupNewsletter();
    setupWishlistButton();

    // Update wishlist counter badge
    Store.subscribe(updateWishlistBadge);
  }

  function setupHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  function setupMobileNav() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const drawer = document.getElementById('mobile-nav-drawer');
    const backdrop = document.getElementById('mobile-drawer-backdrop');
    const closeBtn = document.querySelector('.btn-close-mobile-nav');

    if (!toggle || !drawer || !backdrop) return;

    function openMenu() {
      drawer.classList.add('open');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      drawer.classList.remove('open');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);

    // Close when tapping link
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });
  }

  function setupGlobalModals() {
    // Close on backdrop or X button
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.closest('.modal-close-btn')) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(m => {
          m.classList.remove('active');
          document.body.style.overflow = '';
        });
      }
    });
  }

  function openQuickView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product || !quickViewModal) return;

    let selectedSize = product.sizes ? product.sizes[0] : 'M';
    let selectedColor = product.colors ? product.colors[0].name : 'Standard';

    const contentBox = quickViewModal.querySelector('#quick-view-content');
    contentBox.innerHTML = `
      <div class="quick-view-grid">
        <div>
          <img class="quick-view-img" src="${product.images[0]}" alt="${product.name}" />
        </div>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <span class="eyebrow-tag">${product.categoryName}</span>
            <h2 style="font-family: var(--font-serif); font-size: 1.8rem; line-height: 1.2;">${product.name}</h2>
            <div style="font-size: 1.35rem; font-weight: 600; font-family: var(--font-serif); margin-top: 0.5rem; color: var(--text-primary);">$${product.price}</div>
          </div>

          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">${product.description}</p>

          <div>
            <span style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">Select Size:</span>
            <div style="display: flex; gap: 0.5rem; margin-top: 0.4rem;">
              ${(product.sizes || []).map((sz, i) => `
                <button class="pdp-size-btn ${i === 0 ? 'active' : ''}" data-qv-size="${sz}">${sz}</button>
              `).join('')}
            </div>
          </div>

          <div style="display: flex; gap: 1rem; margin-top: 1rem;">
            <button class="btn btn-primary" id="btn-qv-add" style="flex: 1;">Add to Bag • $${product.price}</button>
            <a href="#/product/${product.id}" class="btn btn-secondary" onclick="App.closeModals()">Full View</a>
          </div>
        </div>
      </div>
    `;

    // Size button selection
    const sizeBtns = contentBox.querySelectorAll('[data-qv-size]');
    sizeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sizeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedSize = btn.dataset.qvSize;
      });
    });

    // Add to Bag action
    contentBox.querySelector('#btn-qv-add').addEventListener('click', () => {
      Store.addToCart(product, {
        size: selectedSize,
        color: selectedColor,
        quantity: 1
      });
      Toast.success(`Added ${product.name} (Size ${selectedSize}) to bag.`);
      closeModals();
      CartDrawer.open();
    });

    quickViewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function openSizeGuide() {
    if (!sizeGuideModal) return;
    sizeGuideModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModals() {
    document.querySelectorAll('.modal-overlay.active').forEach(m => {
      m.classList.remove('active');
    });
    document.body.style.overflow = '';
  }

  function updateWishlistBadge() {
    const count = Store.getWishlistCount();
    const badge = document.getElementById('wishlist-count-badge');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  function setupNewsletter() {
    const form = document.getElementById('global-newsletter-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const email = input.value;

      try {
        const res = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        Toast.success(data.message || 'Welcome to Atelier Aurélia Privé! Your 10% code is LUXURY10.');
        input.value = '';
      } catch (err) {
        Toast.success('Welcome to Atelier Aurélia Privé! Your 10% code is LUXURY10.');
        input.value = '';
      }
    });
  }

  function setupWishlistButton() {
    const btn = document.getElementById('btn-nav-wishlist');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const count = Store.getWishlistCount();
      if (count === 0) {
        Toast.show('Your Atelier wishlist is currently empty. Click the heart icon on any silhouette to save it.');
      } else {
        Toast.success(`You have ${count} silhouette${count > 1 ? 's' : ''} saved in your private wishlist.`);
      }
    });
  }

  function simulateExpress(methodName) {
    Toast.success(`Authorizing ${methodName} payment token...`);
    setTimeout(() => {
      const { cart, totals } = Store.getState();
      const mockOrder = {
        orderId: 'AUR-' + Math.floor(100000 + Math.random() * 900000),
        createdAt: new Date().toISOString(),
        customer: {
          firstName: 'Sophie',
          lastName: 'Devon',
          email: 'sophie.devon@privemail.com'
        },
        shippingAddress: {
          address: '452 West Broadway',
          city: 'New York',
          state: 'NY',
          country: 'United States'
        },
        shippingMethod: 'Express DHL Courier',
        trackingNumber: 'DHL-LUX-' + Math.floor(10000000 + Math.random() * 90000000),
        items: cart,
        pricing: totals,
        paymentSummary: { method: methodName }
      };
      sessionStorage.setItem('last_order', JSON.stringify(mockOrder));
      Store.clearCart();
      window.location.hash = `#/order-success?id=${mockOrder.orderId}`;
    }, 1200);
  }

  return {
    init,
    openQuickView,
    openSizeGuide,
    closeModals,
    simulateExpress
  };
})();

// Boot on DOM ready
document.addEventListener('DOMContentLoaded', App.init);

if (typeof window !== 'undefined') {
  window.App = App;
}
