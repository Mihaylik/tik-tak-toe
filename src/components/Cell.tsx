import { FC } from "react";
import { CellType } from "./Field";

type Props = {
  cell: CellType;
  cellIndex: number;
  onClick: (currentCell: CellType, cellIndex: number) => void;
};

const Cell: FC<Props> = ({ cell, cellIndex, onClick }) => {
  return (
    <div
      className="border grid place-items-center"
      onClick={() => onClick(cell, cellIndex)}
    >{`(${cell.cords.x}; ${cell.cords.y}) ${cell.value}`}</div>
  );
};

export default Cell;
