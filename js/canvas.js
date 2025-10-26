class CanvasManager {
    constructor() {
        // Wait until the DOM is fully loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.canvas = document.getElementById('practice-canvas');
            if (!this.canvas) return; // Safety: exit if canvas not found

            this.ctx = this.canvas.getContext('2d');
            this.isDrawing = false;
            this.currentLetter = null;

            this.init();
        });
    }

    init() {
        this.setupCanvas();
        this.setupEventListeners();
    }

    setupCanvas() {
        this.resizeCanvas();
        this.clear();

        // Set drawing styles
        this.ctx.strokeStyle = '#007AFF';
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
    }

    setupEventListeners() {
        // Mouse events
        this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
        this.canvas.addEventListener('mousemove', this.draw.bind(this));
        this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
        this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));

        // Touch events for mobile
        this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        this.canvas.addEventListener('touchend', this.stopDrawing.bind(this));

        // Clear button
        const clearBtn = document.getElementById('clear-canvas');
        if (clearBtn) clearBtn.addEventListener('click', this.clear.bind(this));

        // Handle window resize
        window.addEventListener('resize', this.resizeCanvas.bind(this));

        // Handle modal open (in case modal hides canvas)
        const modal = document.getElementById('modal-overlay');
        if (modal) {
            modal.addEventListener('transitionend', () => this.resizeCanvas());
            modal.addEventListener('animationend', () => this.resizeCanvas());
        }
    }

    resizeCanvas() {
        if (!this.canvas) return;

        const container = this.canvas.parentElement;
        const rect = container.getBoundingClientRect();

        // Fallback width if hidden
        const width = rect.width || 600;
        const height = 200;

        this.canvas.width = width;
        this.canvas.height = height;

        // Reapply styles
        this.ctx.strokeStyle = '#007AFF';
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        // Clear the canvas
        this.clear();
    }

    getMousePos(e) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;

        if (e.touches && e.touches[0]) {
            return {
                x: (e.touches[0].clientX - rect.left) * scaleX,
                y: (e.touches[0].clientY - rect.top) * scaleY
            };
        } else {
            return {
                x: (e.clientX - rect.left) * scaleX,
                y: (e.clientY - rect.top) * scaleY
            };
        }
    }

    startDrawing(e) {
        e.preventDefault();
        this.isDrawing = true;

        const pos = this.getMousePos(e);
        this.ctx.beginPath();
        this.ctx.moveTo(pos.x, pos.y);
    }

    draw(e) {
        if (!this.isDrawing) return;
        e.preventDefault();

        const pos = this.getMousePos(e);
        this.ctx.lineTo(pos.x, pos.y);
        this.ctx.stroke();
    }

    stopDrawing() {
        this.isDrawing = false;
        this.ctx.beginPath();
    }

    handleTouchStart(e) {
        e.preventDefault();
        this.startDrawing(e);
    }

    handleTouchMove(e) {
        e.preventDefault();
        this.draw(e);
    }

    clear() {
        if (!this.ctx) return;
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.strokeStyle = '#007AFF';
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
    }

    setCurrentLetter(letter) {
        this.currentLetter = letter;
    }
}

// Initialize the class
new CanvasManager();
