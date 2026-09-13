// EnglishMap Custom JavaScript - RTL Support & Enhancements

(function() {
    'use strict';

    // Auto-detect RTL content and add appropriate classes
    function enhanceRTLSupport() {
        const rtlPatterns = [
            /[\u0600-\u06FF]/, // Arabic/Persian script
            /[\u0750-\u077F]/, // Arabic Supplement
            /[\uFB50-\uFDFF]/, // Arabic Presentation Forms
            /[\uFE70-\uFEFF]/  // Arabic Presentation Forms B
        ];

        document.querySelectorAll('p, div, blockquote').forEach(element => {
            const text = element.textContent;
            const hasRTLChars = rtlPatterns.some(pattern => pattern.test(text));
            
            if (hasRTLChars) {
                // Check if element already has RTL styling
                if (!element.classList.contains('dari') && 
                    !element.classList.contains('hazaragi') &&
                    element.getAttribute('dir') !== 'rtl') {
                    element.setAttribute('dir', 'rtl');
                    element.style.textAlign = 'right';
                }
            }
        });
    }

    // Add smooth scroll behavior
    function enableSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Add copy button to code blocks
    function addCopyButtons() {
        document.querySelectorAll('pre').forEach(pre => {
            const button = document.createElement('button');
            button.textContent = 'Copy';
            button.className = 'copy-button';
            button.style.cssText = `
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                padding: 0.25rem 0.5rem;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: 0.25rem;
                cursor: pointer;
                font-size: 0.85rem;
            `;
            
            button.addEventListener('click', () => {
                const code = pre.querySelector('code');
                const text = code ? code.textContent : pre.textContent;
                navigator.clipboard.writeText(text).then(() => {
                    button.textContent = 'Copied!';
                    setTimeout(() => {
                        button.textContent = 'Copy';
                    }, 2000);
                });
            });
            
            pre.style.position = 'relative';
            pre.appendChild(button);
        });
    }

    // Track reading progress
    function initProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.id = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--primary-color);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = (window.scrollY / documentHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // Improve table responsiveness
    function enhanceTableResponsiveness() {
        document.querySelectorAll('table').forEach(table => {
            if (!table.parentElement.classList.contains('table-wrapper')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'table-wrapper';
                wrapper.style.cssText = 'overflow-x: auto; margin: 1.5rem 0;';
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }
        });
    }

    // Add "Back to Top" button
    function addBackToTop() {
        const button = document.createElement('button');
        button.innerHTML = '↑';
        button.id = 'back-to-top';
        button.title = 'Back to top';
        button.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 3rem;
            height: 3rem;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1000;
            box-shadow: var(--shadow-lg);
        `;
        button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        document.body.appendChild(button);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                button.style.opacity = '1';
            } else {
                button.style.opacity = '0';
            }
        });
    }

    // External link indicator
    function markExternalLinks() {
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            if (!link.hostname.includes(window.location.hostname)) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
                link.innerHTML += ' ↗';
            }
        });
    }

    // Initialize all enhancements
    function init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        enhanceRTLSupport();
        enableSmoothScroll();
        addCopyButtons();
        initProgressBar();
        enhanceTableResponsiveness();
        addBackToTop();
        markExternalLinks();

        console.log('EnglishMap enhancements loaded');
    }

    init();
})();
