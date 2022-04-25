const winningCells = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
let availableChoices = [];
let humanChoices = [];
let computerChoices = [];
let win = false;
newGame();

function newGame() {
    tableDraw();
    availableChoices = [];
    humanChoices = [];
    computerChoices = [];
    win = false;
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`cell${i}`).innerHTML = "";
        document.getElementById(`cell${i}`).addEventListener("click", function(){ clicked(i) }, false); 
    }
    for (let i = 1; i <= 9; i++) {availableChoices.push(i);}
    document.getElementById("outcome").innerHTML = "";
}

function clicked(cellnumber) {
    if (availableChoices.indexOf(cellnumber) > -1) {
        document.getElementById(`cell${cellnumber}`).innerHTML = "X";
        availableChoices.splice(availableChoices.indexOf(cellnumber),1);
        // .sort((a, b) => a - b);
        humanChoices.push(cellnumber);
        winCheck(humanChoices);
        if (win == true) {
            document.getElementById("outcome").innerHTML = `<div class="winner">"Выигрыш!"</div>`;
            availableChoices = [];
        };
        if (availableChoices.length > 0){computerMove();}
        if (availableChoices.length === 0 && win === false){document.getElementById("outcome").innerHTML = `<div class="draw">"Ничья!"</div>`;}
    }
}

function tableDraw(){
    let tableCode = `<table border="1"><tr>`;
    for (let i = 1; i < 10; i++){
        tableCode += `<td><div id=cell${i} class="cell"></div></td>`;
        if (i === 3 || i === 6) tableCode += `</tr><tr>`;
    }
    tableCode += `</tr></table>`
    document.getElementById(`insertTable`).innerHTML = tableCode;
    document.getElementById(`newGameButton`).innerHTML = `<button onclick="newGame()" class="button">New game</button>`;
}

function computerMove(){
    const random = Math.floor(Math.random() * availableChoices.length);
    const randomCell = availableChoices[random];
    document.getElementById(`cell${randomCell}`).innerHTML = "O";
    computerChoices.push(randomCell);
    availableChoices.splice(availableChoices.indexOf(randomCell),1);
    winCheck(computerChoices);
    if (win == true) {
        document.getElementById("outcome").innerHTML = `<div class="looser">"Проигрыш!"</div>`;
        availableChoices = [];
    };

}

function winCheck(array){
    winningCells.forEach(item => {
        let a = item[0];
        let b = item[1];
        let c = item[2];
        if (array.indexOf(a) > -1 && array.indexOf(b) > -1 && array.indexOf(c) > -1) {win = true};
    })
}
