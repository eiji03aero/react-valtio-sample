import { proxy } from "valtio";

type NavigationState = {
  tab: "projects" | "todos" | "tags";
};

export class NavigationService {
  private state: NavigationState;

  constructor() {
    this.state = proxy<NavigationState>({
      tab: "projects",
    });
  }

  getState() {
    return this.state;
  }

  changeTab(tab: NavigationState["tab"]) {
    this.state.tab = tab;
  }
}
