import { QueryClient } from "@tanstack/react-query";

import { ProjectCreate } from "../domain/models/Project";
import * as projectApis from "../apis/project";

export class ProjectRepository {
  private queryClient: QueryClient;

  constructor(queryClient: QueryClient) {
    this.queryClient = queryClient;
  }

  async invalidateQueries() {
    await this.queryClient.invalidateQueries({ queryKey: ["projects"] });
  }

  async create(projectParams: ProjectCreate) {
    await projectApis.create(projectParams);
  }
}
