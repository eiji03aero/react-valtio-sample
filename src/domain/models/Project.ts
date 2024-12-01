import * as datefns from "date-fns";

export type ProjectRecord = {
  id: number;
  name: string;
  description: string;
  due: string;
  todoIds: number[];
};

export type Project = {
  id: number;
  name: string;
  description: string;
  due: Date;
  todoIds: number[];
};

export type ProjectCreate = {
  name: string;
  description: string;
  due: Date;
  todos: readonly {
    name: string;
    due: Date;
  }[];
};

export const fromProjectRecord = (pj: ProjectRecord): Project => {
  return {
    id: pj.id,
    name: pj.name,
    description: pj.description,
    todoIds: pj.todoIds,
    due: datefns.parseISO(pj.due),
  };
};

export const toProjectRecord = (pj: Project): ProjectRecord => {
  return {
    id: pj.id,
    name: pj.name,
    description: pj.description,
    todoIds: pj.todoIds,
    due: datefns.formatISO(pj.due),
  };
};
