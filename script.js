/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
— BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins 
*/

var scores, roundScores, activePlayer, gamePlaying;
init();

document.querySelector('#Roll').addEventListener('click', function () {
    if(gamePlaying){
        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        
        // 2. Display the result
        var diceDOM = document.querySelector('#dice');
        diceDOM.style.display = 'block';
        diceDOM.src = dice + '.png';
    
        // 3. Update the round score if the rolled number was NOT a 1
        if(dice !== 1){
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else {
            //Next Player
            nextPlayer();
        }
    } 
});

document.querySelector('#Hold').addEventListener('click', function () {
    if(gamePlaying){
        // ADD CURRENT score to Global Score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
        // Check if player won the game
        if(scores[activePlayer] >= 100) {
            document.querySelector('#win-' + activePlayer).textContent = 'Winner!';
            document.querySelector('#dice').style.display = 'none';
            document.querySelector('.Player' + activePlayer).classList.add('winner');
            document.querySelector('.Player' + activePlayer).classList.remove('winner');
            gamePlaying = false;
        }
        else {
            // Next Player
            nextPlayer();
        }
    }  
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 
        roundScore=0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.querySelector('Player0').classList.toggle('active');
        document.querySelector('Player1').classList.toggle('active');
        document.querySelector('#dice').style.display = 'none';
}

document.querySelector('#New').addEventListener('click', init);

function init() {
scores = [0, 0];
roundScore = 0;
activePlayer = 0;
gamePlaying = true;

document.getElementById('dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('win-0').textContent = 'Player 1';
document.getElementById('win-1').textContent = 'Player 2';
document.querySelector('.Player0').classList.remove('winner');
document.querySelector('.Player1').classList.remove('winner');
document.querySelector('.Player0').classList.remove('active');
document.querySelector('.Player1').classList.remove('active');
document.querySelector('.Player0').classList.add('active');
}

//document.querySelector('#current-' + activePlayer).textContent = dice;
////document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//var x = document.querySelector('#score-' + activePlayer).textContent;
//console.log(x);