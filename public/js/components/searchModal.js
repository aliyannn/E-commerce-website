// Live Search Modal Overlay Component
const SearchModal = (() => {
  let overlayEl = null;
  let inputEl = null;
  let resultsContainer = null;
  let clearBtn = null;

  function init() {
    overlayEl = document.getElementById('search-overlay');
    if (!overlayEl) return;

    inputEl = overlayEl.querySelector('#search-modal-input');
    resultsContainer = overlayEl.querySelector('#search-modal-results');
    clearBtn = overlayEl.querySelector('#search-modal-clear');

    const closeBtn = overlayEl.querySelector('.btn-close-search');
    if (closeBtn) {
      closeBtn.addEventListener('click', close);
    }

    // Input listener for live search
    if (inputEl) {
      inputEl.addEventListener('input', (e) => {
        performSearch(e.target.value);
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        inputEl.value = '';
        performSearch('');
        inputEl.focus();
      });
    }

    // Quick tag pills
    overlayEl.querySelectorAll('.search-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const query = tag.dataset.query || tag.textContent.trim();
        inputEl.value = query;
        performSearch(query);
      });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlayEl.classList.contains('active')) {
        close();
      }
    });
  }

  function open() {
    if (overlayEl) {
      overlayEl.classList.add('active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        if (inputEl) inputEl.focus();
      }, 100);
    }
  }

  function close() {
    if (overlayEl) {
      overlayEl.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function performSearch(query) {
    const q = (query || '').toLowerCase().trim();
    if (clearBtn) {
      clearBtn.style.display = q ? 'block' : 'none';
    }

    if (!q) {
      resultsContainer.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); padding: 3rem 0;">
          <p>Begin typing to discover garments, fabrics, and tailored silhouettes...</p>
        </div>
      `;
      return;
    }

    const matches = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.composition.toLowerCase().includes(q) ||
      (p.badge && p.badge.toLowerCase().includes(q))
    );

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); padding: 3rem 0;">
          <p style="font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--text-primary); font-family: var(--font-serif);">No silhouettes found for "${query}"</p>
          <p>Try searching for "Cashmere", "Blazer", "Silk", "Trench", or "Tote".</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <span class="results-count">Found ${matches.length} Atelier Creation${matches.length > 1 ? 's' : ''}</span>
      </div>
      <div class="search-results-grid"></div>
    `;

    const grid = resultsContainer.querySelector('.search-results-grid');
    matches.forEach(item => {
      const card = ProductCard.render(item);
      // Close search modal when navigating
      card.addEventListener('click', () => {
        close();
      });
      grid.appendChild(card);
    });
  }

  return {
    init,
    open,
    close
  };
})();

if (typeof window !== 'undefined') {
  window.SearchModal = SearchModal;
}
