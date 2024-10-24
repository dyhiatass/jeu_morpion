
  
    let player1 = { name: "Joueur 1", symbol: "X", score: 0 };
    let player2 = { name: "Joueur 2", symbol: "O", score: 0 };
    let currentPlayer = player1;  
   
    const tiles = Array.from(document.getElementsByClassName("tile"));
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]  
    ];

    document.getElementById("player1Name").innerText = player1.name;
    document.getElementById("player2Name").innerText = player2.name;
    document.getElementById("currentPlayer").innerText = currentPlayer.name;

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return tiles[index].innerHTML === currentPlayer.symbol;
            });
        });
    }

    function verifierCase() {
        return tiles.every(tile => tile.innerHTML !== "");
    }

    function handleClick(event) {
        const tile = event.target;
        if (tile.innerHTML === "" ) {
            tile.innerHTML = currentPlayer.symbol;
              
            if (checkWin()) {
                document.getElementById("message").innerText = `${currentPlayer.name} a gagné !`;
                currentPlayer.score++;  
                updateScores();  
                 
            } else if (verifierCase()) {
                document.getElementById("message").innerText = "Match nul !";
              
            } else {
            
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                document.getElementById("currentPlayer").innerText = currentPlayer.name;
            }
        }
    }

    function updateScores() {
        document.getElementById("player1Score").innerText = player1.score;
        document.getElementById("player2Score").innerText = player2.score;
    }
    function resetGame() {
        tiles.forEach(tile => tile.innerHTML = "");   
        currentPlayer = player1;  
        document.getElementById("currentPlayer").innerText = currentPlayer.name;
        document.getElementById("message").innerText = `C'est au tour de ${currentPlayer.name}`;
    }

    tiles.forEach(tile => tile.addEventListener("click", handleClick));
    document.getElementById("resetButton").addEventListener("click", resetGame);
