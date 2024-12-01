import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";

import { ProjectCreate } from "../../../../../../domain/models/Project";

type Props = {
  todos: ProjectCreate["todos"];
  onAddTodo: () => void;
  onDeleteTodo: (idx: number) => void;
  onChangeName: (idx: number, name: string) => void;
  onChangeDue: (idx: number, due: Date | undefined | null) => void;
  onNext: () => void;
  onBack: () => void;
};

export const StepTodos = ({
  todos,
  onAddTodo,
  onDeleteTodo,
  onChangeName,
  onChangeDue,
  onNext,
  onBack,
}: Props) => {
  return (
    <div className="flex flex-column gap-3">
      <div className="flex align-items-center gap-3">
        <label className="font-bold d-block">Todos</label>
        <Button
          label="Add"
          severity="secondary"
          size="small"
          onClick={onAddTodo}
        />
      </div>

      {todos.map((todo, idx) => (
        <div key={idx} className="flex gap-2">
          <InputText
            className="flex-1"
            value={todo.name}
            onChange={(e) => onChangeName(idx, e.target.value)}
          />
          <Calendar
            value={todo.due}
            onChange={(e) => onChangeDue(idx, e.target.value)}
            showIcon
          />
          <Button
            label="Delete"
            severity="danger"
            onClick={() => onDeleteTodo(idx)}
          />
        </div>
      ))}
      <div className="flex justify-content-between">
        <Button label="Back" severity="secondary" onClick={onBack} />
        <Button label="Next" onClick={onNext} />
      </div>
    </div>
  );
};
