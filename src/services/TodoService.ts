import { TodoRepository } from "../repositories/TodoRepository";
import { Todo, TodoCreate } from "../domain/models/Todo";

export class TodoService {
  private todoRepo: TodoRepository;

  constructor(params: { todoRepo: TodoRepository }) {
    this.todoRepo = params.todoRepo;
  }

  async create(todoCreate: TodoCreate) {
    await this.todoRepo.create(todoCreate);
    await this.todoRepo.invalidateQueries();
  }

  async update(todo: Todo) {
    await this.todoRepo.update(todo);
    await this.todoRepo.invalidateQueries();
  }

  async toggleStatus(id: number) {
    const todo = await this.todoRepo.findCacheById(id);
    await this.update({
      ...todo,
      status: todo.status === "todo" ? "done" : "todo",
    });
    await this.todoRepo.invalidateQueries();
  }

  async setTagIds(id: number, tagIds: number[]) {
    const todo = await this.todoRepo.findCacheById(id);
    await this.update({ ...todo, tagIds });
    const todo2 = await this.todoRepo.findCacheById(id);
  }
}
