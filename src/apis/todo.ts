import {
  TodoRecord,
  Todo,
  TodoCreate,
  fromTodoRecord,
  toTodoRecord,
} from "../domain/models/Todo";

export const find = async (params?: { ids?: number[] }) => {
  let data: TodoRecord[] = JSON.parse(
    window.localStorage.getItem("data:todos") ?? "[]",
  );

  const ids = params?.ids;
  if (ids) {
    data = data.filter((todo) => ids.includes(todo.id));
  }

  const restored: Todo[] = data.map(fromTodoRecord);

  return restored;
};

export const create = async (todoParams: TodoCreate) => {
  const todos: Todo[] = JSON.parse(
    window.localStorage.getItem("data:todos") ?? "[]",
  );
  const nextId =
    todos.length === 0 ? 1 : Math.max(...todos.map((t) => t.id)) + 1;
  const todo: Todo = {
    ...todoParams,
    id: nextId,
  };
  window.localStorage.setItem(
    "data:todos",
    JSON.stringify([toTodoRecord(todo), ...todos]),
  );
  return {
    id: nextId,
  };
};

export const update = async (todo: Todo) => {
  const todos: Todo[] = JSON.parse(
    window.localStorage.getItem("data:todos") ?? "[]",
  );
  const nextTodos = todos.map((t) =>
    t.id === todo.id ? toTodoRecord(todo) : t,
  );
  window.localStorage.setItem("data:todos", JSON.stringify(nextTodos));
};
