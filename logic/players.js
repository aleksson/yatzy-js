//console.log("players.js");

var p1 = new Player("Player1") || {} || new Object,
	p2 = new Player("Player2") || {} || new Object;

var	players 		= [p1,p2],
	totalPlayers 	= players.length,
 	currentPlayer 	= 0;
	
$(function () {

	initPlayers();

	// Change name
	$('.player').click(function(){

		var pid = this.className.split('player p').pop();
		console.log(this.className);


		var newName = prompt("Vad heter spelaren");
		if(newName) this.textContent = newName;
		console.log("change player("+players[pid-1].name+") nr " + pid + " to :" + newName)
		players[pid-1].name = newName;
		
	});


});
// jQuery


function initPlayers() {
	//alert("START GAME : ")
	//setCurrentPlayer(currentPlayer);
	setCurrentPlayer();
}



function clearPlayers(){

	var allplayers = document.getElementsByClassName('player active');

	for(var i = 0; i < allplayers.length; i++){
		console.log("clear player: "+ allplayers[i]);
		allplayers[i].className = "player p" + i;
	}

}

// function setCurrentPlayer(player){

// 	//clearPlayers();
// 	console.log("setCurrentPlayer:::",player);

// 	if(typeof(player) == "number") currentPlayer = players[player];
// 	else currentPlayer = player;

// 	document.getElementById('currentPlayer').textContent = currentPlayer.name;

// 	// sätt färg för aktiv spelare 
// 	var p = document.getElementsByClassName('player');
// 	if(p[0]) p[0].style.color = "orange";
// }



function setCurrentPlayer(){

	//clearPlayers();
	if(currentPlayer >= totalPlayers){
		console.log(players[currentPlayer-1].name+" was the last player!!");
		currentPlayer = 0;
	}

	document.getElementById('currentPlayer').textContent = players[currentPlayer].name;

	// sätt färg för aktiv spelare 
	var p = document.getElementsByClassName('player');
	
	// rensa aktiv spelare
	for (var i = 0; i< p.length; i++) {
		p[i].style.color = "white";
	}
	// markera spelare på nytt
	if(p[currentPlayer]) p[currentPlayer].style.color = "orange";
}



function markPlayerActive(player){

	console.log("Next: " + player.name);
}

function addPlayer() {

	var playerName = prompt('New player Name:');
	//var nameArea = document.querySelectorAll('#players th');	

	if(playerName){

		totalPlayers++;
		var newPlayer = new Player(playerName);
		players.push(newPlayer);

		// bygg upp fält för spelare
		createplayerTable(totalPlayers);

		$('th:last').after('<th class="player p'+totalPlayers+'">'+playerName+'</th>');
		alert(playerName + " - Added to the game");


	}
}

function addPlayersToGame() {
	players.forEach((p)=>{
		$('#players').append('<th class="player p'+p.id+'">'+p.name+'</th>');
	});

}
addPlayersToGame();









var markedDices = []
function markDice(id) {

	//console.log("save dice : " + id);


	point = $('#'+id)[0].src;
	point = point.split('/').pop().split('.gif').shift().split('d').pop();
	dice = id.split('img_').pop().split('d').pop();
	
	markedDices.push(dice)

	console.log("tarningen ", parseInt(dice)+1 ," poäng: " + point);

	// byt ut bilden
	$("#"+id)[0].src = "img/m/d"+point+".gif";

	//markedDices.push();

	//var func = $('#'+id)[0].onclick;
	//console.log(func);
	var t = document.getElementById(id);
	t.setAttribute("onClick", "unmarkDice("+dice+","+point+")");


}

function unmarkDice(dice,point){

	console.log(markedDices);
	$('#img_d'+ dice)[0].src = "img/d"+point+".gif";
	var denna = document.getElementById('img_d'+ dice);
	denna.setAttribute("onClick", "markDice(this.id)");

	console.log("ta bort :" + point + "poäng"); 

}



//setPoint(currentPlayer,2,12); // 12 Poång till p1
function setPoint(player,field,points) {


	if(field == 7 || field == 8 || field == 18) return console.log("kan inte fylla summa/bonus/total fält")
	me = players[currentPlayer];
	
	//console.log(me);
	// fyll i respektive poäng fält
	var fält = $('#yatsyTable').find('tr');
	fält[/*fält*/field].cells[/*!SPELARE*/currentPlayer+1].textContent = points;
	//markPoint();
}


function markPoint(player,points) {

	players[currentPlayer].totalPoint += points;

	//var antalSpelare = totalPlayers.length;
	//var spelare = players[currentPlayer];
	//console.log(spelare)
	
	


}

function choose(value) {
 	
	console.log(value);
}