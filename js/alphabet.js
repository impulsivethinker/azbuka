class AlphabetManager {
    constructor() {
        this.alphabetGrid = document.getElementById('alphabet-grid');
        this.modalOverlay = document.getElementById('modal-overlay');
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.renderAlphabet();
        this.setupEventListeners();
    }

    russianAlphabet = [
        { print: 'А', cursive: 'а', name: 'A /a/', type: 'vowels', info: 'Es la primera letra del alfabeto ruso. Se pronuncia como la "a" en español.', tips: 'Comienza desde arriba, traza una curva hacia la derecha y luego desciende.' },
        { print: 'Б', cursive: 'б', name: 'Be /b/', type: 'consonants', info: 'Equivale a la "B" en español. Se pronuncia como /b/.', tips: 'Comienza con un trazo curvo hacia abajo, luego forma un bucle en la parte inferior.' },
        { print: 'В', cursive: 'в', name: 'Ve /v/', type: 'consonants', info: 'Equivale a la "V" en español. Se pronuncia como /v/.', tips: 'Similar a la "B" en cursiva española, pero con una forma más angular.' },
        { print: 'Г', cursive: 'г', name: 'Ge /g/', type: 'consonants', info: 'Equivale a la "G" fuerte en español. Se pronuncia como /g/.', tips: 'Un trazo simple que comienza desde arriba y desciende con una curva suave.' },
        { print: 'Д', cursive: 'д', name: 'De /d/', type: 'consonants', info: 'Equivale a la "D" en español. Se pronuncia como /d/.', tips: 'Comienza desde la parte superior izquierda, traza una curva hacia abajo y luego hacia la derecha.' },
        { print: 'Е', cursive: 'е', name: 'Ye /ye/', type: 'vowels', info: 'Se pronuncia como "ye" en "yeso". Equivale a la "E" pero con sonido inicial de "y".', tips: 'Similar a la "e" cursiva en español, pero con un trazo inicial más definido.' },
        { print: 'Ё', cursive: 'ё', name: 'Yo /yo/', type: 'vowels', info: 'Se pronuncia como "yo" en "yogur". Es una variante de la Е con diéresis.', tips: 'Igual que la Е pero con dos puntos encima. En cursiva, los puntos se añaden después.' },
        { print: 'Ж', cursive: 'ж', name: 'Zhe /zh/', type: 'consonants', info: 'Equivale al sonido "j" en francés o "s" en "mediodía" en español. Se pronuncia como /ʒ/.', tips: 'Una de las letras más complejas. Practica los trazos en zigzag por separado antes de unirlos.' },
        { print: 'З', cursive: 'з', name: 'Ze /z/', type: 'consonants', info: 'Equivale a la "Z" en español. Se pronuncia como /z/.', tips: 'Similar a un "3" cursivo. Comienza desde arriba con un trazo curvo.' },
        { print: 'И', cursive: 'и', name: 'I /i/', type: 'vowels', info: 'Se pronuncia como "i" en "iglesia". Equivale a la "I" en español.', tips: 'Comienza desde arriba, desciende y luego sube con un trazo curvo.' },
        { print: 'Й', cursive: 'й', name: 'I kratkoye /y/', type: 'consonants', info: 'Se pronuncia como "y" en "hoy". Es una И con un acento breve encima.', tips: 'Igual que la И pero con un trazo corto encima. En cursiva, el trazo superior se añaden después.' },
        { print: 'К', cursive: 'к', name: 'Ka /k/', type: 'consonants', info: 'Equivale a la "K" en español. Se pronuncia como /k/.', tips: 'Similar a la "K" cursiva en español, pero con trazos más angulares.' },
        { print: 'Л', cursive: 'л', name: 'El /l/', type: 'consonants', info: 'Equivale a la "L" en español. Se pronuncia como /l/.', tips: 'Comienza desde arriba con un trazo curvo hacia abajo y luego hacia la derecha.' },
        { print: 'М', cursive: 'м', name: 'Em /m/', type: 'consonants', info: 'Equivale a la "M" en español. Se pronuncia como /m/.', tips: 'Dos arcos consecutivos. Comienza desde arriba y traza el primer arco, luego el segundo.' },
        { print: 'Н', cursive: 'н', name: 'En /n/', type: 'consonants', info: 'Equivale a la "N" en español. Se pronuncia como /n/.', tips: 'Similar a la "H" cursiva en español. Traza una línea hacia abajo, sube y traza otra línea hacia abajo.' },
        { print: 'О', cursive: 'о', name: 'O /o/', type: 'vowels', info: 'Se pronuncia como "o" en "oso". Equivale a la "O" en español.', tips: 'Un óvalo que comienza desde la parte superior. Mantén la forma redondeada.' },
        { print: 'П', cursive: 'п', name: 'Pe /p/', type: 'consonants', info: 'Equivale a la "P" en español. Se pronuncia como /p/.', tips: 'Comienza desde arriba con una línea recta hacia abajo, luego traza una curva en la parte superior.' },
        { print: 'Р', cursive: 'р', name: 'Er /r/', type: 'consonants', info: 'Equivale a la "R" en español. Se pronuncia como /r/.', tips: 'Similar a la "P" pero con un trazo adicional que desciende por debajo de la línea.' },
        { print: 'С', cursive: 'с', name: 'Es /s/', type: 'consonants', info: 'Equivale a la "S" en español. Se pronuncia como /s/.', tips: 'Un trazo curvo que comienza desde la parte superior derecha y forma una C.' },
        { print: 'Т', cursive: 'т', name: 'Te /t/', type: 'consonants', info: 'Equivale a la "T" en español. Se pronuncia como /t/.', tips: 'Una línea vertical con un trazo horizontal en la parte superior.' },
        { print: 'У', cursive: 'у', name: 'U /u/', type: 'vowels', info: 'Se pronuncia como "u" en "uva". Equivale a la "U" en español.', tips: 'Comienza con un trazo curvo hacia abajo, luego sube con un bucle.' },
        { print: 'Ф', cursive: 'ф', name: 'Ef /f/', type: 'consonants', info: 'Equivale a la "F" en español. Se pronuncia como /f/.', tips: 'Similar a la "Ф" en imprenta pero con trazos conectados. Practica los dos óvalos por separado.' },
        { print: 'Х', cursive: 'х', name: 'Ha /kh/', type: 'consonants', info: 'Equivale a la "J" en español. Se pronuncia como /x/.', tips: 'Dos trazos que se cruzan. Comienza desde arriba a la izquierda hacia abajo a la derecha, luego desde arriba a la derecha hacia abajo a la izquierda.' },
        { print: 'Ц', cursive: 'ц', name: 'Tse /ts/', type: 'consonants', info: 'Equivale a "ts" en "tsunami". Se pronuncia como /ts/.', tips: 'Similar a la "У" pero con un trazo adicional en la parte inferior.' },
        { print: 'Ч', cursive: 'ч', name: 'Che /ch/', type: 'consonants', info: 'Equivale a "ch" en "chocolate". Se pronuncia como /tʃ/.', tips: 'Comienza con un trazo curvo hacia abajo, luego un trazo horizontal en la parte superior.' },
        { print: 'Ш', cursive: 'ш', name: 'Sha /sh/', type: 'consonants', info: 'Equivale a "sh" en "show". Se pronuncia como /ʃ/.', tips: 'Tres trazos verticales conectados en la parte inferior. Mantén una altura uniforme.' },
        { print: 'Щ', cursive: 'щ', name: 'Shcha /shch/', type: 'consonants', info: 'Equivale a "shch", un sonido más suave que Ш. Se pronuncia como /ɕː/.', tips: 'Similar a la Ш pero con un trazo adicional en la parte inferior derecha.' },
        { print: 'Ъ', cursive: 'ъ', name: 'Signo duro', type: 'consonants', info: 'No tiene sonido propio. Indica que la consonante precedente se pronuncia sin palatalización.', tips: 'Un trazo vertical con un pequeño gancho en la parte superior.' },
        { print: 'Ы', cursive: 'ы', name: 'Yery /ɨ/', type: 'vowels', info: 'Un sonido vocalico que no existe en español. Similar a la "i" pero con la lengua más atrás.', tips: 'Combinación de un trazo corto y uno largo con un bucle en la parte inferior.' },
        { print: 'Ь', cursive: 'ь', name: 'Signo blando', type: 'consonants', info: 'No tiene sonido propio. Indica que la consonante precedente se palataliza.', tips: 'Similar a la Ъ pero más pequeña y con un trazo más suave.' },
        { print: 'Э', cursive: 'э', name: 'E /ɛ/', type: 'vowels', info: 'Se pronuncia como "e" en "elefante". Similar a la Е pero más abierta.', tips: 'Comienza desde la parte superior con un trazo curvo hacia la izquierda, luego forma un óvalo.' },
        { print: 'Ю', cursive: 'ю', name: 'Yu /yu/', type: 'vowels', info: 'Se pronuncia como "yu" en "yuca". Combinación de los sonidos /y/ y /u/.', tips: 'Combinación de un trazo similar a la И y un óvalo similar a la О.' },
        { print: 'Я', cursive: 'я', name: 'Ya /ya/', type: 'vowels', info: 'Se pronuncia como "ya" en "yate". Combinación de los sonidos /y/ y /a/.', tips: 'Comienza con un trazo curvo hacia la izquierda, luego forma un bucle hacia la derecha.' }
    ];

    renderAlphabet(filter = 'all') {
        this.alphabetGrid.innerHTML = '';
        
        const filteredAlphabet = filter === 'all' 
            ? this.russianAlphabet 
            : this.russianAlphabet.filter(letter => letter.type === filter);
        
        filteredAlphabet.forEach((letter, index) => {
            const letterCard = this.createLetterCard(letter, index);
            this.alphabetGrid.appendChild(letterCard);
        });
    }

    createLetterCard(letter, index) {
        const card = document.createElement('div');
        card.className = 'letter-card';
        card.dataset.letter = letter.print;
        card.style.animationDelay = `${index * 0.05}s`;
        
        card.innerHTML = `
            <div class="letter-print">${letter.print}</div>
            <div class="letter-cursive">${letter.cursive}</div>
            <div class="letter-name">${letter.name}</div>
        `;
        
        return card;
    }

    showLetterDetail(letter) {
        const letterData = this.russianAlphabet.find(l => l.print === letter);
        
        if (!letterData) return;

        // Update modal content
        document.getElementById('detail-print').textContent = letterData.print;
        document.getElementById('detail-cursive').textContent = letterData.cursive;
        document.getElementById('detail-name').textContent = letterData.name;
        document.getElementById('detail-type').textContent = this.getTypeName(letterData.type);
        document.getElementById('letter-info-text').textContent = letterData.info;
        document.getElementById('letter-tips').textContent = letterData.tips;

        // Update GIF source (replace with actual GIF paths)
        const gifElement = document.getElementById('letter-gif');
        gifElement.src = `assets/gifs/${letterData.print.toLowerCase()}.gif`;
        gifElement.alt = `Demonstración de cómo escribir la letra ${letterData.print} en cursiva`;

        // Show modal
        this.modalOverlay.classList.add('active');

        // Dispatch event for other modules
        document.dispatchEvent(new CustomEvent('letterSelected', {
            detail: letterData
        }));
    }

    getTypeName(type) {
        const types = {
            'vowels': 'Vocal',
            'consonants': 'Consonante'
        };
        return types[type] || type;
    }

    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.currentTarget.dataset.filter;
                this.setFilter(filter);
            });
        });

        // Letter cards
        this.alphabetGrid.addEventListener('click', (e) => {
            const letterCard = e.target.closest('.letter-card');
            if (letterCard) {
                const letter = letterCard.dataset.letter;
                this.selectLetter(letterCard, letter);
            }
        });

        // Close modal
        document.getElementById('close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal when clicking overlay
        this.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.modalOverlay) {
                this.closeModal();
            }
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modalOverlay.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        // Re-render alphabet
        this.renderAlphabet(filter);
    }

    selectLetter(letterCard, letter) {
        // Remove selection from all cards
        document.querySelectorAll('.letter-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Add selection to clicked card
        letterCard.classList.add('selected');
        
        // Show letter detail
        this.showLetterDetail(letter);
    }

    closeModal() {
        this.modalOverlay.classList.remove('active');
        
        // Remove selection from all cards
        document.querySelectorAll('.letter-card').forEach(card => {
            card.classList.remove('selected');
        });

        // Dispatch event for other modules
        document.dispatchEvent(new CustomEvent('modalClosed'));
    }
}