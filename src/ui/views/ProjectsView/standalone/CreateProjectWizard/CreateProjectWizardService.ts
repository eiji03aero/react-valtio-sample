import { proxy } from "valtio";

import { ToastService } from "../../../../../services/ToastService";
import { ProjectService } from "../../../../../services/ProjectService";
import { ProjectCreate } from "../../../../../domain/models/Project";

const Steps = ["basic_info", "todos", "confirm"] as const;
type Step = (typeof Steps)[number];

export type State = {
  step: Step;
  form: ProjectCreate;
};

export class CreateProjectWizardService {
  private state: State;
  private toastSvc: ToastService;
  private projectSvc: ProjectService;
  private onClose: () => void;

  constructor(params: {
    toastSvc: ToastService;
    projectSvc: ProjectService;
    onClose: () => void;
  }) {
    this.state = proxy<State>({
      step: "basic_info",
      form: {
        name: "",
        description: "",
        due: new Date(),
        todos: [{ name: "", due: new Date() }],
      },
    });
    this.toastSvc = params.toastSvc;
    this.projectSvc = params.projectSvc;
    this.onClose = params.onClose;
  }

  getState() {
    return this.state;
  }

  getActiveStepIndex() {
    return Steps.findIndex((s) => s === this.state.step);
  }

  setName(name: string) {
    this.state.form.name = name;
  }

  setDescription(desc: string) {
    this.state.form.description = desc;
  }

  setDue(due: Date | undefined | null) {
    this.state.form.due = due ?? new Date();
  }

  async onNextFromBasicInfo() {
    const err = await this.projectSvc.validateBasicInfo({
      name: this.state.form.name,
      description: this.state.form.description,
      due: this.state.form.due,
    });
    if (err) {
      this.toastSvc.show({ severity: "error", summary: err });
      return;
    }

    this.state.step = "todos";
  }

  addTodo() {
    this.state.form.todos = this.state.form.todos.concat({
      name: "",
      due: new Date(),
    });
  }

  deleteTodo(idx: number) {
    this.state.form.todos = this.state.form.todos.filter((_, i) => i !== idx);
  }

  setTodoName(idx: number, name: string) {
    this.state.form.todos = this.state.form.todos.map((todo, i) => {
      if (i === idx) {
        return { ...todo, name };
      }
      return todo;
    });
  }

  setTodoDue(idx: number, due: Date | undefined | null) {
    this.state.form.todos = this.state.form.todos.map((todo, i) => {
      if (i === idx) {
        return { ...todo, due: due ?? new Date() };
      }
      return todo;
    });
  }

  async onNextFromTodos() {
    const err = await this.projectSvc.validateTodos({
      due: this.state.form.due,
      todos: this.state.form.todos,
    });
    if (err) {
      this.toastSvc.show({ severity: "error", summary: err });
      return;
    }

    this.state.step = "confirm";
  }

  onBackFromTodos() {
    this.state.step = "basic_info";
  }

  onBackFromConfirm() {
    this.state.step = "todos";
  }

  async save() {
    await this.projectSvc.create(this.state.form);
    this.onClose();
  }
}
