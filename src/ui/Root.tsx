import { useSnapshot } from "valtio";

import { useRegistry } from "../contexts/RegistryContext";
import { Navigation } from "./layouts/Navigation";
import { ProjectsView } from "./views/ProjectsView";
import { TodosView } from "./views/TodosView";
import { TagsView } from "./views/TagsView";

export const Root = () => {
  const registry = useRegistry();
  const navSvc = registry.get("navigationSvc");
  const navState = useSnapshot(navSvc.getState());

  return (
    <>
      <Navigation />

      <div className="w-full py-3">
        {navState.tab === "projects" && <ProjectsView />}
        {navState.tab === "todos" && <TodosView />}
        {navState.tab === "tags" && <TagsView />}
      </div>
    </>
  );
};
