import * as React from "react";
import { useSnapshot } from "valtio";
import { Dialog } from "primereact/dialog";
import { Steps } from "primereact/steps";

import { useRegistry } from "../../../../../contexts/RegistryContext";
import { CreateProjectWizardService } from "./CreateProjectWizardService";
import { StepBasicInfo } from "./components/StepBasicInfo";
import { StepTodos } from "./components/StepTodos";
import { StepConfirm } from "./components/StepConfirm";

type Props = {
  onClose: () => void;
};

export const CreateProjectWizard = ({ onClose }: Props) => {
  const registry = useRegistry();
  const toastSvc = registry.get("toastSvc");
  const projectSvc = registry.get("projectSvc");
  const svc = React.useRef(
    new CreateProjectWizardService({ toastSvc, projectSvc, onClose }),
  ).current;
  const state = useSnapshot(svc.getState());
  const form = state.form;

  return (
    <Dialog
      visible
      header="Create project wizard"
      style={{ width: "50rem" }}
      onHide={onClose}
    >
      <Steps
        model={[
          { label: "Basic info" },
          { label: "Todos" },
          { label: "Confirm" },
        ]}
        activeIndex={svc.getActiveStepIndex()}
      />
      <div className="mb-3" />
      {state.step === "basic_info" && (
        <StepBasicInfo
          name={form.name}
          description={form.description}
          due={form.due}
          onChangeName={(name) => svc.setName(name)}
          onChangeDescription={(desc) => svc.setDescription(desc)}
          onChangeDue={(due) => svc.setDue(due)}
          onNext={() => svc.onNextFromBasicInfo()}
        />
      )}
      {state.step === "todos" && (
        <StepTodos
          todos={form.todos}
          onChangeName={(idx, name) => svc.setTodoName(idx, name)}
          onChangeDue={(idx, due) => svc.setTodoDue(idx, due)}
          onAddTodo={() => svc.addTodo()}
          onDeleteTodo={(idx) => svc.deleteTodo(idx)}
          onNext={() => svc.onNextFromTodos()}
          onBack={() => svc.onBackFromTodos()}
        />
      )}
      {state.step === "confirm" && (
        <StepConfirm
          form={state.form}
          onSave={() => svc.save()}
          onBack={() => svc.onBackFromTodos()}
        />
      )}
    </Dialog>
  );
};
