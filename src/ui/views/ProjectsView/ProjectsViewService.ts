import { proxy } from "valtio";

import { ProjectService } from "../../../services/ProjectService";

type ProjectsViewState = {
  showCreate: boolean;
};

export class ProjectsViewService {
  private projectSvc: ProjectService;
  private state: ProjectsViewState;

  constructor(params: { projectSvc: ProjectService }) {
    this.projectSvc = params.projectSvc;
    this.state = proxy<ProjectsViewState>({
      showCreate: false,
    });
  }

  getState() {
    return this.state;
  }

  openCreateWizard() {
    this.state.showCreate = true;
  }

  closeCreateWizard() {
    this.state.showCreate = false;
  }
}
