let stats = {
	O : 0,
	X : 0,
	D : 0
}

const changeMove = move => {
	if (move === "O" ) return "X"
	return "O"	
}

const newBoard = board =>{
	for (let i = 0; i <= 8; i++) board.push({val:""})
	return board
}

let currentMove = "O"
let difficulty = "Easy"
let board = newBoard([])
let permitted = true

const clicked = cellNumber => {
	if(permitted  && !document.querySelectorAll(".cell")[cellNumber].innerText){
 		document.querySelectorAll(".cell")[cellNumber].innerText = currentMove
 		board[cellNumber].val = currentMove
		currentMove = changeMove(currentMove)
		let winner = checkWin(board)
 		if (!winner) {   
			if (checkComplete()) { //for checking draw
 		 		permitted = false
 		 		stats.D++ 
 				document.querySelector(".statsBody .D").innerText = stats.D
 		 		document.querySelector(".result").innerText = "Draw!"
				document.querySelector(".new").style.display = "block"
			}	
			else if (currentMove == "X") nextMove()
 	    }
 		else{
 		 	permitted = false
 		 	stats[winner[0]]++
 		 	document.querySelector(`.statsBody .${winner[0]}`).innerText = stats[winner[0]]
 		 	document.querySelectorAll(".td").forEach((item, i)=>{
 		 		item.style["margin-right"] = "0px", item.style["margin-bottom"] = "0px"		
 		 		document.querySelector(".new").style.display = "block"
 		 		document.querySelector(".result").innerHTML = `<span class="res">${winner[0]}</span> Winner!`  
 		 		if ((i !=  winner[1]) && (i != winner[2]) && (i != winner[3])) item.innerHTML = '<span class="cell"></span>'
 		 	})
		}
		 
 	}
	
}

function checkWin() {
	// three horizontals
 	if (board[0].val !="" && (board[0].val == board[1].val ) && (board[0].val == board[2].val))   return board[0].val+"012"
 	if (board[3].val !="" && (board[3].val == board[4].val ) && (board[3].val == board[5].val))   return board[3].val+"345"
 	if (board[6].val !="" && (board[6].val == board[7].val ) && (board[6].val == board[8].val))   return board[6].val+"678"
    // three verticals
  	if (board[0].val !="" && (board[0].val == board[3].val ) && (board[0].val == board[6].val))   return board[0].val+"036"
  	if (board[1].val !="" && (board[1].val == board[4].val ) && (board[1].val == board[7].val))   return board[1].val+"147"
  	if (board[2].val !="" && (board[2].val == board[5].val ) && (board[2].val == board[8].val))   return board[2].val+"258"
    // two diagonals
	if (board[0].val !="" && (board[0].val == board[4].val ) && (board[0].val == board[8].val))   return board[0].val+"048"
	if (board[6].val !="" && (board[6].val == board[4].val ) && (board[6].val == board[2].val))   return board[6].val+"642"
 	return ""
 }

function checkComplete() { 
	for (var i = 0; i < board.length; i++) if(!board[i].val) return false
	return true 
}

function newGame() {
 	permitted = true
 	board = newBoard()
 	currentMove = "O"
	difficulty = document.querySelector("select").value
	 document.querySelectorAll(".td").forEach(function(item, i) {
 		 		item.style["margin-right"] = "5px", item.style["margin-bottom"] = "5px"
 		 		document.querySelector(".new").style.display = "none"
 		 		document.querySelector(".result").innerHTML = ``  
 		 		item.innerHTML = '<span class="cell"></span>'
 		 	})
 }

function nextMove() {
	if (difficulty == "Easy")  clicked(getRandomSpot())
	else  
	if (difficulty == "Medium") {
		let arr = []
		for (let i = 0; i < board.length; i++) {
			if(!board[i].val){
				board[i].val = "X"
				let moveVal = minimax(board,false)
				board[i].val = ""
				if (moveVal > -1) arr.push(i)
				console.log(arr)
			}
		}
		clicked(arr[Math.floor(Math.random()*arr.length)])
	}
	else{
		let bestVal = -1000
		let bestMove = -1
		for (let i = 0; i < board.length; i++) {
			if(!board[i].val){
				board[i].val = "X"
				let moveVal = minimax(board,false)
				board[i].val = ""
				if(moveVal>bestVal){
					bestMove = i
					bestVal = moveVal
				}
			}
		}
		clicked(bestMove)
		}
 }

 function getRandomSpot() {
	 let num = Math.floor(Math.random()*9)
	 while (board[num].val) {
		num = Math.floor(Math.random()*9)
	 }
	 console.log(num)
	 return num
 } 
 function minimax(board,isMax) {
	 let score 
	 if (checkWin()[0] == "X") score = 1
	 if (checkWin()[0] == "O") score = -1
	 if(score == 1) return 1
	 if(score == -1) return -1
	 if(checkComplete()) return 0
	 if(isMax){
		let best = -1000
		for (let i = 0; i < board.length; i++) {
			if (!board[i].val) {
				board[i].val = "X"
				best = Math.max(best,minimax(board,!isMax))
				board[i].val = ""
			}
			
		}
	
		return best
	 }
	 else{
		 let best = 1000
		 for (let i = 0; i < board.length; i++) {
			if (!board[i].val) {
				board[i].val = "O"
				best = Math.min(best,minimax(board,!isMax))
				board[i].val = ""
			}
			
		}
		return best
	 }
	 
 }