import React, { useState }  from 'react';

function Square({value, onclick}){
  return(
      <button className='square' onClick={onclick}>{value}</button>
  );
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// Design the BOARD  ///////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
function Board({svalue, squareval, setsquares}) {

  function handleclick(i){
    if(checkwinner(squareval) || squareval[i]){
      console.log(squareval[i])
      return;
    }

    const nextSquare= squareval.slice()                              //Using immutability.  Making the copy of the array squareval
    if(svalue) nextSquare[i]='X';
    else nextSquare[i]='O';
    setsquares(nextSquare);                                        // Change the old square to new square
  }

  let status;                                                   // See the status: Winner, Tie or Turn
  const winner = checkwinner(squareval);
  if(winner === "tie"){
    status = "Game is tie";
  }
  else if(winner){
    status = "Winner: "+winner;
  }
  else{
    if(svalue)
      status = "Turn: X";
    else status = "Turn: O";
  }

  return ( 
    <div>
      
      <div className='status'>{status}</div>
      <div className="board-row">  
      {/* Here make the function for onclick because we are calling the handleclick(i) and it will go in infinite loop while
      if we call the function without passing any arguments then this problem will not faced as it does not call the function
      it pass the function down as a prop */}
        <Square value={squareval[0]} onclick={()=>handleclick(0)}/>         
        <Square value={squareval[1]} onclick={()=>handleclick(1)}/>
        <Square value={squareval[2]} onclick={()=>handleclick(2)}/>
      </div>

      <div className="board-row">
        <Square value={squareval[3]} onclick={()=>handleclick(3)}/>
        <Square value={squareval[4]} onclick={()=>handleclick(4)}/>
        <Square value={squareval[5]} onclick={()=>handleclick(5)}/>
      </div>

      <div className="board-row">
        <Square value={squareval[6]} onclick={()=>handleclick(6)}/>
        <Square value={squareval[7]} onclick={()=>handleclick(7)}/>
        <Square value={squareval[8]} onclick={()=>handleclick(8)}/>
      </div>
    </div>
  );
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////   GAME    /////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function Game(){
  const [nextTurn, setNextTurn] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquare = history[currentMove];

  function handleplay(nextSquare){
    const thehistory = [...history.slice(0,currentMove+1), nextSquare];
    setHistory(thehistory);
    setCurrentMove(thehistory.length-1);
    setNextTurn(!nextTurn)
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
    setNextTurn(nextMove%2===0);
  }

  const moves = history.map((squares,move)=>{
    
    let description;
    if(move>0){
      description = 'Go to move #'+move;
    }
    else{
      description = 'Go to game start';
    }
    return(
      <li key={move}>
        <button onClick={()=>jumpTo(move)}>{description}</button>
      </li>
    );
  });


  return(
    <div className='game'>
      <div className='game-board'>
        <Board svalue={nextTurn} squareval={currentSquare} setsquares={handleplay} />
      </div>  
      <div className='game-info'>
        {/* Showing the previous moves */}
        <ol>{moves}</ol>
      </div>
    </div>
  );
}



function checkwinner(squares){
  // Taking all the condition of winner
  const lines=[                                       
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  for(let i=0; i<lines.length; i++){
    const [a,b,c] = lines[i];
    
    //All the conditions are checked here 
    if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){         
      return squares[a];
    }
  }

  //Checking if any block is blank or not. Checking the tie condition 
  for(let i=0; i<9; i++){
    if(!squares[i]) return null;                          
  }
  return "tie";
}
