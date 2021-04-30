import { useCallback, useEffect, useMemo, useState } from "react";
import BoardStatebar from "../BoardStatebar";
import Avatar from "../Avatar";
import { CAMP, getNextCamp } from '../../config';
import Grid from "../Grid";

import './Board.css';

function getRandomPos(grids) {
  const idleGrids = [];
  grids.forEach((camp, index) => {
    if (camp === CAMP.NONE) {
      idleGrids.push(index);
    }
  });

  if (idleGrids.length === 0) {
    return -1;
  }

  return idleGrids[Math.floor(Math.random() * idleGrids.length)];
}

function judgeVictoryInPoint(grids, startPoint) {
  // 横竖撇捺
  const rules = [1, 14, 15, 16];

  for (let rule of rules) {
    const winnerPath = judgeDirectionStateInPoint(grids, startPoint, rule);
    if (winnerPath.length >= 5) {
      return winnerPath;
    }
  }

  return null;
}

function judgeDirectionStateInPoint(grids, startPoint, step) {
  const points = [startPoint];
  const startPointCamp = grids[startPoint];

  for (let index = startPoint - step; index >= 0; index -= step) {
    if (grids[index] !== startPointCamp) {
      break;
    }
    points.push(index);
  }

  for (let index = startPoint + step; index < grids.length; index += step) {
    if (grids[index] !== startPointCamp) {
      break;
    }
    points.push(index);
  }

  return points;
}

const rowSize = 15;
function Board(props) {
  const { userCamp = CAMP.NONE } = props;
  const robotCamp = userCamp === CAMP.BLACK ? CAMP.WHITE : CAMP.BLACK;

  const [chessboard, setChessboard] = useState({
    grids: new Array(rowSize * rowSize).fill(CAMP.NONE),
    nowCamp: CAMP.WHITE,
  });

  const [winPath, setWinPath] = useState([]);

  const flagGrids = useMemo(() => {
    const gs = new Array(rowSize * rowSize).fill(false);
    winPath.forEach(index => gs[index] = true);
    return gs;
  }, [winPath]);
  
  const putPiece = useCallback((index) => {
    const { grids, nowCamp } = chessboard;

    if (index < 0 ||
      index >= rowSize * rowSize) {
      return;
    }


    grids[index] = nowCamp;
    const winPath = judgeVictoryInPoint(grids, index);
    if (Array.isArray(winPath) && winPath.length >= 5) {
      handleWin(winPath);
      setChessboard({ ...chessboard, grids: [...grids], nowCamp: CAMP.NONE });
    } else {
      const nextCamp = getNextCamp(nowCamp);
      setChessboard({ ...chessboard, grids: [...grids], nowCamp: nextCamp });
    }
  }, [chessboard]);
  
  const robotWork = useCallback(() => {
    const { grids, nowCamp } = chessboard;
    const index = getRandomPos(grids);
    grids[index] = nowCamp;
    putPiece(index, nowCamp);
  }, [chessboard, putPiece]);

  useEffect(() => {
    const { nowCamp } = chessboard;
    if (nowCamp !== userCamp && nowCamp !== CAMP.NONE) {
      robotWork();
    }
  }, [chessboard, userCamp, robotWork]);

  const handleWin = (winRule) => {
    console.log("winner");
    setWinPath(winRule);
  }

  const onClick = (index) => {
    const { nowCamp } = chessboard;
    if (nowCamp !== userCamp) {
      return;
    }

    putPiece(index);
  }

  return (
    <div className="board">
      <div className="players-state">
        <Avatar playerType="robot" camp={robotCamp} doCamp={chessboard.nowCamp} />
        <Avatar playerType="john" flexReverse={true} camp={userCamp} doCamp={chessboard.nowCamp} />
      </div>
      <div className="board-wrapper">
        <BoardStatebar size={rowSize} />
        <div className="row">
          <BoardStatebar direction="column" size={rowSize} />
          {new Array(rowSize).fill(0).map((_, col) => (
            <div className="column" key={col}>
              {new Array(rowSize).fill(0).map((_, row) => <Grid key={row * rowSize + col} index={row * rowSize + col} state={chessboard.grids[row * rowSize + col]} flag={flagGrids[row * rowSize + col]} onClick={onClick} />)}
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}

export default Board;
