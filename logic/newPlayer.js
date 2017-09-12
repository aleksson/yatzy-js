var fields = {
	_one 	:0,
	_two	:0,
	_three	:0,
	_four	:0,
	_five	:0,
	_six	:0,
	_seven	:0,
	_eight	:0,
	_nine	:0,
	_ten	:0,
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
var userID = 1;





class Player{
	constructor(name){
		
		this.id = userID++;
		this.name = name;
		this.totalPoints = 0;
		this.bonus = false;
		this.fields = {
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
		this.points = {
			_onPair 		: 0,
			_twoPairs		: 0,
			_treeOfAKind	: 0,
			_fourOfAKind	: 0, 
			_smallStright	: 15,
			_bigStright		: 20,
			_fullHouse		: 0,
			_chanse			: 0,
			_yatsy			: 50
		};

	}
	addToGame(){
		return this.name + " added to the game."; 
	}
	sayHi(){
		return "Hi!. My name is " + this.name + " and i have " + 
		  this.points + " point.";
	}
	setPoint(){
		return this.points
	}
	info(){
		return {
			points: this.points,
			name: this.name,
			bonus : false,
		}
	}
}