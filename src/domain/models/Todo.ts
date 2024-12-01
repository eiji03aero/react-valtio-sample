import * as datefns from "date-fns";

export const TodoStatuses = ["todo", "done"] as const;
export type TodoStatus = (typeof TodoStatuses)[number];

export type TodoRecord = {
  id: number;
  name: string;
  status: TodoStatus;
  tagIds: number[];
  due: string;
};

export type Todo = {
  id: number;
  name: string;
  status: TodoStatus;
  tagIds: number[];
  due: Date;
};

export type TodoCreate = Omit<Todo, "id">;

export const fromTodoRecord = (todo: TodoRecord): Todo => {
  return {
    id: todo.id,
    name: todo.name,
    status: todo.status,
    tagIds: todo.tagIds,
    due: datefns.parseISO(todo.due),
  };
};

export const toTodoRecord = (todo: Todo): TodoRecord => {
  return {
    id: todo.id,
    name: todo.name,
    status: todo.status,
    tagIds: todo.tagIds,
    due: datefns.formatISO(todo.due),
  };
};
