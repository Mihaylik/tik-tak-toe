import {
  CellType,
  CordsType,
  GameResult,
  GameType,
  PlayerValueType,
} from "../components/Field";

const checkRow = (
  cells: CellType[],
  playedCellCords: CordsType,
  playedBy: PlayerValueType
): boolean => {
  const row = cells.filter((value) => value.cords.y === playedCellCords.y);
  debugger;

  return row.every((cell) => cell.value === playedBy);
};

const checkColumn = (
  cells: CellType[],
  playedCellCords: CordsType,
  playedBy: PlayerValueType
): boolean => {
  const column = cells.filter((value) => value.cords.x === playedCellCords.x);

  return column.every((cell) => cell.value === playedBy);
};

const checkDiagonals = (
  cells: CellType[],
  playedCellCords: CordsType,
  playedBy: PlayerValueType,
  checkBoth: boolean = false
): boolean => {
  const firstDiagonal = cells.filter(
    (value) => value.cords.x === value.cords.y
  );
  if (
    firstDiagonal.find(
      (value) =>
        value.cords.x === playedCellCords.x &&
        value.cords.y === playedCellCords.y
    ) &&
    !checkBoth
  ) {
    return firstDiagonal.every((cell) => cell.value === playedBy);
  }
  const secondDiagonal = cells.filter(
    (value) => value.cords.x + value.cords.y === 2
  );
  if (
    secondDiagonal.find(
      (value) =>
        value.cords.x === playedCellCords.x &&
        value.cords.y === playedCellCords.y
    ) &&
    !checkBoth
  ) {
    return secondDiagonal.every((cell) => cell.value === playedBy);
  }
  return (
    firstDiagonal.every((cell) => cell.value === playedBy) ||
    secondDiagonal.every((cell) => cell.value === playedBy)
  );
};

export const middleWinCheck = (
  cells: CellType[],
  playedCellCords: CordsType,
  playedBy: PlayerValueType
) => {
  return (
    checkRow(cells, playedCellCords, playedBy) ||
    checkColumn(cells, playedCellCords, playedBy) ||
    checkDiagonals(cells, playedCellCords, playedBy, true)
  );
};

export const cornerWinCheck = (
  cells: CellType[],
  playedCellCords: CordsType,
  playedBy: PlayerValueType
): boolean => {
  return (
    checkRow(cells, playedCellCords, playedBy) ||
    checkColumn(cells, playedCellCords, playedBy) ||
    checkDiagonals(cells, playedCellCords, playedBy)
  );
};

export const cornerMiddleWinCheck = (
  cells: CellType[],
  playedCellCords: CordsType,
  playedBy: PlayerValueType
): boolean => {
  return (
    checkRow(cells, playedCellCords, playedBy) ||
    checkColumn(cells, playedCellCords, playedBy)
  );
};

export const resultCheck = (
  cells: CellType[],
  playedCellCords: CordsType,
  playedBy: PlayerValueType,
  isFullField: boolean,
  place: string
) => {
  let isWin = false;

  switch (place) {
    case "corner":
      {
        isWin = cornerWinCheck(cells, playedCellCords, playedBy);
      }
      break;
    case "cornerMiddle":
      {
        isWin = cornerMiddleWinCheck(cells, playedCellCords, playedBy);
      }
      break;
    case "middle":
      {
        isWin = middleWinCheck(cells, playedCellCords, playedBy);
      }
      break;
  }

  if (isWin) {
    return GameResult[playedBy];
  } else {
    return isFullField ? GameResult.Draw : GameResult.NotEnded;
  }
};

export const checkGameResult = (
  newGameState: GameType,
  playedBy: PlayerValueType,
  playedCell: CellType
): GameResult => {
  const cells = newGameState.cells;
  const isFullField = !cells.some((value) => value.value === "");

  if (playedCell.cords.x % 2 === 0 && playedCell.cords.y % 2 === 0) {
    return resultCheck(
      cells,
      playedCell.cords,
      playedBy,
      isFullField,
      "corner"
    );
  } else if (
    (playedCell.cords.x % 2 === 0 && playedCell.cords.y % 2 !== 0) ||
    (playedCell.cords.x % 2 !== 0 && playedCell.cords.y % 2 === 0)
  ) {
    return resultCheck(
      cells,
      playedCell.cords,
      playedBy,
      isFullField,
      "cornerMiddle"
    );
  } else {
    return resultCheck(
      cells,
      playedCell.cords,
      playedBy,
      isFullField,
      "middle"
    );
  }
};
