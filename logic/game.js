//console.log("game.js");

var dices, point, points,
	total = 0,
	bonus = 65,
	timesLeft = 3,
	holdingDices = [];

var fields = {
	_one 	:0,
	_two	:0,
	_three	:0,
	_four	:0,
	_five	:0,
	_six	:0,
	_onPair 		: [0,0],
	_twoPairs		: [[0,0],[0,0]],
	_treeOfAKind	: [0,0,0],
	_fourOfAKind	: [0,0,0,0], 
	_smallStright	: [1,2,3,4,5],
	_bigStright		: [2,3,4,5,6],
	_fullHouse		: [[0,0],[0,0,0]],
	_chanse			: 0,
	_yatsy			: 0
};


var poäng = ["1_","2_","3_","4_","5_","6_","sum_","bonus_","pair_","twoPairs_","threeOfAKind_","fourOfAKind_","smallStraigth_","bigStraigth_","fullHouse_","chans_","yatsy_"];

function createplayerTable(userNum) {
	poäng.forEach(function (f) {
		console.log("skapar fält:" + f +"p"+userNum);
	});
}



function initGame() {
	
	console.log("init Game")
	console.log("init Players","\np1:",p1,"\np2:",p2);
}

function countPoints(user) {
	console.log(user);

	if(user.field){
		console.log("user.fields ", user.fields)
		for(var f in user.fields){
			console.log(f);
		}
	}
}

function countSum(player){
	if(!player) return console.log("missing player - which player should count sum?")
	var totSum = 0;

	for(var i = 1; i < 7; i++ ){

		var point = document.getElementsByName(i+"_"+player)[0].textContent;
		if(point && point != 0 || point != "0"){
			totSum += parseInt(point);
		} 
	}
	document.getElementsByName("sum_"+ player)[0].textContent = totSum;
	console.log("Player "+ player+ ": SUM: " + totSum);

	// om man har mer än '63 så lägg till 50 poäng'
	if(totSum > 62){
		alert("Yeah! You got +50 points");
		document.getElementsByName("bonus_"+ player)[0].textContent = 50;

		// annars förlorar du per-automatik :p hehe
	}else alert("noooo bonus for you :(")

}


function clearTipField(){
	console.log("clearTipField");
	// testa att markera fält
	for(var i = 1; i < 7; i++){
		var a = document.getElementsByName(i+'_p1')[0];
		

		//console.log(a.textContent)
		// om fältet innehåller "()tips" eller 0
		// så återställer vi fältet
		if(a.textContent == "0" || a.textContent.includes('(')){
			//console.log("detta fält innehåller tips - återställ");
			a.style.color = "white";
			a.textContent = "0";
		}
	}
	
}

function setTipField(fields,point,tipToPlayer){

	var antalTips  = fields.length;
	//console.log("Antalt fält som skall markeras:", antalTips); 
	fields.forEach(function(fieldClassName,i){

		tipField = document.getElementsByName(fieldClassName)[0];
		
		// markera endast om det INTE finns poäng i fältet
		if(tipField.textContent == "0"){
			tipField.textContent = "("+ point[i] +")";
			tipField.style.color = "black";
		}

	});

	var info = document.getElementById('dicesInfo');
	info.textContent = tipToPlayer;

}

function randomDices() {
	dices = [];
	for(var i = 0; i < 5; i++){
		dices.push(Math.round(Math.random()*5+1));
	}
	return dices
}

function throwDices() {


	console.clear();
	clearTipField();


	total = 0;
	timesLeft--;
	mydices = [];
	var diceArea = document.getElementsByClassName('diceArea');
	

	if(timesLeft >= 0){

		if(timesLeft == 0){
			document.querySelectorAll('#kastaTarning')[0].textContent = "Klar!";
		}

		// spela ljud
		var diceSound = new Audio('throw.mp3');
		diceSound.play();

		//visa tärningar
		diceArea[0].className = "diceArea";

		dices = randomDices();
		document.querySelectorAll('#timesLeft')[0].textContent = timesLeft;
		document.querySelectorAll('#dices')[0].textContent = dices;




		//console.log("these dices should not be touched:", markedDices);
		dices.forEach(function (num,i) {

			// console.log(`
			// 	dice: `+ i +`
			// 	num: `+ num +`
			// 	markedDices:`+markedDices[i]);



			if(markedDices[i] == i){
				//console.group(markedDices);
				//alert("dont flip me:" + markedDices[i]);
				console.log("dice nr :" ,markedDices[i], "is marked")
				return;
			} 

			// if(markedDices.includes(i)){
			// 	console.log("dont touch this dice!")
			// }

			//plussa till summan till total
			total += num;
			mydices.push(num);

			

			// sätt värden på knappar/tärningar
			document.querySelectorAll('#d'+(i+1))[0].textContent = num;
			document.querySelectorAll('#d'+(i+1))[0].value = num;


			// visa tärningarna 0-5(1-6)
			var img = document.querySelectorAll('#img_d'+i);
			img[0].src = "img/d"+num+".gif";
			img[0].value = num;

			//var attr = img[0].getAttribute('onclick');
			//console.log("attr:",attr);


		});

		
		// visa total kast poäng 
		$('#dicesTotal').html(total);
		//document.getElementsByName('chans_p1')[0].textContent = total;


		//	skicka iväg på kontroll
		//	samt visa möjliga utfall
		checkDices(mydices);

		//console.log("mydices:",mydices);
		console.log("######");

	}else{


		
		// byta spelare
		currentPlayer++;
		//console.log("this player(nr):",currentPlayer);

		//återställ antal kast
		timesLeft = 3;
		document.querySelectorAll('#timesLeft')[0].textContent = timesLeft;

		// återställ tärningar
		resetDices()
		
		// dölj tärningarna
		diceArea[0].className = "hidden diceArea";
		
		// töm resultat
		$('#dicesTotal').html("");
		
		//markera nästa spelare
		setCurrentPlayer()
		//markPlayerActive(currentPlayer);
	
		document.querySelectorAll('#kastaTarning')[0].textContent = "Kasta Tärning!";
		document.getElementById('dicesInfo').textContent = "";
		
		// återställ markerade tärningar
		markedDices = [];

		return console.log('Next Player');
	}

	


}

function resetDices() {

	for(var i = 0; i < 5; i++ ){
		var d = document.querySelectorAll('#img_d'+i);
		d[0].setAttribute('onclick','markDice(this.id);');
		d[0].setAttribute('src','#');
	}
	
}

function holdDice(dice) {
	
	console.log(dice.value);

	dice.className += " disabled";
	dice.setAttribute("onClick", "removeDice(this)");

	holdingDices.push(dice);
	console.log(holdingDices);

}


function removeDice(dice) {
	console.log("REMOVE DICE")
	for(d in holdingDices){
		console.log(d);
	}
	console.log("REMOVE DICE", dice.value);
	console.log("REMOVE DICE", dice);

	dice.className = "btn";
	dice.setAttribute("onClick", "holdDice(this)");


}






function checkDices(arr) {
	//console.log("checkDices: ", arr);

    var a = [], b = [], prev;

    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }

    console.log("antal unika utfall:" + a.length);
    //console.log("utfall: ", a)
    //console.log("förekomster: ", b)
    
 //    for(c in a){
 //    	console.log("a[c]:",a[c]);
 //    }
	// console.log("/*/*");
 //    for(d in b){
 //    	console.log("b[d]:",b[d]);
 //    }



    // console.log(`Throw result:
    // 	`+ a[0] +`:` + b[0] + `st - total:` +( a[0]*b[0] ) +` \n
    // 	`+ a[1] +`:` + b[1] + `st - total:` +( a[1]*b[1] ) +` \n
    // 	`+ a[2] +`:` + b[2] + `st - total:` +( a[2]*b[2] ) +` \n
    // 	`+ a[3] +`:` + b[3] + `st - total:` +( a[3]*b[3] ) +` \n
    // 	`+ a[4] +`:` + b[4] + `st - total:` +( a[4]*b[4] ) +` \n
    // 	`+ a[5] +`:` + b[5] + `st - total:` +( a[5]*b[5] ) +` \n
    // `);

    verifyDices({
    	0:a,
    	1:b,
    	uniqs:a,
    	count:b,
    	orginal:arr
    });

    //return console.log([a, b]);

}


 

function verifyDices(dices){
	//console.log(dices);
	if(typeof(dices) == "object")

		infoToPlayer = "";
		cases = dices["count"];
		uniqs = dices["uniqs"];
		uniqsCount = dices["uniqs"].length;

		console.log("alla:",dices.orginal);
		console.log("tärning:",uniqs);
		console.log("gånger:",cases);

		var tot 		= 0,
			pairs 		= [],
			tips 		= [],
			tipsTotal 	= [];

		uniqs.forEach(function(d,i){

			// total av utfall t.ex (3*2) 3st 2:or
			tot = (parseInt(dices[1][i])*parseInt(d))
			//console.log(d + " hittades " + dices[1][i] + "ggr = " + (parseInt(dices[1][i])*parseInt(d)))
			
			tipsTotal.push(tot);
			tips.push(uniqs[i]+'_p1');

		});


		/*
		/
		/ VISUELLT RESULTAT
		/
		*/

		
		



		
		if(dices[1][0] > 1 || dices[1][1] > 1){
			//console.log("MINST ett par");
		}

		switch(uniqsCount){

			case 1: // YATSY;
					infoToPlayer = "YATSY";
				//markField()
				break;

			case 2:
				// KÅK
				if( cases[0] == 2 && cases[1] == 3 || cases[0] == 3 && cases[1] == 2){
					infoToPlayer = "KÅK";
				}
				// 4 TAL
				if(cases[0] == 4 || cases[1] == 4){
					infoToPlayer = "4 OF A KIND";
				}
				break;
			
			case 3: 
				// 3 TAL
				if(cases[0] == 3 || cases[1] == 3 || cases[2] == 3){
					infoToPlayer = "3 OF A KIND";
				} 

				break;

			case 5: 
					if(uniqs[0] == 1 && uniqs[4] == 5){
						infoToPlayer = "SMALL STRIGHT";

					} 
					if(uniqs[0] == 2 && uniqs[4] == 6){
						infoToPlayer = "BIG STRIGHT";
					} 
				break;

			default: break;
			
		}

		// markera möjliga fält med poäng
		setTipField(tips,tipsTotal, infoToPlayer);
}

