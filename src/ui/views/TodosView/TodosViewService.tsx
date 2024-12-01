import { proxy } from "valtio";

import { TodoStatus } from "../../../domain/models/Todo";
import { TodoService } from "../../../services/TodoService";
import { ToastService } from "../../../services/ToastService";
import { TodoRepository } from "../../../repositories/TodoRepository";

type TodosViewState = {
  createForm: {
    input: string;
    due: Date | null;
  };
  isDetailDrawerOpen: boolean;
  detailDrawerId: number | null;
  detailDrawerForm: {
    name: string;
    due: Date | null;
    status: TodoStatus;
    tagIds: number[];
  };
};

export class TodosViewService {
  private todoRepo: TodoRepository;
  private todoSvc: TodoService;
  private toastSvc: ToastService;
  private state: TodosViewState;

  constructor(params: {
    todoRepo: TodoRepository;
    todoSvc: TodoService;
    toastSvc: ToastService;
  }) {
    this.todoRepo = params.todoRepo;
    this.todoSvc = params.todoSvc;
    this.toastSvc = params.toastSvc;
    this.state = proxy<TodosViewState>({
      createForm: {
        input: "",
        due: new Date(),
      },
      isDetailDrawerOpen: false,
      detailDrawerId: null,
      detailDrawerForm: {
        name: "",
        due: new Date(),
        status: "todo",
        tagIds: [],
      },
    });
  }

  getState() {
    return this.state;
  }

  changeInput(input: string) {
    this.state.createForm.input = input;
  }

  async createTodo() {
    // TODO validation
    if (!this.state.createForm.due) {
      return;
    }

    await this.todoSvc.create({
      name: this.state.createForm.input,
      due: this.state.createForm.due,
      status: "todo",
      tagIds: [],
    });
    this.state.createForm.input = "";
    this.toastSvc.show({ severity: "success", summary: "Created a todo" });
  }

  async toggleStatus(id: number) {
    await this.todoSvc.toggleStatus(id);
    this.toastSvc.show({ severity: "success", summary: "Changed todo status" });
  }

  async setDue(due: Date | null | undefined) {
    this.state.createForm.due = due ?? null;
  }

  async setTagIds(id: number, tagIds: number[]) {
    await this.todoSvc.setTagIds(id, tagIds);
    this.toastSvc.show({ severity: "success", summary: "Changed todo tags" });
  }

  async openDetailDrawer(id: number) {
    const todo = await this.todoRepo.findCacheById(id);

    this.state.detailDrawerForm.name = todo.name;
    this.state.detailDrawerForm.due = todo.due;
    this.state.detailDrawerForm.status = todo.status;
    this.state.detailDrawerForm.tagIds = todo.tagIds;

    this.state.isDetailDrawerOpen = true;
    this.state.detailDrawerId = id;
  }

  async closeDetailDrawer() {
    this.state.isDetailDrawerOpen = false;
    this.state.detailDrawerId = null;
  }

  async updateTodo() {
    // TODO validation
    if (!this.state.detailDrawerForm.due) {
      return;
    }
    if (!this.state.detailDrawerId) {
      return;
    }

    await this.todoSvc.update({
      id: this.state.detailDrawerId,
      name: this.state.detailDrawerForm.name,
      due: this.state.detailDrawerForm.due,
      status: this.state.detailDrawerForm.status,
      tagIds: this.state.detailDrawerForm.tagIds,
    });
    this.toastSvc.show({ severity: "success", summary: "Created a todo" });
    this.closeDetailDrawer();
  }

  setDetailName(name: string) {
    this.state.detailDrawerForm.name = name;
  }

  setDetailDue(due: Date | null | undefined) {
    this.state.detailDrawerForm.due = due ?? null;
  }

  setDetailStatus(status: TodoStatus) {
    this.state.detailDrawerForm.status = status;
  }

  setDetailTagIds(tagIds: number[]) {
    this.state.detailDrawerForm.tagIds = tagIds;
  }
}
