import React, { useState }  from 'react';

function Square({value, onclick}){
  return(
      <button className='square' onClick={onclick}>{value}</button>
  );
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// BOARD  //////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
function Board() {
  const [svalue, setsvalue] = useState(true)
  const [squareval, setsquares] = useState(Array(9).fill(null));

  function handleclick(i){
    if(squareval[i] || checkwinner(squareval)){
      console.log(squareval[i])
      return;
    }

    const nextSquare= squareval.slice()                              //Using immutability.  Making the copy of the array squareval
    if(svalue) nextSquare[i]='X'
    else nextSquare[i]='O'
    setsquares(nextSquare)                                        // Change the old square to new square
    
    setsvalue(!svalue)
  }

  let status;                                                   // See the status: Winner, Tie or Turn
  let winner = checkwinner(squareval);
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
        return (squares[a]);
      }
    }

    //Checking if any block is blank or not. Checking the tie condition 
    for(let i=0; i<9; i++){
      if(!squares[i]) return null;                          
    }
    return "tie";
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
  return(
    <div className='game'>
      <div className='game-board'>
        <Board/>
      </div>
      <div className='game-info'>
        <ol>dd</ol>
      </div>
    </div>
  );
}
