
var canvas = document.getElementById('myCanvas');
var stage = canvas.getContext('2d')
var gameStart = true;
var button = document.getElementById('startButton')

var mouse;

var hoverTint = '#e72a87';

var puzzle = {
    width: null,
    height: null,
    difficulty: 4,

    pieceWidth: null,
    pieceHeight: null,

    pieces: [],
    totalPieces: null,

    currentPiece: null,
    currentDropPiece: null
}

var puzzleImage =  document.createElement('img');

initPuzzle();

function initPuzzle(){
    mouse = {x:0, y:0};
    puzzle.currentPiece = null;
    puzzle.currentDropPiece = null;
    puzzleImage.src = 'toejam.jpg'
	puzzleImage.addEventListener('load', setCanvasDimensions)
}

function setCanvasDimensions(){
    puzzle.width = puzzleImage.width;
    puzzle.height = puzzleImage.height;

    canvas.width = puzzle.width; 
    canvas.height = puzzle.height;

    peiceDimensions();
}

function peiceDimensions(){
    puzzle.pieceWidth = Math.floor(puzzle.width / puzzle.difficulty);
    puzzle.pieceHeight = Math.floor(puzzle.height / puzzle.difficulty);

    puzzle.totalPieces = puzzle.difficulty * puzzle.difficulty; 
    buildCanvas();
}

function buildCanvas(){
    // stage.drawImage(puzzleImage, 0, 0)
    stage.drawImage(puzzleImage, 0, 0, puzzle.width, puzzle.height, 0, 0, puzzle.width, puzzle.height)
    canvas.style.border = '1px solid #2a2a2a'

    //addEventlistener inside function 
    button.addEventListener('click', function(){
        puzzle.pieces = [];
        //reset the array so its empty
    	buildPieces();
    })
}

//generate pieces
function buildPieces(){
    //sx and sy only
    var piece;

    var sxPos = 0;
    var syPos = 0; 

    for(var i = 0; i < puzzle.totalPieces; i++){		
    	piece = {};
    	piece.sx = sxPos;
    	piece.sy = syPos;
        piece.name = i + 1;

    	sxPos += puzzle.pieceWidth;

    	if(sxPos >= puzzle.width){
    		sxPos = 0;
    		syPos += puzzle.pieceHeight; 
    	}
		puzzle.pieces.push(piece);
		// console.log(puzzle.pieces[i])
    }

    assemblePuzzle();
}

//my version
function assemblePuzzle(){

    if(gameStart){
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
        gameStart = false;
    }
	canvas.addEventListener('click', onPuzzleClick);
}

	function onPuzzleClick(e){

		var selectedPiece;

	    mouse.x = e.clientX;
	    mouse.y = e.clientY; 

	    console.log('mouseX ' + mouse.x)
	    console.log('mouseY ' + mouse.y)

	    puzzle.currentPiece = getCoordinates(mouse.x, mouse.y);

	    for(var i = 0; i < puzzle.pieces.length; i++){
	    	 if(puzzle.currentPiece[0] === puzzle.pieces[i].cellX && puzzle.currentPiece[1] === puzzle.pieces[i].cellY){
	    	 	selectedPiece = puzzle.pieces[i]
	   		 }
	    }	

	    puzzle.currentPiece = selectedPiece;
        console.log(puzzle.currentPiece)

        canvas.onmousemove = updatePuzzle;
        canvas.onmouseup = pieceDropped;

        canvas.addEventListener('mouseup', pieceDropped);
        canvas.addEventListener('mousemove', updatePuzzle)
	}


function updatePuzzle(e){
    puzzle.currentDropPiece = null;

    mouse.x = e.clientX;
    mouse.y = e.clientY;
    //can also use:
    //mouse.x = this.clientX;
    //mouse.y = this.clientY;

    stage.clearRect(0, 0, puzzle.width, puzzle.height)

    // stage.drawImage(puzzleImage, puzzle.currentPiece.sx, puzzle.currentPiece.sy, puzzle.pieceWidth, puzzle.pieceHeight, puzzle.currentPiece.dx, puzzle.currentPiece.dy, puzzle.pieceWidth,  puzzle.pieceHeight);
    stage.drawImage(puzzleImage, puzzle.currentPiece.sx, puzzle.currentPiece.sy, puzzle.pieceWidth, puzzle.pieceHeight, mouse.x - (puzzle.pieceWidth / 2), mouse.y - (puzzle.pieceHeight / 2), puzzle.pieceWidth,  puzzle.pieceHeight);
    stage.save();
    stage.globalAlpha = .4;
    stage.fillStyle = hoverTint;
    // stage.fillRect(puzzle.currentDropPiece.sx, puzzle.currentDropPiece.sy, puzzle.peiceWidth, puzzle.pieceHeight)
    // stage.restore();
    // stage.strokeRect(puzzle.currentPiece.dx, puzzle.currentPiece.dy, puzzle.pieceWidth, puzzle.pieceHeight)

        // stage.save();
        // stage.globalAlpha = .4;
        // stage.fillStyle = PUZZLE_HOVER_TINT;
        // stage.fillRect(puzzle.currentDropPiece.sx, puzzle.currentDropPiece.sy, puzzle.peiceWidth, puzzle.pieceHeight)
        // stage.restore();
}

function pieceDropped(e){
    console.log('mouse up')
    // puzzle.currentPiece = null;
}

function shuffleArray(o){
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function getCoordinates(xCor, yCor){
	var newCoord = [] 

	var newX = Math.floor(xCor / puzzle.pieceWidth) + 1; //160
	newCoord.push(newX)

	var newY = Math.floor(yCor / puzzle.pieceHeight) + 1; //84
	newCoord.push(newY)

	return newCoord; 
}
