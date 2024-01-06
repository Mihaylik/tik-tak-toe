import { useEffect, useRef, useState } from "react";
import Cell from "./Cell";
import StartButton from "./ResetButton";
import { checkGameResult } from "../utils/algorithms";

export enum GameResult {
  X = "X",
  O = "O",
  Draw = "Draw",
  NotEnded = "",
}

export type PlayerValueType = "X" | "O";

export type CellValueType = PlayerValueType | "";

export type CordsType = {
  x: number;
  y: number;
};

export type CellType = {
  value: CellValueType;
  cords: CordsType;
};

export type GameType = {
  cells: CellType[];
  playerPlaying: PlayerValueType;
  isGameProcess: boolean;
  gameResult: string | null;
};

const Field = () => {
  const initialCells: CellType[] = [...Array(3)]
    .map((_, y) => {
      return [...Array(3)].map(
        (_, x): CellType => ({
          value: "",
          cords: {
            x,
            y,
          },
        })
      );
    })
    .flat();

  const initialGameState: GameType = {
    cells: initialCells,
    playerPlaying: "X",
    isGameProcess: false,
    gameResult: null,
  };

  const [gameState, setGameState] = useState(initialGameState);

  const onCellClick = (currentCell: CellType, cellIndex: number) => {
    if (currentCell.value === "" && gameState.isGameProcess) {
      const newCells = structuredClone(gameState.cells);
      newCells[cellIndex].value = gameState.playerPlaying;

      const newPlayerPlaying = gameState.playerPlaying === "X" ? "O" : "X";

      const newGameState: GameType = {
        ...gameState,
        cells: newCells,
        playerPlaying: newPlayerPlaying,
        isGameProcess: !gameState.isGameProcess
          ? true
          : gameState.isGameProcess,
      };
      const result = checkGameResult(
        newGameState,
        gameState.playerPlaying,
        currentCell
      );

      if (
        result === GameResult.X ||
        result === GameResult.O ||
        result === GameResult.Draw
      ) {
        setGameState({
          ...newGameState,
          isGameProcess: false,
          gameResult: result === GameResult.Draw ? "Draw" : `${result} win`,
        });
      } else {
        setGameState(newGameState);
      }
    }
  };

  return (
    <div className="p-1">
      <div className="grid grid-cols-3 grid-rows-[repeat(3,_minmax(50px,_1fr))] pb-2 w-[100%]">
        {gameState.cells.map((value, index) => {
          return (
            <Cell
              key={index}
              cellIndex={index}
              cell={value}
              onClick={onCellClick}
            />
          );
        })}
      </div>
      {gameState.isGameProcess && (
        <div>{`Playing: ${gameState.playerPlaying}`}</div>
      )}
      {gameState.gameResult && <div>{gameState.gameResult}</div>}
      <div className="flex">
        <StartButton
          disabled={gameState.isGameProcess}
          onClick={() =>
            setGameState({ ...initialGameState, isGameProcess: true })
          }
        />
      </div>
    </div>
  );
};

export default Field;
