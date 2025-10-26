// Main app initialization
class RussianCursiveApp {
    constructor() {
        this.currentLetter = null;
        this.init();
    }

    init() {
        // Initialize all modules
        this.alphabet = new AlphabetManager();
        this.canvas = new CanvasManager();
        this.navigation = new NavigationManager();
        
        // Set up inter-module communication
        this.setupEventListeners();
        
        console.log('Азбука app initialized successfully');
    }

    setupEventListeners() {
        // When a letter is selected, update the canvas guide
        document.addEventListener('letterSelected', (event) => {
            this.currentLetter = event.detail;
            this.canvas.setCurrentLetter(this.currentLetter);
        });

        // When modal closes, clear canvas
        document.addEventListener('modalClosed', () => {
            this.canvas.clear();
        });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.russianApp = new RussianCursiveApp();
});