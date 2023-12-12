let savedDices = [];
let markedDices = [];

const throwDices = () => {

    dicesCount = 5;
    const dicesArray = [];

    document.querySelector('.diceArea').removeAttribute('hidden')

    /*if(markedDices.length){
        console.log('These dices should not be touched', markedDices);
        return;
    }*/

    for (let index = 0; index < 5; index++) {
        const rndNum = Math.floor(Math.random() * (7 - 1) + 1);
        dicesArray.push(rndNum);
    }
    //console.log('theDices', dicesArray);

    dicesArray.map((value,i)=>{
        i++;

        if(markedDices.includes(i)){
            console.log('Dont touch this dice', {i});
            return;
        }else{
            
            //console.log('now render dice nr:', i, 'and set value to', value );
            // Images
            const img_element = document.querySelector(`#img_d${i}`);
            img_element.setAttribute('src', `./img/d${value}.gif`);
            img_element.setAttribute('value', value);
        }
        
    })

    //console.log('markedDices', markedDices);
    //return dicesArray;
}

throwDices();









function markDice(id) {

	//console.log("save dice id : " + id);

	point = $('#'+id)[0].src;
	point = point.split('/').pop().split('.gif').shift().split('d').pop();
	dice = id.split('img_').pop().split('d').pop();
	

    //console.log('dice', dice);
    //console.log('point', point);

	markedDices.push(parseInt(dice));

	console.log("tarningen ", parseInt(dice) ,` poäng: ${point}`);

	// byt ut bilden
	$(`#${id}`)[0].src = `img/m/d${point}.gif`;

	//markedDices.push();

	//var func = $('#'+id)[0].onclick;
	//console.log(func);
	var t = document.getElementById(id);
	t.setAttribute("onClick", `unmarkDice(${dice},${point})`);

    
    //console.log('markedDices', markedDices);

}