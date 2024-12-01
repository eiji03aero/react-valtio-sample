import {
  ProjectCreate,
  ProjectRecord,
  fromProjectRecord,
  toProjectRecord,
} from "../domain/models/Project";
import * as todoApis from "./todo";

export const find = async () => {
  let data: ProjectRecord[] = JSON.parse(
    window.localStorage.getItem("data:projects") ?? "[]",
  );

  return data.map(fromProjectRecord);
};

export const create = async (projectParams: ProjectCreate) => {
  const todoIds = await Promise.all(
    projectParams.todos.map(async (t) => {
      const { id } = await todoApis.create({
        name: t.name,
        due: t.due,
        status: "todo",
        tagIds: [],
      });
      return id;
    }),
  );

  const projects: ProjectRecord[] = JSON.parse(
    window.localStorage.getItem("data:projeccts") ?? "[]",
  );
  const nextId =
    projects.length === 0 ? 1 : Math.max(...projects.map((p) => p.id)) + 1;
  const project = toProjectRecord({
    ...projectParams,
    id: nextId,
    todoIds,
  });

  window.localStorage.setItem(
    "data:projects",
    JSON.stringify([project, ...projects]),
  );
};
