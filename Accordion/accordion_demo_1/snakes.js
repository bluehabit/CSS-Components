
// var games = [
// 	{
// 		title: 'Splatterhouse 3',
// 		rated: 'M'
// 	},
// 	{
// 		title: 'Sonic 2',
// 		rated: 'E'
// 	},
// 	{
// 		title: 'Freedom Planet',
// 		rated: 'E'
// 	},
// ]

// function addGame(title, rating){
// 	var game = {}
// 	game.title = title;
// 	game.rating = rating;

// 	var duplicateGames = games.filter(function(element){
//     	return element.title === title; 
//   	});
//   	//creates a new arr filled with duplicate values

//   	if(duplicateGames.length === 0){
//   		games.push(game);
//   	}
//   	//if duplicateGames array is empty [],
//   	//that means game added is NOT a duplicate
//   	//so go ahead and push it

//   	return games;
// }


// var megaMan7 = addGame('Mega Man 7', 'E');


//Example 1
// var note = {
// 	title: 'Sonic 3',
// 	body: 'Hedgehog'
// } 

// console.log(`my favorite game is ${note.title}`);
// //-> my favorite game is Sonic 3



// //Example 2
// var a = 5;
// var b = 10;

// console.log(`Fifteen is ${a + b} and not ${2 * a + b}.`);
// //-> Fifteen is 15 and not 20


// var myVar = ['spooky', 'ghost', 'tales'];
// var zalgo = 'X_X'

// myVar.forEach(function(arrayItem){
// 	console.log(`${zalgo} ` + arrayItem);
// })


// //example 1
// function getUser(id, callback){
//    var user = {
// 	    id: id,
// 	    name: 'Vikram'
//  	};
//  	callback(user);
// };

// getUser(31, function(userObject){
// 	console.log(userObject)
// 	console.log('***')
// });


// //example 1 (with arrow functions)
// var getUser = (id, callback) => {
//   var user = {
//     id: id,
//     name: 'Vikram'
//   };
//   callback(user);
// };

// getUser(31, (userObject) => {
//   console.log(userObject);
// });

// //example 2
// function getUser(id, callback){
//    var user = {
// 	    id: id,
// 	    name: 'Vikram'
//  	};
 	
//  	setTimeout(function(){
//  		callback(user);
//  	}, 3000);
// };

// getUser(31, function(userObject){
// 	console.log(userObject)
// });

// //example 2 (with arrow functions)
// var getUser = (id, callback) => {
//   var user = {
//     id: id,
//     name: 'Vikram'
//   };

//   setTimeout(() => {
//     callback(user);
//   }, 3000);
// };

// getUser(31, (userObject) => {
//   console.log(userObject);
// });

// function getUser(id, callback){
//    var user = {
// 	    id: id,
// 	    name: 'Chris'
//  	};

//  	var userName = user.name;

 	
//  	function modifyName(name){
//  		name = name + 'sssssssss'
//  		callback(name);
//  	}

//  	modifyName(userName)
// };

// getUser(31, function(user){
// 	console.log(user);
// })

//Chrissssssssss



//callback - named function
// function myFunction(a, b){
// 	return a + ' ' + b;
// }


// //higher order 
// function printMessage(phrase1, phrase2, callback){
// 	return callback(phrase1, phrase2);
// }

// //call
// printMessage('hi', 'piglet', myFunction);

//-------------------------------------


//higher order
// function printMessage(phrase1, phrase2, callback){
// 	return callback(phrase1, phrase2);
// }

// //call with inline anonymous function
// //indicating a callback

// printMessage('Iam', 'Sam', function(a, b){
// 	var c = a + b;
// 	return c.length;
// })

//here we are calling printFunction passing through
//three parameters:
//phrase1 parameter - containing a string
//phrase2 parameter - containing a string
//callback parameter - containing a function definition


// function calculate(num1, num2, callback){
	
// 	setTimeout(function(){
// 		callback(num1, num2);
// 	}, 1500);

// }

// calculate(5, 5, function(a, b){
// 	return a + b;
// })


// function higherOrder(houseNumber, street, error, callback){
// 	if(error){
// 		callback('There was an error')
// 	} else {
// 		callback(undefined, {
// 			houseNum: houseNumber,
// 			street: street,
// 		});
// 	}
// }

// higherOrder('1855', 'Rolling Hills', false, function(errMessage, result){
// 	if(errMessage){
// 		console.log(errMessage);
// 	} else {
// 		console.log(result.houseNum + ' ' + result.street);
// 	}
// });

//since the callback is containing a function definition
//the function definition can have many parameters, in this case
//two parameters - errorMessage and result


// Not Working 
// callback(num1, num2);
// That doesn't return anything, since you're 
// calling an async method you need to set up a call back.

// function calculate(num1, num2, callback){
//     setTimeout(function(){
//         return callback(num1, num2);
//     }, 1500);
// }

// calculate(5, 5, function(a, b) {
//    return a + b;
// })


// //Variant 1
// function calculate(num1, num2, operation,final){
//     setTimeout(function(){
//         var result = operation(num1, num2);
//         final(result);
//     }, 1500);
// }

// calculate(5, 5, function(a, b) {
//    return a + b;
// },function(result){
//   console.log(result);
// })


// //Variant 2
// function calculate(num1, num2, operation,final){
//     setTimeout(function(){
//         var result = operation(num1, num2);
//         final(result);
//    }, 1500);
// }

// function add(a,b){
//    return a + b;
// }

// function displayResult(result){
//  console.log(result);
// }

// calculate(5, 5, add, displayResult);

// function getUser(id, callback){
//     var user = {
//         id: id,
//         name: 'Chris'
//     }

//     callback(user);
// }

// getUser(12345, function(userObject){

//     setTimeout(function(){
//         console.log(userObject.id);
//         console.log(userObject.name);
//     }, 1500)

// });


// function calculate(num1, num2, operation, final){
// 	setTimeout(function(){
// 		var result = operation(num1, num2);
// 		final(result + ' ham');
// 	}, 1500);
// }

// calculate(5, 5, function(a, b){
// 	return a + b;
// }, function(result){
// 	console.log(result)
// })

//10 ham

// var dog = 'spot'

// console.log(`hello there ${dog}`)


// if (navigator.geolocation) {
//   console.log('Geolocation is supported!');
// }
// else {
//   console.log('Geolocation is not supported for this Browser/OS.');
// }

// window.onload = function() {
//   var startPos;
  
//   var geoSuccess = function(position) {
//     startPos = position;
//     x = startPos.coords.latitude;
//     y = startPos.coords.longitude;
//     console.log(x, y)
//   };

//   navigator.geolocation.getCurrentPosition(geoSuccess);
// };


// function higherOrder(houseNum, street, error, callback){
// 	if(!error){
// 		callback(undefined, {
// 			houseNum: houseNum,
// 			street: street
// 		})
// 	} else {	
// 		callback('there was an error');
// 	}
// }


// higherOrder('123', 'Green', false, function(errMessage, house){
// 	if(errMessage){
// 		console.log(errMessage);
// 	} else {
// 		console.log(house.houseNum + ' ' + house.street);
// 	}
// })



