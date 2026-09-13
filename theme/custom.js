/**
 * EnglishMap Professional Theme - JavaScript Enhancements
 * 
 * Minimal, professional enhancements:
 * - RTL content detection
 * - Smooth scrolling
 * - Table responsiveness
 * - Accessible external link handling
 */

(function() {
    'use strict';

    /**
     * Ensure proper RTL rendering for explicitly marked content only
     * Never auto-detect or modify UI chrome/sidebar/navigation
     */
    function enhanceRTLSupport() {
        // Force document root and sidebar to LTR
        document.documentElement.setAttribute('dir', 'ltr');
        
        const sidebar = document.querySelector('#sidebar, .sidebar');
        if (sidebar) {
            sidebar.setAttribute('dir', 'ltr');
        }
        
        // Only ensure explicitly marked RTL content has proper direction
        // .dari, .hazaragi, and elements with lang="fa/prs/haz" attributes
        const rtlSelectors = '.dari, .hazaragi, [lang="fa"], [lang="prs"], [lang="haz"]';
        document.querySelectorAll(rtlSelectors).forEach(element => {
            // Only set if not already in an RTL container
            if (!element.closest('[dir="rtl"]')) {
                element.setAttribute('dir', 'rtl');
            }
        });
    }

    /**
     * Enable smooth scrolling for anchor links
     */
    function enableSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (!href || href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without jumping
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                }
            });
        });
    }

    /**
     * Wrap tables in responsive containers for mobile
     */
    function enhanceTableResponsiveness() {
        document.querySelectorAll('table').forEach(table => {
            if (!table.parentElement.classList.contains('table-wrapper')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'table-wrapper';
                wrapper.style.cssText = 'overflow-x: auto; -webkit-overflow-scrolling: touch;';
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }
        });
    }

    /**
     * Mark external links with proper attributes
     * Opens in new tab with security attributes
     */
    function markExternalLinks() {
        const hostname = window.location.hostname;
        
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            const linkHostname = new URL(link.href).hostname;
            
            if (linkHostname !== hostname) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
                
                // Add accessible label
                const currentTitle = link.getAttribute('title') || '';
                if (!currentTitle.includes('opens in new window')) {
                    link.setAttribute('title', 
                        currentTitle ? `${currentTitle} (opens in new window)` : 
                        'Opens in new window');
                }
            }
        });
    }

    /**
     * Add subtle visual indicator to the current reading position
     * Non-intrusive, no flashy progress bars
     */
    function enhanceReadingExperience() {
        // Add gentle fade-in for content on load
        const content = document.querySelector('.content');
        if (content) {
            content.style.opacity = '0';
            content.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                content.style.opacity = '1';
            }, 50);
        }
    }

    /**
     * Improve keyboard navigation
     */
    function enhanceKeyboardNavigation() {
        // Make chapter links more accessible
        document.querySelectorAll('.chapter a').forEach(link => {
            if (!link.getAttribute('tabindex')) {
                link.setAttribute('tabindex', '0');
            }
        });
    }

    /**
     * Handle code block accessibility
     */
    function enhanceCodeBlocks() {
        document.querySelectorAll('pre code').forEach(code => {
            const pre = code.parentElement;
            
            // Add language label for screen readers if detectable
            const classes = code.className.split(' ');
            const langClass = classes.find(c => c.startsWith('language-'));
            
            if (langClass) {
                const lang = langClass.replace('language-', '');
                pre.setAttribute('aria-label', `Code block in ${lang}`);
            } else {
                pre.setAttribute('aria-label', 'Code block');
            }
            
            // Make code blocks keyboard-focusable for easy selection
            pre.setAttribute('tabindex', '0');
        });
    }

    /**
     * Initialize all enhancements
     */
    function init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        try {
            enhanceRTLSupport();
            enableSmoothScroll();
            enhanceTableResponsiveness();
            markExternalLinks();
            enhanceReadingExperience();
            enhanceKeyboardNavigation();
            enhanceCodeBlocks();
            
            // Re-run RTL support only for dynamically added content with explicit RTL markers
            // (e.g., search results, mdBook navigation)
            const observer = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) { // Element node
                            // Only process explicitly marked RTL content
                            const rtlSelectors = '.dari, .hazaragi, [lang="fa"], [lang="prs"], [lang="haz"]';
                            if (node.matches && node.matches(rtlSelectors)) {
                                node.setAttribute('dir', 'rtl');
                            }
                            // Check children
                            node.querySelectorAll && node.querySelectorAll(rtlSelectors).forEach(el => {
                                el.setAttribute('dir', 'rtl');
                            });
                        }
                    });
                });
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            
            console.log('✓ EnglishMap professional theme loaded');
        } catch (error) {
            console.error('EnglishMap theme error:', error);
        }
    }

    // Start initialization
    init();
})();
