var score = 0;
var selctedMode = 0;
var modal = document.getElementById("myModal");
var scoreDiv = document.getElementById('score');
var highScoreDiv = document.getElementById('highScore');
var node = document.getElementById('matrix');

function selectMode(mode) {
    document.getElementById('matrix').innerHTML = ''; // clean if already populated
    switch(mode) {
        case 'easy':
            selctedMode = 3;
            break;
        case 'medium':
            selctedMode = 4;
            break;
        case 'hard':
            selctedMode = 6;
            break;
        default:
            break;
    }

    launchGame(selctedMode);
}

function launchGame(n, relaunch = false) {
    if(n<=0) {
        return
    } else {
        if (!relaunch) {
            document.getElementById('levelSelection').style.display = "none";
            document.getElementById('options').style.display = "block";
            document.getElementById('displayTimenScore').classList.remove('hide');
            let highScore = localStorage.getItem('highScore');
            if ( highScore ) {   
                highScoreDiv.innerHTML = parseInt( highScore );
            }
        } 
        printMatrix(n, n)
        let length = n*n;
        window.game = setInterval(startGame, 2000,length);
        launchTimer();
    }
}

function printMatrix(row, col) {
    var row = row;
    var col = col;
    var idCounter = 0;
    for (let i=0; i<row; i++) {
        var r = document.createElement('div');
        r.classList.add('row');
        for(let j=0; j < col; j++) {
            idCounter++;
            var c = document.createElement('div');
            c.id = 'box_' + idCounter;
            c.classList.add('col');
            c.classList.add('box');
            c.onclick = function(c) {
                if ( this.classList.contains('green') ) {
                    updateScore('increment');
                } else {
                    updateScore('decrement');
                }
            }
            r.appendChild(c);
        }
        node.appendChild(r);
    }
}

function launchTimer() {
    var timer = 120;
    window.x = setInterval(function() {
        document.getElementById("timer").innerHTML = timer;
        timer = timer - 1;
        if (timer < 0) {
            clearInterval(window.x);
            let score = document.getElementById("score");
            modal.style.display = "block";
            document.getElementById('modalContent').innerHTML = "Game Over!!!, Your Score is: " + score.innerHTML;
            clearInterval(window.game);
            clearInterval(window.coloredDiv);  
        } 
    }, 1000);
}

function startGame(length) {
    var id = Math.floor(Math.random() * length) + 1;
    var coloredDiv = document.getElementById('box_' + id);
    coloredDiv.classList.add('green');
    window.coloredDiv = setTimeout(function() {
        coloredDiv.classList.remove('green');
    }, 1000, coloredDiv);
}

function RemoveClass(id) {
    let coloredDiv = document.getElementById('box_' + id);
    if ( coloredDiv.classList.contains('green') ) {
        coloredDiv.classList.remove('green');
    }
}

function updateScore(action) {
    var score = scoreDiv.innerHTML;
    var newScore = parseInt( score );
    if (action == 'increment') {
        newScore = newScore + 1;
    } else {
        newScore = newScore - 1;
    }
    
    if ( newScore > parseInt(highScoreDiv.innerHTML) ) {
        highScoreDiv.innerHTML = newScore
        localStorage.setItem('highScore', newScore);
    }
    scoreDiv.innerHTML = newScore
}

function RestratGame() {
    modal.style.display = 'none';
    scoreDiv.innerHTML = 0;
    node.innerHTML = '';
    // remove class from all elements 
    clearInterval(window.x);
    clearInterval(window.game);  
    clearInterval(window.coloredDiv);  
    launchGame(selctedMode, true);
}

function EndGame() {
    location.reload();
}
