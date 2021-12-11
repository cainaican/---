var options, state, button,                                             //1 этап(старт)
    newButtonX, newButtonO,                                             //2 этап(выбор символа)
    player, comp, step, cellRan, check,                                 //3 этап(игра)
    i, j;                                                               //для циклов
function init() {
    //создание сегмента опций
    options = document.querySelector('.options');
    state = document.createElement('div');
    state.className = 'state';
    state.innerText = 'ДОБРО ПОЖАЛОВАТЬ В КРЕСТИКИ НОЛИКИ!';            //text
    button = document.createElement('button');
    button.className = 'mainButton';
    button.innerText = 'Играть';
    button.onclick = chooseSymbol;
    options.appendChild(state);
    options.appendChild(button);

    //создание доски
    var board = document.querySelector('.board');
    for (i = 0; i < 3; i++) {
        var row = document.createElement('div');
        row.className = 'row row_' + i;
        for (j = 0; j < 3; j++) {
            var cell = document.createElement('div');
            cell.className = 'cell ' + (+i * 3 + +j);
            cell.id = +i * 3 + +j;
            cell.onclick = draw;
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
}
function chooseSymbol(event) {
    //выбор символа игрока
    state.innerText = 'УРА! За кого будем играть?';                       //text
    options.removeChild(button);
    newButtonX = document.createElement('button');
    newButtonX.className = 'X newButton';
    newButtonX.innerText = 'X';
    newButtonX.onclick = play;
    newButtonO = document.createElement('button');
    newButtonO.className = 'O newButton';
    newButtonO.innerText = 'O';
    newButtonO.onclick = play;
    options.appendChild(newButtonX);
    options.appendChild(newButtonO);
}
function play(event) {
    player = event.target.className.split(' ')[0];
    state.innerText = 'ВАШ ХОД!';                                       //text
    options.removeChild(newButtonX);
    options.removeChild(newButtonO);
    (player === 'X') ? comp = 'O' : comp = 'X';
    step = 1;
}
function draw(event) {
    if (step == 1) {                                             //text
        state.innerText = 'Ход оппонента!';
        if (event.target.innerText == '') {
            event.target.innerText = player;
            checking(player);
            (step == 1) ? setTimeout(opponent, 500) : false;
        } else {
            alert('Ячейка занята!');
        }
    }
}
function opponent() {
    cellRan = (Math.random() * 7 + 1).toFixed(0);
    (document.getElementById(cellRan).innerText == '') ? document.getElementById(cellRan).innerText = comp : opponent();
    checking(comp);
    (step == 1) ? state.innerText = 'ВАШ ХОД!' : false;
}
function checking(check) {
    for (i = 1; i < 9; i++) {
        count = 0;
        for (j = 0; j < 3; j++) {
            (document.getElementById(correctPositions[i][j]).innerText == check) ? count++ : false;
            if (count == 3) {
                step = 2;
            }
        }
        if (step == 2) {
            step = 0;
            state.innerText = 'ПОБЕДИЛИ ' + check + '-КИ';
            if (confirm('ПОБЕДИЛИ ' + check + '-КИ \n Желаете сыграть еще?')) {
                location.reload();
            };
        }
    }
}
window.onload = init;