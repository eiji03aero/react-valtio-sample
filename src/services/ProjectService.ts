import * as datefns from "date-fns";

import { ProjectRepository } from "../repositories/ProjectRepository";
import { ProjectCreate } from "../domain/models/Project";

export class ProjectService {
  private projectRepo: ProjectRepository;

  constructor(params: { projectRepo: ProjectRepository }) {
    this.projectRepo = params.projectRepo;
  }

  async create(projectCreate: ProjectCreate) {
    await this.projectRepo.create(projectCreate);
    await this.projectRepo.invalidateQueries();
  }

  async validateBasicInfo(
    params: Pick<ProjectCreate, "name" | "description" | "due">
  ) {
    if (!params.name) {
      return "Name is required";
    }
    if (!params.description) {
      return "Description is required";
    }
    if (!params.due) {
      return "Due is required";
    }
  }

  async validateTodos(params: Pick<ProjectCreate, "due" | "todos">) {
    const invalidTodoIdx = params.todos.findIndex(
      (todo) => !todo.name || !todo.due
    );
    if (invalidTodoIdx !== -1) {
      return `${invalidTodoIdx}th todo is missing required field`;
    }
    const invalidPastDueTodoIdx = params.todos.findIndex((todo) =>
      datefns.isBefore(todo.due, datefns.startOfDay(new Date()))
    );
    if (invalidPastDueTodoIdx !== -1) {
      return `${invalidPastDueTodoIdx}th todo has due date in past`;
    }
    const invalidDueAfterPJDueTodoIdx = params.todos.findIndex((todo) =>
      datefns.isAfter(todo.due, params.due)
    );
    if (invalidDueAfterPJDueTodoIdx !== -1) {
      return `${invalidDueAfterPJDueTodoIdx}th todo has due date after project due`;
    }
  }
}
