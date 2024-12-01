import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Calendar } from "primereact/calendar";
import { useQuery } from "@tanstack/react-query";
import { useSnapshot } from "valtio";

import { useRegistry } from "../../../contexts/RegistryContext";
import { Todo } from "../../../domain/models/Todo";
import * as todoApis from "../../../apis/todo";
import { DetailDrawer } from "./components/DetailDrawer";

export const TodosView = () => {
  const registry = useRegistry();
  const viewSvc = registry.get("todosViewSvc");

  const state = useSnapshot(viewSvc.getState());
  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: () => todoApis.find(),
    initialData: [],
  });

  return (
    <>
      <h1 className="p-component text-2xl">Todos</h1>
      <div className="flex mb-3 gap-3">
        <div className="p-inputgroup flex-auto">
          <InputText
            placeholder="Todo name"
            value={state.createForm.input}
            onChange={(e) => viewSvc.changeInput(e.target.value)}
          />
        </div>

        <div>
          <Calendar
            value={state.createForm.due}
            onChange={(e) => viewSvc.setDue(e.value)}
            showIcon
            minDate={new Date()}
          />
        </div>

        <div>
          <Button label="Create" onClick={() => viewSvc.createTodo()} />
        </div>
      </div>
      <DataTable value={todos}>
        <Column field="id" header="ID" className="w-5rem"></Column>
        <Column
          field="status"
          header="Status"
          body={(todo: Todo) => (
            <Checkbox
              checked={todo.status === "done"}
              onChange={() => viewSvc.toggleStatus(todo.id)}
            />
          )}
          className="w-5rem"
        ></Column>
        <Column field="name" header="Name" className="w-full"></Column>
        <Column
          header="Edit"
          body={(todo) => (
            <Button
              size="small"
              severity="secondary"
              label="Edit"
              onClick={() => viewSvc.openDetailDrawer(todo.id)}
            />
          )}
        ></Column>
      </DataTable>

      {state.isDetailDrawerOpen && (
        <DetailDrawer onHide={() => viewSvc.closeDetailDrawer()} />
      )}
    </>
  );
};
