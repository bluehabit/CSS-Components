var canvas = document.getElementById('myCanvas');
var stage = canvas.getContext('2d')
var gameInProgress = false;
var startGameButton = document.getElementById('startButton')

var mouse;
var mouseDown;

var hoverIndex;
var currentIndex; 

var puzzle = {
    width: null,
    height: null,
    difficulty: 4,

    pieceWidth: null,
    pieceHeight: null,

    pieces: [],
    totalPieces: null,

    currentPiece: null,
    hoverCoordinates: null
}

var puzzleImage = document.createElement('img');

initPuzzleState();

function initPuzzleState() {
    mouse = { x: 0, y: 0 };
    flag = false;
    puzzle.currentPiece = null;
    puzzleImage.src = 'toejam.jpg'
    puzzleImage.addEventListener('load', initCanvas);
    startGameButton.addEventListener('click', startNewGame)
}

function initCanvas() {
    setCanvasDimensions();
    pieceDimensions();
    buildCanvas();
}

function setCanvasDimensions() {
    puzzle.width = puzzleImage.width;
    puzzle.height = puzzleImage.height;

    canvas.width = puzzle.width;
    canvas.height = puzzle.height;
}

function pieceDimensions() {
    puzzle.pieceWidth = Math.floor(puzzle.width / puzzle.difficulty);
    puzzle.pieceHeight = Math.floor(puzzle.height / puzzle.difficulty);

    puzzle.totalPieces = puzzle.difficulty * puzzle.difficulty;
}

function buildCanvas() {
    // stage.drawImage(puzzleImage, 0, 0)
    stage.drawImage(puzzleImage, 0, 0, puzzle.width, puzzle.height, 0, 0, puzzle.width, puzzle.height);
    canvas.style.border = '1px solid #2a2a2a';
}

function startNewGame() {
    puzzle.pieces = [];
    // gameInProgress = true;

    if(gameInProgress === false ){
        buildPieces();
        assemblePuzzle();
        canvas.addEventListener('click', pieceGrabbed);
        // canvas.addEventListener('click', swapPieces)
        // canvas.addEventListener('click', pieceGrabbed);
        // canvas.addEventListener('mousemove', updatePuzzle);
        // canvas.addEventListener('mouseup', pieceDropped);
    }
}

//generate pieces
function buildPieces() {

    //sx and sy only
    var piece;

    var sxPos = 0;
    var syPos = 0;

    for (var i = 0; i < puzzle.totalPieces; i++) {
        piece = {};
        piece.sx = sxPos;
        piece.sy = syPos;
        piece.name = i;

        sxPos += puzzle.pieceWidth;

       if (sxPos >= puzzle.width) {
            sxPos = 0;
            syPos += puzzle.pieceHeight;
        }
        puzzle.pieces.push(piece);
    }
}

function assemblePuzzle(){

    // if(gameInProgress === false){
        puzzle.pieces = shuffleArray(puzzle.pieces);
        //drawing the pieces to the canvass, dx and dy only
        var dxPos = 0;
        var dyPos = 0;

        for(var i = 0; i < puzzle.pieces.length; i++){      

            puzzle.pieces[i].dx = dxPos;
            puzzle.pieces[i].dy = dyPos;

            puzzle.pieces[i].cellX =  Math.floor(puzzle.pieces[i].dx / puzzle.pieceWidth) + 1;
            puzzle.pieces[i].cellY =  Math.floor(puzzle.pieces[i].dy / puzzle.pieceHeight) + 1;

            stage.drawImage(puzzleImage, puzzle.pieces[i].sx, puzzle.pieces[i].sy, puzzle.pieceWidth, puzzle.pieceHeight, dxPos, dyPos, puzzle.pieceWidth, puzzle.pieceHeight)
            stage.strokeRect(dxPos, dyPos, puzzle.pieceWidth, puzzle.pieceHeight);
            
            dxPos += puzzle.pieceWidth;

            if(dxPos >= puzzle.width){
                dxPos = 0;
                dyPos += puzzle.pieceHeight; 
            }

        }
        gameInProgress = true;
    // }
    // canvas.addEventListener('click', pieceGrabbed);
}

function pieceGrabbed(e) {
	//in the if condition below, there is a flag variable
	//this is important to check becuase if you click where
	//the hover is, the hover and click become the same piece
	//that is why the selected piece should only change
	//on a specific condition

	if(flag === false){
		var selectedPiece;

	    mouse.x = e.clientX;
	    mouse.y = e.clientY;

	    puzzle.currentPiece = getCoordinates(mouse.x, mouse.y);

	    for (var i = 0; i < puzzle.pieces.length; i++) {
	        if (puzzle.currentPiece[0] === puzzle.pieces[i].cellX && puzzle.currentPiece[1] === puzzle.pieces[i].cellY) {
	            selectedPiece = puzzle.pieces[i]
	            currentIndex = i;
	            console.log(currentIndex)
	        }
	    }

	    puzzle.currentPiece = selectedPiece;
	    console.log(puzzle.currentPiece)

	    if(puzzle.currentPiece !== null){
	     canvas.addEventListener('mousemove', updatePuzzle);
	    }
	}
}


function updatePuzzle(e){
	flag = true;

    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // stage.clearRect(0, 0, puzzle.width, puzzle.height);
    // console.log('painting puzle')

    //replace code with function
    var dxPos = 0;
    var dyPos = 0;

        for(var i = 0; i < puzzle.pieces.length; i++){      
            puzzle.pieces[i].dx = dxPos;
            puzzle.pieces[i].dy = dyPos;

            puzzle.pieces[i].cellX =  Math.floor(puzzle.pieces[i].dx / puzzle.pieceWidth) + 1;
            puzzle.pieces[i].cellY =  Math.floor(puzzle.pieces[i].dy / puzzle.pieceHeight) + 1;

            stage.drawImage(puzzleImage, puzzle.pieces[i].sx, puzzle.pieces[i].sy, puzzle.pieceWidth, puzzle.pieceHeight, dxPos, dyPos, puzzle.pieceWidth, puzzle.pieceHeight)
            stage.strokeRect(dxPos, dyPos, puzzle.pieceWidth, puzzle.pieceHeight);
            
            dxPos += puzzle.pieceWidth;

            if(dxPos >= puzzle.width){
                dxPos = 0;
                dyPos += puzzle.pieceHeight; 
            }
        }
    //    

    ///user selected puzzle piece
    stage.globalAlpha = .75;

    //experimental: if condition added below
    // if(puzzle.currentPiece !== null){
    	//problem: alpha multiplies here on each mousemove
	    stage.drawImage(puzzleImage, puzzle.currentPiece.sx, puzzle.currentPiece.sy, puzzle.pieceWidth, puzzle.pieceHeight, mouse.x - (puzzle.pieceWidth / 2), mouse.y - (puzzle.pieceHeight / 2), puzzle.pieceWidth,  puzzle.pieceHeight);
		stage.strokeRect( mouse.x - (puzzle.pieceWidth / 2), mouse.y - (puzzle.pieceHeight / 2), puzzle.pieceWidth, puzzle.pieceHeight);
	    //applies the stroke where user cursor is

	    puzzle.hoverCoordinates = getCoordinates(mouse.x, mouse.y);
	    // console.log(puzzle.hoverCoordinates)

	    highlightPiece()
	    // swapPieces();
	    // canvas.addEventListener('click', swapPieces)
    // }
 }

 function highlightPiece(){

	 var hoverPiece = {};
	 hoverPiece.cellX = puzzle.hoverCoordinates[0];
	 hoverPiece.cellY = puzzle.hoverCoordinates[1]; 

 	for(var i = 0; i < puzzle.pieces.length; i++){
 		if(hoverPiece.cellX === puzzle.pieces[i].cellX && hoverPiece.cellY === puzzle.pieces[i].cellY){
 			stage.fillStyle = 'blue'
        	stage.globalAlpha = .4
        	stage.fillRect(puzzle.pieces[i].dx, puzzle.pieces[i].dy, puzzle.pieceWidth, puzzle.pieceHeight);
 			
 			hoverIndex = i;
 		}
 	}

	canvas.addEventListener('click', swapPieces);
 }

 function swapPieces(e){

 	var x = currentIndex;
 	//0
 	var y = hoverIndex;
 	//1

 	var xObject = puzzle.pieces[x]
 	//Object {sx: 160, sy: 84, name: 6, dx: 0, dy: 0…}

 	var yObject = puzzle.pieces[y]
 	// Object {sx: 320, sy: 252, name: 15, dx: 160, dy: 0…}

 	//for this swap function to work the index of the array
 	//and the object at the array index must be saved to
 	//their own variables

 	puzzle.pieces[x] = yObject
 	puzzle.pieces[y] = xObject

 	var dxPos = 0;
    var dyPos = 0;

        for(var i = 0; i < puzzle.pieces.length; i++){      

            puzzle.pieces[i].dx = dxPos;
            puzzle.pieces[i].dy = dyPos;

            puzzle.pieces[i].cellX =  Math.floor(puzzle.pieces[i].dx / puzzle.pieceWidth) + 1;
            puzzle.pieces[i].cellY =  Math.floor(puzzle.pieces[i].dy / puzzle.pieceHeight) + 1;

            stage.drawImage(puzzleImage, puzzle.pieces[i].sx, puzzle.pieces[i].sy, puzzle.pieceWidth, puzzle.pieceHeight, dxPos, dyPos, puzzle.pieceWidth, puzzle.pieceHeight)
            stage.strokeRect(dxPos, dyPos, puzzle.pieceWidth, puzzle.pieceHeight);
            
            dxPos += puzzle.pieceWidth;

            if(dxPos >= puzzle.width){
                dxPos = 0;
                dyPos += puzzle.pieceHeight; 
            }

        }

    //halp
    // puzzle.currentPiece = null;
    checkWin();
 }	

function checkWin(){
	var win = true;

	for(var i = 0; i < puzzle.pieces.length; i++){
		if(puzzle.pieces[i].name !== i){
			win = false
		}
	}
	// return win; 
	
	if(win){
		alert('you win');
	}
} 


// function pieceDropped(e) {
//     console.log('mouse up')
// }

function shuffleArray(o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function getCoordinates(xCor, yCor) {
    var newCoord = []

    var newX = Math.floor(xCor / puzzle.pieceWidth) + 1; //160
    newCoord.push(newX)

    var newY = Math.floor(yCor / puzzle.pieceHeight) + 1; //84
    newCoord.push(newY)

    return newCoord;
}

// function getIndex(xCor, yCor){
// 	var i = Math.floor(xCor / puzzle.pieceWidth);
// 	var j = Math.floor(yCor / puzzle.pieceHeight);
//         var index = j* puzzle.difficulty + i;

// 	return index;
// }

// canvas.addEventListener('mousedown', function(e){	
// 	if(e.type === 'mousedown'){
// 		console.log('mousedown...')
// 		//run your mousedown code here
// 	}
// });

// canvas.addEventListener('mouseup', function(){
// 	console.log('mouse up')
// 	//run your mouseup code here
// })