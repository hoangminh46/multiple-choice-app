import { StylesButtonQuestion } from "@/components/ButtonQuestion/styles/index";

export default function ButtonQuestion({
  num,
  status,
  selectedQuestion,
  onClick,
}: {
  num: number;
  status?: boolean;
  selectedQuestion?: boolean;
  onClick: (index: number) => void;
}) {
  function handleClick() {
    onClick(num);
  }
  return (
    <StylesButtonQuestion>
      <div
        id={selectedQuestion ? `selected-btn` : ``}
        className={status ? `btn-question current-btn` : `btn-question `}
        onClick={handleClick}
      >
        {num + 1}
      </div>
    </StylesButtonQuestion>
  );
}
