// ========================================
// EnglishMap Custom JavaScript
// RTL/LTR Enhancement Script
// ========================================

(function() {
  'use strict';

  // ========================================
  // CONFIGURATION
  // ========================================

  const ARABIC_SCRIPT_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g;
  const RTL_THRESHOLD = 0.6; // 60% Arabic characters
  
  // Chrome selectors that should NEVER be modified
  const PROTECTED_SELECTORS = [
    '#sidebar',
    '.sidebar',
    '.sidebar-scrollbox',
    '.menu-bar',
    '.nav-wrapper',
    '.nav-chapters',
    '.chapter'
  ];

  // ========================================
  // UTILITY FUNCTIONS
  // ========================================

  /**
   * Check if an element is inside a protected chrome area
   */
  function isInProtectedArea(element) {
    for (const selector of PROTECTED_SELECTORS) {
      if (element.closest(selector)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Check if an element already has explicit RTL/LTR class or lang attribute
   */
  function hasExplicitDirection(element) {
    return element.classList.contains('dari') ||
           element.classList.contains('hazaragi') ||
           element.hasAttribute('lang') ||
           element.hasAttribute('dir');
  }

  /**
   * Calculate the percentage of Arabic/Persian script in text
   */
  function getArabicScriptPercentage(text) {
    if (!text || text.trim().length === 0) {
      return 0;
    }

    // Remove whitespace and count only letters
    const letters = text.replace(/\s/g, '').match(/\p{L}/gu) || [];
    const totalLetters = letters.length;

    if (totalLetters === 0) {
      return 0;
    }

    const arabicMatches = text.match(ARABIC_SCRIPT_REGEX) || [];
    return arabicMatches.length / totalLetters;
  }

  /**
   * Apply RTL to an element if it meets criteria
   */
  function maybeApplyRTL(element) {
    // Skip if in protected area
    if (isInProtectedArea(element)) {
      return;
    }

    // Skip if already has explicit direction
    if (hasExplicitDirection(element)) {
      return;
    }

    // Get text content
    const text = element.textContent || '';
    const arabicPercentage = getArabicScriptPercentage(text);

    // Only apply RTL if content is mostly Arabic (> 60%)
    if (arabicPercentage > RTL_THRESHOLD) {
      element.setAttribute('dir', 'rtl');
      element.style.textAlign = 'right';
    }
  }

  /**
   * Ensure elements with Dari/Hazaragi classes have RTL
   */
  function ensureMarkedElementsRTL() {
    const markedElements = document.querySelectorAll('.dari, .hazaragi, [lang="fa"], [lang="prs"], [lang="haz"]');
    
    markedElements.forEach(element => {
      if (!element.hasAttribute('dir')) {
        element.setAttribute('dir', 'rtl');
      }
      if (!element.style.textAlign) {
        element.style.textAlign = 'right';
      }
    });
  }

  /**
   * Process content for RTL detection (optional, conservative)
   */
  function processContentForRTL() {
    // Only process elements in main content area, not in chrome
    const contentArea = document.querySelector('.content main');
    if (!contentArea) {
      return;
    }

    // Very conservative: only check paragraphs and divs in main content
    // that don't already have direction set
    const candidates = contentArea.querySelectorAll('p:not([dir]), div:not([dir])');
    
    candidates.forEach(element => {
      maybeApplyRTL(element);
    });
  }

  // ========================================
  // INITIALIZATION
  // ========================================

  function initializeDirectionSupport() {
    // Set document to LTR by default
    document.documentElement.setAttribute('dir', 'ltr');
    
    // Explicitly set sidebar to LTR
    const sidebar = document.querySelector('#sidebar');
    if (sidebar) {
      sidebar.setAttribute('dir', 'ltr');
    }

    // Ensure all marked Dari/Hazaragi elements have RTL
    ensureMarkedElementsRTL();

    // Optionally apply RTL to mostly-Arabic paragraphs
    // (Comment this out if you want class-based only)
    processContentForRTL();
  }

  // ========================================
  // EVENT HANDLERS
  // ========================================

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDirectionSupport);
  } else {
    initializeDirectionSupport();
  }

  // Re-run when mdBook navigation occurs
  document.addEventListener('mdbook-page-changed', function() {
    setTimeout(initializeDirectionSupport, 100);
  });

  // Observe DOM changes for dynamically added content
  const observer = new MutationObserver(function(mutations) {
    let shouldReprocess = false;
    
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length > 0) {
        shouldReprocess = true;
      }
    });

    if (shouldReprocess) {
      ensureMarkedElementsRTL();
    }
  });

  // Start observing once content area is available
  function startObserving() {
    const contentArea = document.querySelector('.content');
    if (contentArea) {
      observer.observe(contentArea, {
        childList: true,
        subtree: true
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startObserving);
  } else {
    startObserving();
  }

})();
