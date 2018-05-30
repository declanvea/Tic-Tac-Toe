import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Button from '@material-ui/core/Button';

const style = { 
    background: 'linear-gradient( 45deg, #0D47A1 30%, #A7FFEB 90% )',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
 };
 const xSquare = {
   background: '#0D47A1',
   border: '1px solid #A7FFEB',
   color: '#A7FFEB',
 };
 const oSquare = {
   background: '#A7FFEB',
   border: '1px solid #0D47A1',
   color: '#0D47A1',
 }

function Square( props ) { 
  return ( 
    <Button style={props.xIsNext ? xSquare : oSquare} className="square" onClick={ props.onClick }>
      { props.value }
    </Button>
   );
 }

class Board extends React.Component { 
  renderSquare( i ) { 
    return ( 
      <Square
        value={ this.props.squares[i] }
        onClick={ (  ) => this.props.onClick( i ) }
        xIsNext={this.props.xIsNext}
      />
     );
   }

  render(  ) { 
    return ( 
      <div>
        <div className="board-row">
          { this.renderSquare( 0 ) }
          { this.renderSquare( 1 ) }
          { this.renderSquare( 2 ) }
        </div>
        <div className="board-row">
          { this.renderSquare( 3 ) }
          { this.renderSquare( 4 ) }
          { this.renderSquare( 5 ) }
        </div>
        <div className="board-row">
          { this.renderSquare( 6 ) }
          { this.renderSquare( 7 ) }
          { this.renderSquare( 8 ) }
        </div>
      </div>
     );
   }
 }

class Game extends React.Component { 
 state = { 
      history: [{ 
        squares: Array( 9 ).fill( null )
       }],
      xIsNext: true,
      stepNumber: 0,
      open: false,
     };

  handleClick( i ) { 
    const history = this.state.history.slice( 0, this.state.stepNumber + 1 );
    const current = history[history.length - 1];
    const squares = current.squares.slice(  );
    if ( calculateWinner( squares ) || squares[i] ) { 
      return;
     }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState( { 
      history: history.concat( [{ 
        squares: squares
       }] ),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
     } );
   }

  jumpTo( step ) { 
      this.setState( { 
          stepNumber: step,
          xIsNext: ( step % 2 ) === 0,
       } );
   }

  resetGame = (  ) => { 
      this.setState( { 
          history: [{ 
              squares: Array( 9 ).fill( null )
           }],
          stepNumber: 0,
          xIsNext: true,
       } );
   }
  
  render(  ) { 
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner( current.squares );

    const moves = history.map( ( step, move ) => { 
        const desc = move ?
        'Show move #' + move :
        'Show start of game';
        return ( 
            <li key={ move }>
                <Button style={ style } onClick={ (  ) => this.jumpTo( move ) }>{ desc }</Button>
            </li>
         );
     } );

    let status;
    if ( winner ) { 
      status = 'Winner: ' + winner;
     } else { 
      status = 'Next player: ' + ( this.state.xIsNext ? 'X' : 'O' );
     }

    return ( 
      <div className="game">
        <div className="game-board">
          <Board
            squares={ current.squares }
            onClick={ ( i ) => this.handleClick( i ) }
            xIsNext={this.state.xIsNext}
          />
        </div>
        <div className="game-info">
          <Button onClick={ this.resetGame }>Restart Game</Button>
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
     );
   }
 }

function calculateWinner( squares ) { 
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for ( let i = 0; i < lines.length; i++ ) { 
        const [a, b, c] = lines[i];
        if ( squares[a] && squares[a] === squares[b] && squares[a] === squares[c] ) { 
            return squares[a];
         }
     }
    return null;
 }

ReactDOM.render(  <Game />, document.getElementById( 'root' )  );
