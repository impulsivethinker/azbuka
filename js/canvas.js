class CanvasManager {
    constructor() {
        this.canvas = document.getElementById('practice-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;
        this.currentLetter = null;
        
        this.init();
    }

    init() {
        this.setupCanvas();
        this.setupEventListeners();
    }

    setupCanvas() {
        // Set canvas size
        this.resizeCanvas();
        
        // Set canvas style
        this.ctx.strokeStyle = '#007AFF';
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        // Fill with white background
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
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

        // Clear canvas button
        document.getElementById('clear-canvas').addEventListener('click', this.clear.bind(this));

        // Window resize
        window.addEventListener('resize', this.resizeCanvas.bind(this));
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        const rect = container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = 200;
        this.clear();
    }

    startDrawing(e) {
        this.isDrawing = true;
        [this.lastX, this.lastY] = this.getCoordinates(e);
        
        // Start a new path immediately
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
    }

    draw(e) {
        if (!this.isDrawing) return;

        const [x, y] = this.getCoordinates(e);

        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        
        // Continue the path
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);

        [this.lastX, this.lastY] = [x, y];
    }

    stopDrawing() {
        this.isDrawing = false;
        this.ctx.beginPath(); // Reset the path
    }

    handleTouchStart(e) {
        e.preventDefault();
        this.isDrawing = true;
        const touch = e.touches[0];
        [this.lastX, this.lastY] = this.getCoordinates(touch);
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
    }

    handleTouchMove(e) {
        if (!this.isDrawing) return;
        e.preventDefault();
        
        const touch = e.touches[0];
        const [x, y] = this.getCoordinates(touch);

        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);

        [this.lastX, this.lastY] = [x, y];
    }

    getCoordinates(e) {
        const rect = this.canvas.getBoundingClientRect();
        let x, y;

        if (e.clientX !== undefined && e.clientY !== undefined) {
            // Mouse event or touch event with client coordinates
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        } else if (e.offsetX !== undefined && e.offsetY !== undefined) {
            // Mouse event with offset coordinates
            x = e.offsetX;
            y = e.offsetY;
        } else {
            // Fallback
            x = 0;
            y = 0;
        }

        // Scale coordinates for high DPI displays
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;

        return [x * scaleX, y * scaleY];
    }

    clear() {
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