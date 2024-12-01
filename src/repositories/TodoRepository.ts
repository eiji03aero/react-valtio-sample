import { QueryClient } from "@tanstack/react-query";

import { Todo, TodoCreate } from "../domain/models/Todo";
import * as todoApis from "../apis/todo";

export class TodoRepository {
  private queryClient: QueryClient;

  constructor(queryClient: QueryClient) {
    this.queryClient = queryClient;
  }

  async invalidateQueries() {
    await this.queryClient.invalidateQueries({ queryKey: ["todos"] });
  }

  async findCache() {
    const todos = this.queryClient.getQueryData<Todo[]>(["todos"]) || [];
    return todos;
  }

  async findCacheById(id: number) {
    const todos = await this.findCache();
    const todo = todos.find((t) => t.id === id);
    if (!todo) {
      throw new Error("not found");
    }

    return todo;
  }

  async create(todoParams: TodoCreate) {
    await todoApis.create(todoParams);
  }

  async update(todo: Todo) {
    await todoApis.update(todo);
  }
}
