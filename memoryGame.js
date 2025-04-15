const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
    
    let cardsArray = [];
    let flippedCards = [];
    let lockBoard = false;
    
    function initializeGame() {
      cardsArray = [...letters, ...letters];
      shuffle(cardsArray);
      const gameBoard = document.getElementById('game-board');
      gameBoard.innerHTML = "";
      flippedCards = [];
      lockBoard = false;
      createCards();
    }
    

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    
    function createCards() {
      const gameBoard = document.getElementById('game-board');
      cardsArray.forEach((letter, index) => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.letter = letter;
        card.dataset.index = index;

        card.innerText = "";
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
      });
    }
    

    function flipCard(e) {
      if (lockBoard) return;
      let card = e.target;
      if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
      
      card.classList.add('flipped');
      card.innerText = card.dataset.letter;
      flippedCards.push(card);
      
      if (flippedCards.length === 2) {
        checkForMatch();
      }
    }
    
    function checkForMatch() {
      let [card1, card2] = flippedCards;
      if (card1.dataset.letter === card2.dataset.letter) {

        card1.classList.add('matched');
        card2.classList.add('matched');
        flippedCards = [];
        checkGameOver();
      } else {

        lockBoard = true;
        setTimeout(() => {
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
          card1.innerText = "";
          card2.innerText = "";
          flippedCards = [];
          lockBoard = false;
        }, 1000);
      }
    }

    function checkGameOver() {
      if (document.querySelectorAll('.matched').length === cardsArray.length) {
        setTimeout(() => {
          alert("Congratulations! You've matched all pairs!");
        }, 500);
      }
    }
    

    document.getElementById('restart-btn').addEventListener('click', initializeGame);
    
    initializeGame();
