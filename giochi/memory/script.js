 
window.onload = windowOnLoad;

var cards;
var ROWS=4,COLS=4;
var selectedCard1, selectedCard2;

function windowOnLoad() {
	//alert("ciao");
	var app = document.getElementById("app");
	if (app != null) {
		var board = createBoard();
		app.appendChild(board);
	}
}

function createElement(type, id, className) {
	var e = document.createElement(type);
	e.id = id;
	e.className = className;
	return e;
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(a) {
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1)); //return a random int number between 0 and i
        var temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
}

function openCard(card) {
	card.isOpen = true;
	card.innerHTML = card.contentValue;
	card.className = card.className + " cardOpened";
	console.log("open card="+card.i);
}
function closeCard(card) {
	card.isOpen = false;
	card.innerHTML = card.i;
	card.className = "card";
	console.log("close card "+card.i);
}
 
function createBoard () {
	if (ROWS > 0 && COLS > 0) {
		cards=[];
		
		//init array of contents
		var contents = [];
		for(i=0;i<ROWS*COLS;i++) {
			contents.push(String.fromCharCode(65 + Math.floor(i/2)));
		}
		//console.log(contents);
		shuffleArray(contents);
		//console.log(contents);
		
		//create the board
		var board = createElement("div", "board", "board");
		var r,c,i=0;
		for(r=0;r<ROWS;r++) {
			var row = createElement("div", "boardRow-"+r, "boardRow");
			//boardRow
			for(c=0;c<COLS;c++) {
				var card = createElement("div", "card-" + i, "card");
				card.style="width:"+(100/ROWS)+"%;height:"+(100/COLS)+"%;";
				card.i = i; //custom property
				card.isOpen = false; //custom property
				card.innerHTML = i;
				card.contentValue = contents[i]; //custom property
				i++;
				card.onclick = function() {
					if (!this.isOpen && (selectedCard1 == null || selectedCard2 == null)) {
						openCard(this);
						if (selectedCard1 == null) {
							selectedCard1 = this;
						} else if (selectedCard2 == null) {
							selectedCard2 = this;
							console.log("compare card1=" + selectedCard1.i +
								" (content: " + selectedCard1.contentValue +
								") with card2=" + selectedCard2.i +
								" (content: " + selectedCard2.contentValue + ")");
							if (selectedCard1.contentValue != selectedCard2.contentValue) {
								var interval = setInterval(function () {
									clearInterval(interval);
									closeCard(selectedCard1);
									closeCard(selectedCard2);
									selectedCard1 = null;
									selectedCard2 = null;
								}, 500);
							} else {
								selectedCard1 = null;
								selectedCard2 = null;
							}
						}
					}
				};
				cards.push(card);
				row.appendChild(card);
			}
			board.appendChild(row);
		}
		
		return board;
	}
	return null;
}