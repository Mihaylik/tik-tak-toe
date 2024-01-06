import { FC } from "react";

type Props = {
  disabled: boolean;
  onClick: () => void;
};

const StartButton: FC<Props> = ({ disabled = false, onClick }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`text-white bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 me-2 mb-2 dark:bg-blue-600 ${
        disabled ? "" : "hover:bg-blue-800 "
      }focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50`}
      onClick={onClick}
    >
      Start
    </button>
  );
};

export default StartButton;
