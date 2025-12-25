document.addEventListener('alpine:init', () => {
    Alpine.data('app', () => ({
        // Navigation state
        scrolled: false,
        mobileMenuOpen: false,

        // Waitlist form state
        email: '',
        submitting: false,
        waitlistSubmitted: false,

        // Preview tabs
        activePreview: 'editor',

        // FAQ accordion
        openFaq: null,

        // FAQ content
        faqs: [
            {
                q: 'When will Codify be available?',
                a: 'We\'re currently in active development with a planned beta release in 2025. Join our waitlist to be among the first to get access and receive development updates.'
            },
            {
                q: 'What programming languages are supported?',
                a: 'Codify will support 50+ languages including Swift, Python, JavaScript, TypeScript, Rust, Go, C++, Java, Ruby, and more. We use TextMate grammars for syntax highlighting and Language Server Protocol for intelligent features.'
            },
            {
                q: 'Will it work offline?',
                a: 'Yes! All core editing, file management, and local Git operations work completely offline. You only need an internet connection for remote Git operations (push, pull, fetch) and syncing with iCloud.'
            },
            {
                q: 'Is there a Mac version planned?',
                a: 'We\'re initially focused on delivering the best possible experience on iPad and iPhone. A Mac version may be considered in the future based on user feedback and demand.'
            },
            {
                q: 'How much will Codify cost?',
                a: 'Pricing hasn\'t been finalized yet. We\'re considering options that make Codify accessible to students and hobbyists while being sustainable for continued development. Waitlist members will receive early-bird pricing.'
            }
        ],

        // Methods
        async submitWaitlist() {
            if (!this.email || this.submitting) return;

            this.submitting = true;

            // Simulate API call - replace with actual endpoint
            await new Promise(resolve => setTimeout(resolve, 1000));

            this.submitting = false;
            this.waitlistSubmitted = true;
            this.email = '';

            // In production, you would POST to your waitlist API:
            // await fetch('/api/waitlist', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email: this.email })
            // });
        }
    }));

    // Collapse plugin for smooth accordion animations
    Alpine.directive('collapse', (el, { expression }, { effect, evaluateLater }) => {
        let isOpen = evaluateLater(expression);

        const setHeight = (open) => {
            if (open) {
                el.style.height = el.scrollHeight + 'px';
                el.style.overflow = 'hidden';
                setTimeout(() => {
                    el.style.height = 'auto';
                    el.style.overflow = 'visible';
                }, 200);
            } else {
                el.style.height = el.scrollHeight + 'px';
                el.offsetHeight; // Force reflow
                el.style.overflow = 'hidden';
                el.style.height = '0px';
            }
        };

        el.style.transition = 'height 0.2s ease';
        el.style.overflow = 'hidden';

        effect(() => {
            isOpen(open => {
                setHeight(open);
            });
        });
    });
});
