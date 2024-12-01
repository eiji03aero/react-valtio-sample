import * as datefns from "date-fns";
import { Button } from "primereact/button";

import { State } from "../CreateProjectWizardService";

type Props = {
  form: State["form"];
  onSave: () => void;
  onBack: () => void;
};

export const StepConfirm = ({ form, onSave, onBack }: Props) => {
  return (
    <div className="flex flex-column gap-4">
      <div className="flex flex-column gap-2">
        <label className="font-bold d-block">Name</label>
        <div className="font-normal">{form.name}</div>
      </div>

      <div className="flex flex-column gap-2">
        <label className="font-bold d-block">Description</label>
        <div className="font-normal">{form.description}</div>
      </div>

      <div className="flex flex-column gap-2">
        <label className="font-bold d-block">Due</label>
        <div className="font-normal">{datefns.formatISO(form.due)}</div>
      </div>

      <div className="flex flex-column gap-2">
        <label className="font-bold d-block">Todos</label>
        <ul className="font-normal">
          {form.todos.map((todo, i) => {
            return (
              <li key={i}>
                {datefns.formatISO(todo.due)}
                {" - "}
                {todo.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex justify-content-between">
        <Button label="Back" severity="secondary" onClick={onBack} />
        <Button label="Save" onClick={onSave} />
      </div>
    </div>
  );
};
