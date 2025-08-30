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
        ja: {
            title: '元素で神経衰弱',
            timer: 'タイム/time:',
            best: 'ベストタイム/best-time:',
            difficulty: { // 難易度もオブジェクトで管理
                easy: 'かんたん/easy',
                normal: 'ふつう/normal',
                hard: 'むずかしい/hard'
            }
        },
        en: {
            title: 'Element Match Game',
            timer: 'Time:', 
            best: 'Best Time:',
            difficulty: {
                easy: 'Easy',
                normal: 'Normal',
                hard: 'Hard'
            }
        },
        es: {
            title: 'Juego de memoria de elementos',
            timer: 'tiempo:',
            best: 'mejor tiempo:',
            difficulty: {
                easy: 'fácil',
                normal: 'normal',
                hard: 'difícil'
            }
        },
        cs: {
            title: 'Paměťová hra s prvky',
            timer: 'Time:', 
            best: 'Best Time:',
            difficulty: {
                easy: 'Easy',
                normal: 'Normal',
                hard: 'Hard'
            }
        }
    };

    // 全118元素の多言語データリスト (日本語, 英語, スペイン語, チェコ語)
    const allElements = [
        { symbol: 'H', names: { ja: '水素', en: 'Hydrogen', es: 'Hidrógeno', cs: 'Vodík' } },
        { symbol: 'He', names: { ja: 'ヘリウム', en: 'Helium', es: 'Helio', cs: 'Helium' } },
        { symbol: 'Li', names: { ja: 'リチウム', en: 'Lithium', es: 'Litio', cs: 'Lithium' } },
        { symbol: 'Be', names: { ja: 'ベリリウム', en: 'Beryllium', es: 'Berilio', cs: 'Beryllium' } },
        { symbol: 'B', names: { ja: 'ホウ素', en: 'Boron', es: 'Boro', cs: 'Bor' } },
        { symbol: 'C', names: { ja: '炭素', en: 'Carbon', es: 'Carbono', cs: 'Uhlík' } },
        { symbol: 'N', names: { ja: '窒素', en: 'Nitrogen', es: 'Nitrógeno', cs: 'Dusík' } },
        { symbol: 'O', names: { ja: '酸素', en: 'Oxygen', es: 'Oxígeno', cs: 'Kyslík' } },
        { symbol: 'F', names: { ja: 'フッ素', en: 'Fluorine', es: 'Flúor', cs: 'Fluor' } },
        { symbol: 'Ne', names: { ja: 'ネオン', en: 'Neon', es: 'Neón', cs: 'Neon' } },
        { symbol: 'Na', names: { ja: 'ナトリウム', en: 'Sodium', es: 'Sodio', cs: 'Sodík' } },
        { symbol: 'Mg', names: { ja: 'マグネシウム', en: 'Magnesium', es: 'Magnesio', cs: 'Hořčík' } },
        { symbol: 'Al', names: { ja: 'アルミニウム', en: 'Aluminium', es: 'Aluminio', cs: 'Hliník' } },
        { symbol: 'Si', names: { ja: 'ケイ素', en: 'Silicon', es: 'Silicio', cs: 'Křemík' } },
        { symbol: 'P', names: { ja: 'リン', en: 'Phosphorus', es: 'Fósforo', cs: 'Fosfor' } },
        { symbol: 'S', names: { ja: '硫黄', en: 'Sulfur', es: 'Azufre', cs: 'Síra' } },
        { symbol: 'Cl', names: { ja: '塩素', en: 'Chlorine', es: 'Cloro', cs: 'Chlor' } },
        { symbol: 'Ar', names: { ja: 'アルゴン', en: 'Argon', es: 'Argón', cs: 'Argon' } },
        { symbol: 'K', names: { ja: 'カリウム', en: 'Potassium', es: 'Potasio', cs: 'Draslík' } },
        { symbol: 'Ca', names: { ja: 'カルシウム', en: 'Calcium', es: 'Calcio', cs: 'Vápník' } },
        { symbol: 'Sc', names: { ja: 'スカンジウム', en: 'Scandium', es: 'Escandio', cs: 'Skandium' } },
        { symbol: 'Ti', names: { ja: 'チタン', en: 'Titanium', es: 'Titanio', cs: 'Titan' } },
        { symbol: 'V', names: { ja: 'バナジウム', en: 'Vanadium', es: 'Vanadio', cs: 'Vanad' } },
        { symbol: 'Cr', names: { ja: 'クロム', en: 'Chromium', es: 'Cromo', cs: 'Chrom' } },
        { symbol: 'Mn', names: { ja: 'マンガン', en: 'Manganese', es: 'Manganeso', cs: 'Mangan' } },
        { symbol: 'Fe', names: { ja: '鉄', en: 'Iron', es: 'Hierro', cs: 'Železo' } },
        { symbol: 'Co', names: { ja: 'コバルト', en: 'Cobalt', es: 'Cobalto', cs: 'Kobalt' } },
        { symbol: 'Ni', names: { ja: 'ニッケル', en: 'Nickel', es: 'Níquel', cs: 'Nikl' } },
        { symbol: 'Cu', names: { ja: '銅', en: 'Copper', es: 'Cobre', cs: 'Měď' } },
        { symbol: 'Zn', names: { ja: '亜鉛', en: 'Zinc', es: 'Zinc', cs: 'Zinek' } },
        { symbol: 'Ga', names: { ja: 'ガリウム', en: 'Gallium', es: 'Galio', cs: 'Gallium' } },
        { symbol: 'Ge', names: { ja: 'ゲルマニウム', en: 'Germanium', es: 'Germanio', cs: 'Germanium' } },
        { symbol: 'As', names: { ja: 'ヒ素', en: 'Arsenic', es: 'Arsénico', cs: 'Arsen' } },
        { symbol: 'Se', names: { ja: 'セレン', en: 'Selenium', es: 'Selenio', cs: 'Selen' } },
        { symbol: 'Br', names: { ja: '臭素', en: 'Bromine', es: 'Bromo', cs: 'Brom' } },
        { symbol: 'Kr', names: { ja: 'クリプトン', en: 'Krypton', es: 'Kriptón', cs: 'Krypton' } },
        { symbol: 'Rb', names: { ja: 'ルビジウム', en: 'Rubidium', es: 'Rubidio', cs: 'Rubidium' } },
        { symbol: 'Sr', names: { ja: 'ストロンチウム', en: 'Strontium', es: 'Estroncio', cs: 'Stroncium' } },
        { symbol: 'Y', names: { ja: 'イットリウム', en: 'Yttrium', es: 'Itrio', cs: 'Yttrium' } },
        { symbol: 'Zr', names: { ja: 'ジルコニウム', en: 'Zirconium', es: 'Zirconio', cs: 'Zirkonium' } },
        { symbol: 'Nb', names: { ja: 'ニオブ', en: 'Niobium', es: 'Niobio', cs: 'Niob' } },
        { symbol: 'Mo', names: { ja: 'モリブデン', en: 'Molybdenum', es: 'Molibdeno', cs: 'Molybden' } },
        { symbol: 'Tc', names: { ja: 'テクネチウム', en: 'Technetium', es: 'Tecnecio', cs: 'Technecium' } },
        { symbol: 'Ru', names: { ja: 'ルテニウム', en: 'Ruthenium', es: 'Rutenio', cs: 'Ruthenium' } },
        { symbol: 'Rh', names: { ja: 'ロジウム', en: 'Rhodium', es: 'Rodio', cs: 'Rhodium' } },
        { symbol: 'Pd', names: { ja: 'パラジウム', en: 'Palladium', es: 'Paladio', cs: 'Palladium' } },
        { symbol: 'Ag', names: { ja: '銀', en: 'Silver', es: 'Plata', cs: 'Stříbro' } },
        { symbol: 'Cd', names: { ja: 'カドミウム', en: 'Cadmium', es: 'Cadmio', cs: 'Kadmium' } },
        { symbol: 'In', names: { ja: 'インジウム', en: 'Indium', es: 'Indio', cs: 'Indium' } },
        { symbol: 'Sn', names: { ja: 'スズ', en: 'Tin', es: 'Estaño', cs: 'Cín' } },
        { symbol: 'Sb', names: { ja: 'アンチモン', en: 'Antimony', es: 'Antimonio', cs: 'Antimon' } },
        { symbol: 'Te', names: { ja: 'テルル', en: 'Tellurium', es: 'Telurio', cs: 'Tellur' } },
        { symbol: 'I', names: { ja: 'ヨウ素', en: 'Iodine', es: 'Yodo', cs: 'Jod' } },
        { symbol: 'Xe', names: { ja: 'キセノン', en: 'Xenon', es: 'Xenón', cs: 'Xenon' } },
        { symbol: 'Cs', names: { ja: 'セシウム', en: 'Caesium', es: 'Cesio', cs: 'Cesium' } },
        { symbol: 'Ba', names: { ja: 'バリウム', en: 'Barium', es: 'Bario', cs: 'Baryum' } },
        { symbol: 'La', names: { ja: 'ランタン', en: 'Lanthanum', es: 'Lantano', cs: 'Lanthan' } },
        { symbol: 'Ce', names: { ja: 'セリウム', en: 'Cerium', es: 'Cerio', cs: 'Cer' } },
        { symbol: 'Pr', names: { ja: 'プラセオジム', en: 'Praseodymium', es: 'Praseodimio', cs: 'Praseodym' } },
        { symbol: 'Nd', names: { ja: 'ネオジム', en: 'Neodymium', es: 'Neodimio', cs: 'Neodym' } },
        { symbol: 'Pm', names: { ja: 'プロメチウム', en: 'Promethium', es: 'Prometio', cs: 'Promethium' } },
        { symbol: 'Sm', names: { ja: 'サマリウム', en: 'Samarium', es: 'Samario', cs: 'Samarium' } },
        { symbol: 'Eu', names: { ja: 'ユウロピウム', en: 'Europium', es: 'Europio', cs: 'Europium' } },
        { symbol: 'Gd', names: { ja: 'ガドリニウム', en: 'Gadolinium', es: 'Gadolinio', cs: 'Gadolinium' } },
        { symbol: 'Tb', names: { ja: 'テルビウム', en: 'Terbium', es: 'Terbio', cs: 'Terbium' } },
        { symbol: 'Dy', names: { ja: 'ジスプロシウム', en: 'Dysprosium', es: 'Disprosio', cs: 'Dysprosium' } },
        { symbol: 'Ho', names: { ja: 'ホルミウム', en: 'Holmium', es: 'Holmio', cs: 'Holmium' } },
        { symbol: 'Er', names: { ja: 'エルビウム', en: 'Erbium', es: 'Erbio', cs: 'Erbium' } },
        { symbol: 'Tm', names: { ja: 'ツリウム', en: 'Thulium', es: 'Tulio', cs: 'Thulium' } },
        { symbol: 'Yb', names: { ja: 'イッテルビウム', en: 'Ytterbium', es: 'Iterbio', cs: 'Ytterbium' } },
        { symbol: 'Lu', names: { ja: 'ルテチウム', en: 'Lutetium', es: 'Lutecio', cs: 'Lutecium' } },
        { symbol: 'Hf', names: { ja: 'ハフニウム', en: 'Hafnium', es: 'Hafnio', cs: 'Hafnium' } },
        { symbol: 'Ta', names: { ja: 'タンタル', en: 'Tantalum', es: 'Tántalo', cs: 'Tantal' } },
        { symbol: 'W', names: { ja: 'タングステン', en: 'Tungsten', es: 'Tungsteno', cs: 'Wolfram' } },
        { symbol: 'Re', names: { ja: 'レニウム', en: 'Rhenium', es: 'Renio', cs: 'Rhenium' } },
        { symbol: 'Os', names: { ja: 'オスミウム', en: 'Osmium', es: 'Osmio', cs: 'Osmium' } },
        { symbol: 'Ir', names: { ja: 'イリジウム', en: 'Iridium', es: 'Iridio', cs: 'Iridium' } },
        { symbol: 'Pt', names: { ja: '白金', en: 'Platinum', es: 'Platino', cs: 'Platina' } },
        { symbol: 'Au', names: { ja: '金', en: 'Gold', es: 'Oro', cs: 'Zlato' } },
        { symbol: 'Hg', names: { ja: '水銀', en: 'Mercury', es: 'Mercurio', cs: 'Rtuť' } },
        { symbol: 'Tl', names: { ja: 'タリウム', en: 'Thallium', es: 'Talio', cs: 'Thallium' } },
        { symbol: 'Pb', names: { ja: '鉛', en: 'Lead', es: 'Plomo', cs: 'Olovo' } },
        { symbol: 'Bi', names: { ja: 'ビスマス', en: 'Bismuth', es: 'Bismuto', cs: 'Bismut' } },
        { symbol: 'Po', names: { ja: 'ポロニウム', en: 'Polonium', es: 'Polonio', cs: 'Polonium' } },
        { symbol: 'At', names: { ja: 'アスタチン', en: 'Astatine', es: 'Astato', cs: 'Astat' } },
        { symbol: 'Rn', names: { ja: 'ラドン', en: 'Radon', es: 'Radón', cs: 'Radon' } },
        { symbol: 'Fr', names: { ja: 'フランシウム', en: 'Francium', es: 'Francio', cs: 'Francium' } },
        { symbol: 'Ra', names: { ja: 'ラジウム', en: 'Radium', es: 'Radio', cs: 'Radium' } },
        { symbol: 'Ac', names: { ja: 'アクチニウム', en: 'Actinium', es: 'Actinio', cs: 'Aktinium' } },
        { symbol: 'Th', names: { ja: 'トリウム', en: 'Thorium', es: 'Torio', cs: 'Thorium' } },
        { symbol: 'Pa', names: { ja: 'プロトアクチニウム', en: 'Protactinium', es: 'Protactinio', cs: 'Protaktinium' } },
        { symbol: 'U', names: { ja: 'ウラン', en: 'Uranium', es: 'Uranio', cs: 'Uran' } },
        { symbol: 'Np', names: { ja: 'ネプツニウム', en: 'Neptunium', es: 'Neptunio', cs: 'Neptunium' } },
        { symbol: 'Pu', names: { ja: 'プルトニウム', en: 'Plutonium', es: 'Plutonio', cs: 'Plutonium' } },
        { symbol: 'Am', names: { ja: 'アメリシウム', en: 'Americium', es: 'Americio', cs: 'Americium' } },
        { symbol: 'Cm', names: { ja: 'キュリウム', en: 'Curium', es: 'Curio', cs: 'Curium' } },
        { symbol: 'Bk', names: { ja: 'バークリウム', en: 'Berkelium', es: 'Berkelio', cs: 'Berkelium' } },
        { symbol: 'Cf', names: { ja: 'カリホルニウム', en: 'Californium', es: 'Californio', cs: 'Kalifornium' } },
        { symbol: 'Es', names: { ja: 'アインスタイニウム', en: 'Einsteinium', es: 'Einstenio', cs: 'Einsteinium' } },
        { symbol: 'Fm', names: { ja: 'フェルミウム', en: 'Fermium', es: 'Fermio', cs: 'Fermium' } },
        { symbol: 'Md', names: { ja: 'メンデレビウム', en: 'Mendelevium', es: 'Mendelevio', cs: 'Mendelevium' } },
        { symbol: 'No', names: { ja: 'ノーベリウム', en: 'Nobelium', es: 'Nobelio', cs: 'Nobelium' } },
        { symbol: 'Lr', names: { ja: 'ローレンシウム', en: 'Lawrencium', es: 'Laurencio', cs: 'Lawrencium' } },
        { symbol: 'Rf', names: { ja: 'ラザホージウム', en: 'Rutherfordium', es: 'Rutherfordio', cs: 'Rutherfordium' } },
        { symbol: 'Db', names: { ja: 'ドブニウム', en: 'Dubnium', es: 'Dubnio', cs: 'Dubnium' } },
        { symbol: 'Sg', names: { ja: 'シーボーギウム', en: 'Seaborgium', es: 'Seaborgio', cs: 'Seaborgium' } },
        { symbol: 'Bh', names: { ja: 'ボーリウム', en: 'Bohrium', es: 'Bohrio', cs: 'Bohrium' } },
        { symbol: 'Hs', names: { ja: 'ハッシウム', en: 'Hassium', es: 'Hasio', cs: 'Hassium' } },
        { symbol: 'Mt', names: { ja: 'マイトネリウム', en: 'Meitnerium', es: 'Meitnerio', cs: 'Meitnerium' } },
        { symbol: 'Ds', names: { ja: 'ダームスタチウム', en: 'Darmstadtium', es: 'Darmstatio', cs: 'Darmstadtium' } },
        { symbol: 'Rg', names: { ja: 'レントゲニウム', en: 'Roentgenium', es: 'Roentgenio', cs: 'Roentgenium' } },
        { symbol: 'Cn', names: { ja: 'コペルニシウム', en: 'Copernicium', es: 'Copernicio', cs: 'Kopernicium' } },
        { symbol: 'Nh', names: { ja: 'ニホニウム', en: 'Nihonium', es: 'Nihonio', cs: 'Nihonium' } },
        { symbol: 'Fl', names: { ja: 'フレロビウム', en: 'Flerovium', es: 'Flerovio', cs: 'Flerovium' } },
        { symbol: 'Mc', names: { ja: 'モスコビウム', en: 'Moscovium', es: 'Moscovio', cs: 'Moscovium' } },
        { symbol: 'Lv', names: { ja: 'リバモリウム', en: 'Livermorium', es: 'Livermorio', cs: 'Livermorium' } },
        { symbol: 'Ts', names: { ja: 'テネシン', en: 'Tennessine', es: 'Teneso', cs: 'Tennessin' } },
        { symbol: 'Og', names: { ja: 'オガネソン', en: 'Oganesson', es: 'Oganesón', cs: 'Oganesson' } }
    ];
    
    // ゲーム設定
    const difficulties = {
        easy: { pairs: 8, columns: 4 },
        normal: { pairs: 20, columns: 5 },
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
