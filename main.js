let gridItems = document.getElementsByClassName("square");
let currentTurn = "x";
let gameIsFinished = false;
let boardArray = [
    "0", "1", "2",
    "3", "4", "5",
    "6", "7", "8"
]
for (const item of gridItems) {
    item.addEventListener("click", () => {
        if (gameIsFinished) {
            return;
        }
        let value = item.getAttribute("value");
        let index = value - 1;

        if (boardArray[index] == "x" || boardArray[index] == "o") {
            return;
        }
        // filling the value visually
        let squareContent = document.querySelector(`.square[value="${value}"]`);
        squareContent.innerHTML = currentTurn;
        // squareContent.style.cssText = "font-size:30px;";
        //filling the value logically 
        boardArray[index] = currentTurn;
        function evaluateBoard() {
            if (
                (boardArray[0] === boardArray[1] && boardArray[0] === boardArray[2]) ||
                (boardArray[0] === boardArray[3] && boardArray[0] === boardArray[6]) ||
                (boardArray[0] === boardArray[4] && boardArray[0] === boardArray[8]) ||
                (boardArray[1] === boardArray[4] && boardArray[1] === boardArray[7]) ||
                (boardArray[2] === boardArray[4] && boardArray[2] === boardArray[6]) ||
                (boardArray[2] === boardArray[5] && boardArray[2] === boardArray[8]) ||
                (boardArray[3] === boardArray[4] && boardArray[3] === boardArray[5]) ||
                (boardArray[6] === boardArray[7] && boardArray[7] === boardArray[8])
            ) {
                var winner = currentTurn === "x" ? "x" : "o";
                gameIsFinished = true;
                alertify.alert(`${winner} won`);
            }


            var isDraw = true;
            for (const square of boardArray) {
                if (square !== "x" && square !== "o") {
                    isDraw = false;
                }
            }
            if (isDraw) {
                gameIsFinished = true;
                alertify.alert("Draw");
            }
        }
        document.getElementById("reset-btn").addEventListener("click", () => {
            reset();
        })
        function reset() {
            //resetting the value part
            for (const item of gridItems) {
                let value = item.getAttribute("value");
                let squareContent = document.querySelector(`.square[value="${value}"]`);
                squareContent.innerHTML = "";
            }
            boardArray = [
                "0", "1", "2",
                "3", "4", "5",
                "6", "7", "8"
            ];
            gameIsFinished = false;
            currentTurn = "x";
            document.getElementById("instruction").textContent = `${currentTurn} turn`;
        }
        evaluateBoard();
        if (currentTurn === "x") {
            currentTurn = "o";
        } else {
            currentTurn = "x";
        }
        document.getElementById("instruction").textContent = `${currentTurn} turn`;
    });
}