class NavigationManager {
    constructor() {
        this.currentSection = 'instructions';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showSection('instructions');
    }

    setupEventListeners() {
        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.showSection(section);
            });
        });

        // Alphabet card navigation - links to alphabet section
        const alphabetCard = document.getElementById('alphabet-card');
        if (alphabetCard) {
            alphabetCard.addEventListener('click', () => {
                this.showSection('alphabet');
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.altKey) {
                if (e.key === '1') {
                    this.showSection('instructions');
                } else if (e.key === '2') {
                    this.showSection('alphabet');
                }
            }
        });
    }

    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Remove active class from all nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;

            // Update active nav button
            const activeBtn = document.querySelector(`[data-section="${sectionId}"]`);
            if (activeBtn) {
                activeBtn.classList.add('active');
            }

            // Dispatch section change event
            document.dispatchEvent(new CustomEvent('sectionChanged', {
                detail: { section: sectionId }
            }));

            // Scroll to top
            window.scrollTo(0, 0);
        }
    }

    getCurrentSection() {
        return this.currentSection;
    }
}