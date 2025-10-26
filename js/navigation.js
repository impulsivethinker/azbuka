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

        // Home logo click
        const homeLogo = document.getElementById('home-logo');
        if (homeLogo) {
            homeLogo.addEventListener('click', () => {
                this.showSection('instructions');
            });
            homeLogo.style.cursor = 'pointer';
        }

        // Alphabet card navigation
        const alphabetCard = document.getElementById('alphabet-card');
        if (alphabetCard) {
            alphabetCard.addEventListener('click', () => {
                this.showSection('alphabet');
            });
        }
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

            // Scroll to top
            window.scrollTo(0, 0);
        }
    }

    getCurrentSection() {
        return this.currentSection;
    }
}