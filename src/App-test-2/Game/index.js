import React from 'react';
import './index.css'

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winnerName: squares[a],
        winIndex: [a, b, c]
      }
    }
  }
  return null;
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        // Each child in a list should have a unique "key" 
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        {/* 使用两个循环来渲染出棋盘的格子，而不是在代码里写死（hardcode）。 */}
        {
          Array(3).fill(null).map((itemx, x) => (
            <div className="board-row" key={x}>
              {
                Array(3).fill(null).map((itemy, y) => (
                  this.renderSquare(x * 3 + y)
                ))
              }
            </div>
          ))
        }
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        { squares: Array(9).fill(null) }
      ],
      stepNumber: 0,
      xIsNext: true,
      sort: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([{
        squares: squares,
        // 坐标
        lastIndex: i
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  order() {
    this.setState({
      sort: !this.state.sort
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
    // 还原颜色
    for (let i = 0; i < 9; i++) {
      document.getElementsByClassName('square')[i].style = "background:  #fff;";
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const coordinate = step.lastIndex;
      const desc = move ?
        // 在游戏历史记录列表显示每一步棋的坐标，格式为 (列号, 行号)。
        'Go to move #' + move + '坐标为(行,列):' + '(' + (coordinate % 3 + 1) + ' , ' + (parseInt(coordinate / 3) + 1 + ')') :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}
            // 在历史记录列表中加粗显示当前选择的项目。
            className={move === this.state.stepNumber ? 'bold' : ''}>
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner:' + winner.winnerName;
      // 每当有人获胜时，高亮显示连成一线的 3 颗棋子
      for (let i of winner.winIndex) {
        document.getElementsByClassName('square')[i].style = "background: lightblue; color: #fff;";
      }
    } else {
      // 当无人获胜时，显示一个平局的消息。
      if (this.state.history.length > 9) {
        status = 'No player win! It ends in a draw!';
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          {/* 添加一个可以升序或降序显示历史记录的按钮。 */}
          <button onClick={() => this.order()}>
            {this.state.sort ? '倒序' : '正序'}
          </button>
          <ol>{this.state.sort ? moves : moves.reverse()}</ol>
        </div>
      </div>
    );
  }
}

export default Game;

// ========================================

