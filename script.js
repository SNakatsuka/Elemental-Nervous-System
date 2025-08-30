document.addEventListener('DOMContentLoaded', () => {
    // UI要素の取得
    const gameBoard = document.getElementById('game-board');
    const gameTitle = document.getElementById('game-title');
    const langButtons = document.querySelectorAll('#language-switcher button');
    const difficultyButtons = document.querySelectorAll('#difficulty-selector button');
    const timerDisplay = document.getElementById('timer');
    const bestTimeDisplay = document.getElementById('best-time');

    // UIのテキストを言語ごとに管理
    const uiStrings = {
        ja: { title: '元素で神経衰弱', timer: 'タイム:', best: 'ベストタイム:' },
        en: { title: 'Element Memory Game', timer: 'Time:', best: 'Best Time:' },
        es: { title: 'Juego de memoria de elementos', timer: 'Tiempo:', best: 'Mejor Tiempo:' },
        cs: { title: 'Paměťová hra s prvky', timer: 'Čas:', best: 'Nejlepší Čas:' }
    };

    // 全118元素の多言語データリスト (英語, スペイン語, チェコ語)
    const allElements = [
        { symbol: 'H', names: { en: 'Hydrogen', es: 'Hidrógeno', cs: 'Vodík' } },
        { symbol: 'He', names: { en: 'Helium', es: 'Helio', cs: 'Helium' } },
        { symbol: 'Li', names: { en: 'Lithium', es: 'Litio', cs: 'Lithium' } },
        { symbol: 'Be', names: { en: 'Beryllium', es: 'Berilio', cs: 'Beryllium' } },
        { symbol: 'B', names: { en: 'Boron', es: 'Boro', cs: 'Bor' } },
        { symbol: 'C', names: { en: 'Carbon', es: 'Carbono', cs: 'Uhlík' } },
        { symbol: 'N', names: { en: 'Nitrogen', es: 'Nitrógeno', cs: 'Dusík' } },
        { symbol: 'O', names: { en: 'Oxygen', es: 'Oxígeno', cs: 'Kyslík' } },
        { symbol: 'F', names: { en: 'Fluorine', es: 'Flúor', cs: 'Fluor' } },
        { symbol: 'Ne', names: { en: 'Neon', es: 'Neón', cs: 'Neon' } },
        { symbol: 'Na', names: { en: 'Sodium', es: 'Sodio', cs: 'Sodík' } },
        { symbol: 'Mg', names: { en: 'Magnesium', es: 'Magnesio', cs: 'Hořčík' } },
        { symbol: 'Al', names: { en: 'Aluminium', es: 'Aluminio', cs: 'Hliník' } },
        { symbol: 'Si', names: { en: 'Silicon', es: 'Silicio', cs: 'Křemík' } },
        { symbol: 'P', names: { en: 'Phosphorus', es: 'Fósforo', cs: 'Fosfor' } },
        { symbol: 'S', names: { en: 'Sulfur', es: 'Azufre', cs: 'Síra' } },
        { symbol: 'Cl', names: { en: 'Chlorine', es: 'Cloro', cs: 'Chlor' } },
        { symbol: 'Ar', names: { en: 'Argon', es: 'Argón', cs: 'Argon' } },
        { symbol: 'K', names: { en: 'Potassium', es: 'Potasio', cs: 'Draslík' } },
        { symbol: 'Ca', names: { en: 'Calcium', es: 'Calcio', cs: 'Vápník' } },
        { symbol: 'Sc', names: { en: 'Scandium', es: 'Escandio', cs: 'Skandium' } },
        { symbol: 'Ti', names: { en: 'Titanium', es: 'Titanio', cs: 'Titan' } },
        { symbol: 'V', names: { en: 'Vanadium', es: 'Vanadio', cs: 'Vanad' } },
        { symbol: 'Cr', names: { en: 'Chromium', es: 'Cromo', cs: 'Chrom' } },
        { symbol: 'Mn', names: { en: 'Manganese', es: 'Manganeso', cs: 'Mangan' } },
        { symbol: 'Fe', names: { en: 'Iron', es: 'Hierro', cs: 'Železo' } },
        { symbol: 'Co', names: { en: 'Cobalt', es: 'Cobalto', cs: 'Kobalt' } },
        { symbol: 'Ni', names: { en: 'Nickel', es: 'Níquel', cs: 'Nikl' } },
        { symbol: 'Cu', names: { en: 'Copper', es: 'Cobre', cs: 'Měď' } },
        { symbol: 'Zn', names: { en: 'Zinc', es: 'Zinc', cs: 'Zinek' } },
        { symbol: 'Ga', names: { en: 'Gallium', es: 'Galio', cs: 'Gallium' } },
        { symbol: 'Ge', names: { en: 'Germanium', es: 'Germanio', cs: 'Germanium' } },
        { symbol: 'As', names: { en: 'Arsenic', es: 'Arsénico', cs: 'Arsen' } },
        { symbol: 'Se', names: { en: 'Selenium', es: 'Selenio', cs: 'Selen' } },
        { symbol: 'Br', names: { en: 'Bromine', es: 'Bromo', cs: 'Brom' } },
        { symbol: 'Kr', names: { en: 'Krypton', es: 'Kriptón', cs: 'Krypton' } },
        { symbol: 'Rb', names: { en: 'Rubidium', es: 'Rubidio', cs: 'Rubidium' } },
        { symbol: 'Sr', names: { en: 'Strontium', es: 'Estroncio', cs: 'Stroncium' } },
        { symbol: 'Y', names: { en: 'Yttrium', es: 'Itrio', cs: 'Yttrium' } },
        { symbol: 'Zr', names: { en: 'Zirconium', es: 'Zirconio', cs: 'Zirkonium' } },
        { symbol: 'Nb', names: { en: 'Niobium', es: 'Niobio', cs: 'Niob' } },
        { symbol: 'Mo', names: { en: 'Molybdenum', es: 'Molibdeno', cs: 'Molybden' } },
        { symbol: 'Tc', names: { en: 'Technetium', es: 'Tecnecio', cs: 'Technecium' } },
        { symbol: 'Ru', names: { en: 'Ruthenium', es: 'Rutenio', cs: 'Ruthenium' } },
        { symbol: 'Rh', names: { en: 'Rhodium', es: 'Rodio', cs: 'Rhodium' } },
        { symbol: 'Pd', names: { en: 'Palladium', es: 'Paladio', cs: 'Palladium' } },
        { symbol: 'Ag', names: { en: 'Silver', es: 'Plata', cs: 'Stříbro' } },
        { symbol: 'Cd', names: { en: 'Cadmium', es: 'Cadmio', cs: 'Kadmium' } },
        { symbol: 'In', names: { en: 'Indium', es: 'Indio', cs: 'Indium' } },
        { symbol: 'Sn', names: { en: 'Tin', es: 'Estaño', cs: 'Cín' } },
        { symbol: 'Sb', names: { en: 'Antimony', es: 'Antimonio', cs: 'Antimon' } },
        { symbol: 'Te', names: { en: 'Tellurium', es: 'Telurio', cs: 'Tellur' } },
        { symbol: 'I', names: { en: 'Iodine', es: 'Yodo', cs: 'Jod' } },
        { symbol: 'Xe', names: { en: 'Xenon', es: 'Xenón', cs: 'Xenon' } },
        { symbol: 'Cs', names: { en: 'Caesium', es: 'Cesio', cs: 'Cesium' } },
        { symbol: 'Ba', names: { en: 'Barium', es: 'Bario', cs: 'Baryum' } },
        { symbol: 'La', names: { en: 'Lanthanum', es: 'Lantano', cs: 'Lanthan' } },
        { symbol: 'Ce', names: { en: 'Cerium', es: 'Cerio', cs: 'Cer' } },
        { symbol: 'Pr', names: { en: 'Praseodymium', es: 'Praseodimio', cs: 'Praseodym' } },
        { symbol: 'Nd', names: { en: 'Neodymium', es: 'Neodimio', cs: 'Neodym' } },
        { symbol: 'Pm', names: { en: 'Promethium', es: 'Prometio', cs: 'Promethium' } },
        { symbol: 'Sm', names: { en: 'Samarium', es: 'Samario', cs: 'Samarium' } },
        { symbol: 'Eu', names: { en: 'Europium', es: 'Europio', cs: 'Europium' } },
        { symbol: 'Gd', names: { en: 'Gadolinium', es: 'Gadolinio', cs: 'Gadolinium' } },
        { symbol: 'Tb', names: { en: 'Terbium', es: 'Terbio', cs: 'Terbium' } },
        { symbol: 'Dy', names: { en: 'Dysprosium', es: 'Disprosio', cs: 'Dysprosium' } },
        { symbol: 'Ho', names: { en: 'Holmium', es: 'Holmio', cs: 'Holmium' } },
        { symbol: 'Er', names: { en: 'Erbium', es: 'Erbio', cs: 'Erbium' } },
        { symbol: 'Tm', names: { en: 'Thulium', es: 'Tulio', cs: 'Thulium' } },
        { symbol: 'Yb', names: { en: 'Ytterbium', es: 'Iterbio', cs: 'Ytterbium' } },
        { symbol: 'Lu', names: { en: 'Lutetium', es: 'Lutecio', cs: 'Lutecium' } },
        { symbol: 'Hf', names: { en: 'Hafnium', es: 'Hafnio', cs: 'Hafnium' } },
        { symbol: 'Ta', names: { en: 'Tantalum', es: 'Tántalo', cs: 'Tantal' } },
        { symbol: 'W', names: { en: 'Tungsten', es: 'Tungsteno', cs: 'Wolfram' } },
        { symbol: 'Re', names: { en: 'Rhenium', es: 'Renio', cs: 'Rhenium' } },
        { symbol: 'Os', names: { en: 'Osmium', es: 'Osmio', cs: 'Osmium' } },
        { symbol: 'Ir', names: { en: 'Iridium', es: 'Iridio', cs: 'Iridium' } },
        { symbol: 'Pt', names: { en: 'Platinum', es: 'Platino', cs: 'Platina' } },
        { symbol: 'Au', names: { en: 'Gold', es: 'Oro', cs: 'Zlato' } },
        { symbol: 'Hg', names: { en: 'Mercury', es: 'Mercurio', cs: 'Rtuť' } },
        { symbol: 'Tl', names: { en: 'Thallium', es: 'Talio', cs: 'Thallium' } },
        { symbol: 'Pb', names: { en: 'Lead', es: 'Plomo', cs: 'Olovo' } },
        { symbol: 'Bi', names: { en: 'Bismuth', es: 'Bismuto', cs: 'Bismut' } },
        { symbol: 'Po', names: { en: 'Polonium', es: 'Polonio', cs: 'Polonium' } },
        { symbol: 'At', names: { en: 'Astatine', es: 'Astato', cs: 'Astat' } },
        { symbol: 'Rn', names: { en: 'Radon', es: 'Radón', cs: 'Radon' } },
        { symbol: 'Fr', names: { en: 'Francium', es: 'Francio', cs: 'Francium' } },
        { symbol: 'Ra', names: { en: 'Radium', es: 'Radio', cs: 'Radium' } },
        { symbol: 'Ac', names: { en: 'Actinium', es: 'Actinio', cs: 'Aktinium' } },
        { symbol: 'Th', names: { en: 'Thorium', es: 'Torio', cs: 'Thorium' } },
        { symbol: 'Pa', names: { en: 'Protactinium', es: 'Protactinio', cs: 'Protaktinium' } },
        { symbol: 'U', names: { en: 'Uranium', es: 'Uranio', cs: 'Uran' } },
        { symbol: 'Np', names: { en: 'Neptunium', es: 'Neptunio', cs: 'Neptunium' } },
        { symbol: 'Pu', names: { en: 'Plutonium', es: 'Plutonio', cs: 'Plutonium' } },
        { symbol: 'Am', names: { en: 'Americium', es: 'Americio', cs: 'Americium' } },
        { symbol: 'Cm', names: { en: 'Curium', es: 'Curio', cs: 'Curium' } },
        { symbol: 'Bk', names: { en: 'Berkelium', es: 'Berkelio', cs: 'Berkelium' } },
        { symbol: 'Cf', names: { en: 'Californium', es: 'Californio', cs: 'Kalifornium' } },
        { symbol: 'Es', names: { en: 'Einsteinium', es: 'Einstenio', cs: 'Einsteinium' } },
        { symbol: 'Fm', names: { en: 'Fermium', es: 'Fermio', cs: 'Fermium' } },
        { symbol: 'Md', names: { en: 'Mendelevium', es: 'Mendelevio', cs: 'Mendelevium' } },
        { symbol: 'No', names: { en: 'Nobelium', es: 'Nobelio', cs: 'Nobelium' } },
        { symbol: 'Lr', names: { en: 'Lawrencium', es: 'Laurencio', cs: 'Lawrencium' } },
        { symbol: 'Rf', names: { en: 'Rutherfordium', es: 'Rutherfordio', cs: 'Rutherfordium' } },
        { symbol: 'Db', names: { en: 'Dubnium', es: 'Dubnio', cs: 'Dubnium' } },
        { symbol: 'Sg', names: { en: 'Seaborgium', es: 'Seaborgio', cs: 'Seaborgium' } },
        { symbol: 'Bh', names: { en: 'Bohrium', es: 'Bohrio', cs: 'Bohrium' } },
        { symbol: 'Hs', names: { en: 'Hassium', es: 'Hasio', cs: 'Hassium' } },
        { symbol: 'Mt', names: { en: 'Meitnerium', es: 'Meitnerio', cs: 'Meitnerium' } },
        { symbol: 'Ds', names: { en: 'Darmstadtium', es: 'Darmstatio', cs: 'Darmstadtium' } },
        { symbol: 'Rg', names: { en: 'Roentgenium', es: 'Roentgenio', cs: 'Roentgenium' } },
        { symbol: 'Cn', names: { en: 'Copernicium', es: 'Copernicio', cs: 'Kopernicium' } },
        { symbol: 'Nh', names: { en: 'Nihonium', es: 'Nihonio', cs: 'Nihonium' } },
        { symbol: 'Fl', names: { en: 'Flerovium', es: 'Flerovio', cs: 'Flerovium' } },
        { symbol: 'Mc', names: { en: 'Moscovium', es: 'Moscovio', cs: 'Moscovium' } },
        { symbol: 'Lv', names: { en: 'Livermorium', es: 'Livermorio', cs: 'Livermorium' } },
        { symbol: 'Ts', names: { en: 'Tennessine', es: 'Teneso', cs: 'Tennessin' } },
        { symbol: 'Og', names: { en: 'Oganesson', es: 'Oganesón', cs: 'Oganesson' } }
    ];

    // ゲーム設定
    const difficulties = {
        easy: { pairs: 8, columns: 4 },
        normal: { pairs: 20, columns: 4 },
        hard: { pairs: 48, columns: 8 }
    };

    let currentLanguage = 'ja';
    let currentDifficulty = 'easy';

    // タイマー関連の変数
    let timerInterval;
    let startTime;
    let matchedPairs = 0;

    /**
     * ゲームを開始または再描画するメインの関数
     */
    function startGame() {
        // UIテキスト更新
        updateUIText();

        // 以前のタイマーを停止
        stopTimer();
        timerDisplay.textContent = '0.0';
        matchedPairs = 0;

        // ボードをクリア
        gameBoard.innerHTML = '';
         
        const settings = difficulties[currentDifficulty];
        const PAIR_COUNT = settings.pairs;
        gameBoard.style.gridTemplateColumns = `repeat(${settings.columns}, 100px)`;

        const shuffleArray = (array) => array.sort(() => 0.5 - Math.random());
        const gameElements = shuffleArray([...allElements]).slice(0, PAIR_COUNT);

        let cardsArray = [];
        gameElements.forEach((el, index) => {
            cardsArray.push({ value: el.symbol, matchId: index });
            cardsArray.push({ value: el.names[currentLanguage], matchId: index });
        });
        shuffleArray(cardsArray);

        let firstCard = null;
        let secondCard = null;
        let lockBoard = false;
        let gameStarted = false;

        cardsArray.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.matchId = item.matchId;
            card.innerHTML = `<div class="card-inner"><div class="card-back">?</div><div class="card-front">${item.value}</div></div>`;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });

        function flipCard() {
            if (lockBoard || this.classList.contains('flipped') || this === firstCard) return;
            
            if (!gameStarted) {
                startTimer();
                gameStarted = true;
            }

            this.classList.add('flipped');
            if (!firstCard) { firstCard = this; return; }
            secondCard = this;
            lockBoard = true;
            checkForMatch();
        }

        function checkForMatch() {
            const isMatch = firstCard.dataset.matchId === secondCard.dataset.matchId;
            isMatch ? disableCards() : unflipCards();
        }

        function disableCards() {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            matchedPairs++;
            if (matchedPairs === PAIR_COUNT) {
                stopTimer();
                updateBestTime();
            }
            resetBoard();
        }

        function unflipCards() {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                resetBoard();
            }, 1000);
        }

        function resetBoard() {
            [firstCard, secondCard, lockBoard] = [null, null, false];
        }
    }

    // --- タイマー機能 ---
    function startTimer() {
        startTime = Date.now();
        timerInterval = setInterval(() => {
            const elapsedTime = (Date.now() - startTime) / 1000;
            timerDisplay.textContent = elapsedTime.toFixed(1);
        }, 100);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    // --- ベストタイム機能 ---
    function updateBestTime() {
        const elapsedTime = parseFloat(timerDisplay.textContent);
        const bestTimeKey = `bestTime_${currentDifficulty}_${currentLanguage}`;
        const currentBest = parseFloat(localStorage.getItem(bestTimeKey)) || Infinity;

        if (elapsedTime < currentBest) {
            localStorage.setItem(bestTimeKey, elapsedTime);
            displayBestTime();
        }
    }

    function displayBestTime() {
        const bestTimeKey = `bestTime_${currentDifficulty}_${currentLanguage}`;
        const bestTime = localStorage.getItem(bestTimeKey);
        bestTimeDisplay.textContent = bestTime ? `${parseFloat(bestTime).toFixed(1)}` : '-';
    }
    
    // --- UI更新とイベントリスナー ---
    function updateUIText() {
        const strings = uiStrings[currentLanguage];
        gameTitle.textContent = strings.title;
        document.getElementById('timer-label').textContent = `${strings.timer} `;
        document.getElementById('best-time-label').textContent = `${strings.best} `;
    }

    langButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            currentLanguage = e.target.dataset.lang;
            startGame();
            displayBestTime();
        });
    });

    difficultyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            currentDifficulty = e.target.dataset.difficulty;
            // アクティブなボタンのスタイルを更新
            difficultyButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            startGame();
            displayBestTime();
        });
    });

    // --- 初期化 ---
    document.querySelector(`#difficulty-selector button[data-difficulty='${currentDifficulty}']`).classList.add('active');
    startGame();
    displayBestTime();
});
