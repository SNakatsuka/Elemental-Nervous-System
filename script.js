document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    // まずは簡単な4ペア（8枚）で作成
    const elements = [
        { name: '水素', symbol: 'H' },
        { name: 'ヘリウム', symbol: 'He' },
        { name: 'リチウム', symbol: 'Li' },
        { name: 'ベリリウム', symbol: 'Be' }
    ];

    // カードのペアを作成
    let cardsArray = [];
    elements.forEach((el, index) => {
        cardsArray.push({ type: 'symbol', value: el.symbol, matchId: index });
        cardsArray.push({ type: 'name', value: el.name, matchId: index });
    });

    // カードをシャッフル (Fisher-Yatesアルゴリズム)
    for (let i = cardsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
    }

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false; // ボードをロックして連続クリックを防ぐ

    // カードをボードに生成
    function createBoard() {
        cardsArray.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.matchId = item.matchId;

            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-back">?</div>
                    <div class="card-front">${item.value}</div>
                </div>
            `;

            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
            return;
        }

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
        resetBoard();
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1200); // 1.2秒後にカードを戻す
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    createBoard();
});
