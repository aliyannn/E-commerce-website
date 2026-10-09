// Global State Management for Atelier Aurélia E-Commerce
const Store = (() => {
  const STORAGE_KEYS = {
    CART: 'aurelia_cart_v1',
    WISHLIST: 'aurelia_wishlist_v1',
    DISCOUNT: 'aurelia_discount_v1'
  };

  // State
  let cart = [];
  let wishlist = new Set();
  let discount = null;
  const subscribers = new Set();

  // Load persisted state
  try {
    const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
    if (savedCart) cart = JSON.parse(savedCart);

    const savedWishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    if (savedWishlist) wishlist = new Set(JSON.parse(savedWishlist));

    const savedDiscount = localStorage.getItem(STORAGE_KEYS.DISCOUNT);
    if (savedDiscount) discount = JSON.parse(savedDiscount);
  } catch (e) {
    console.warn('Storage access restricted:', e);
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify([...wishlist]));
      if (discount) {
        localStorage.setItem(STORAGE_KEYS.DISCOUNT, JSON.stringify(discount));
      } else {
        localStorage.removeItem(STORAGE_KEYS.DISCOUNT);
      }
    } catch (e) {}
    notify();
  }

  function notify() {
    subscribers.forEach(cb => {
      try {
        cb(getState());
      } catch (err) {
        console.error('Subscriber error:', err);
      }
    });
  }

  function getState() {
    return {
      cart: [...cart],
      wishlist: new Set(wishlist),
      discount: discount ? { ...discount } : null,
      totals: getTotals()
    };
  }

  function getTotals(shippingMethod = 'standard') {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    let discountAmount = 0;
    if (discount) {
      discountAmount = Math.round(subtotal * (discount.rate || 0.10));
    }

    const freeShippingThreshold = 250;
    let shippingCost = 0;
    if (shippingMethod === 'express') {
      shippingCost = 25;
    } else {
      shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 20;
    }

    const taxAmount = Math.round((subtotal - discountAmount) * 0.08); // 8% sales tax
    const total = Math.max(0, subtotal - discountAmount + shippingCost + taxAmount);

    return {
      subtotal,
      discountAmount,
      shippingCost,
      taxAmount,
      total,
      freeShippingThreshold,
      amountToFreeShipping: Math.max(0, freeShippingThreshold - subtotal)
    };
  }

  return {
    subscribe(callback) {
      subscribers.add(callback);
      callback(getState());
      return () => subscribers.delete(callback);
    },

    getState,
    getTotals,

    addToCart(product, options = {}) {
      const size = options.size || (product.sizes ? product.sizes[0] : 'Standard');
      const color = options.color || (product.colors ? product.colors[0].name : 'Default');
      const quantity = Math.max(1, parseInt(options.quantity, 10) || 1);
      const cartItemId = `${product.id}_${size}_${color}`;

      const existingIndex = cart.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
      } else {
        cart.push({
          cartItemId,
          id: product.id,
          name: product.name,
          categoryName: product.categoryName,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.images[0],
          size,
          color,
          quantity
        });
      }

      saveState();
      return cartItemId;
    },

    updateQuantity(cartItemId, newQty) {
      const qty = parseInt(newQty, 10);
      if (qty <= 0) {
        this.removeFromCart(cartItemId);
        return;
      }
      const item = cart.find(i => i.cartItemId === cartItemId);
      if (item) {
        item.quantity = qty;
        saveState();
      }
    },

    removeFromCart(cartItemId) {
      cart = cart.filter(item => item.cartItemId !== cartItemId);
      saveState();
    },

    clearCart() {
      cart = [];
      saveState();
    },

    applyDiscount(code) {
      const cleanCode = (code || '').trim().toUpperCase();
      if (cleanCode === 'LUXURY10' || cleanCode === 'WELCOME10') {
        discount = { code: cleanCode, rate: 0.10, label: '10% Welcome Invitation' };
        saveState();
        return { success: true, discount };
      } else if (cleanCode === 'AURELIA' || cleanCode === 'ATELIER15') {
        discount = { code: cleanCode, rate: 0.15, label: '15% Atelier Privilege' };
        saveState();
        return { success: true, discount };
      }
      return { success: false, message: 'Invalid or expired invitation code. Try LUXURY10 or AURELIA.' };
    },

    removeDiscount() {
      discount = null;
      saveState();
    },

    toggleWishlist(productId) {
      if (wishlist.has(productId)) {
        wishlist.delete(productId);
      } else {
        wishlist.add(productId);
      }
      saveState();
      return wishlist.has(productId);
    },

    isWishlisted(productId) {
      return wishlist.has(productId);
    },

    getCartCount() {
      return cart.reduce((count, item) => count + item.quantity, 0);
    },

    getWishlistCount() {
      return wishlist.size;
    }
  };
})();

if (typeof window !== 'undefined') {
  window.Store = Store;
}
