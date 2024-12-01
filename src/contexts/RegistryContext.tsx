import * as React from "react";
import { QueryClient } from "@tanstack/react-query";
import { Toast } from "primereact/toast";

import { TodoRepository } from "../repositories/TodoRepository";
import { TagRepository } from "../repositories/TagRepository";
import { ProjectRepository } from "../repositories/ProjectRepository";
import { TodoService } from "../services/TodoService";
import { TagService } from "../services/TagService";
import { ProjectService } from "../services/ProjectService";
import { ToastService } from "../services/ToastService";
import { TodosViewService } from "../ui/views/TodosView/TodosViewService";
import { TagsViewService } from "../ui/views/TagsView/TagsViewService";
import { ProjectsViewService } from "../ui/views/ProjectsView/ProjectsViewService";
import { NavigationService } from "../ui/layouts/Navigation/NavigationService";

type Registry = {
  todoRepo: TodoRepository;
  tagRepo: TagRepository;
  projectRepo: ProjectRepository;
  todoSvc: TodoService;
  tagSvc: TagService;
  projectSvc: ProjectService;
  toastSvc: ToastService;
  todosViewSvc: TodosViewService;
  tagsViewSvc: TagsViewService;
  projectsViewSvc: ProjectsViewService;
  navigationSvc: NavigationService;
};

const initializeRegistry = (params: {
  queryClient: QueryClient;
  toastApi: Toast;
}) => {
  const todoRepo = new TodoRepository(params.queryClient);
  const tagRepo = new TagRepository(params.queryClient);
  const projectRepo = new ProjectRepository(params.queryClient);
  const todoSvc = new TodoService({ todoRepo });
  const tagSvc = new TagService({ tagRepo });
  const projectSvc = new ProjectService({ projectRepo });
  const toastSvc = new ToastService({ toastApi: params.toastApi });
  const todosViewSvc = new TodosViewService({ todoRepo, todoSvc, toastSvc });
  const tagsViewSvc = new TagsViewService({ tagSvc });
  const projectsViewSvc = new ProjectsViewService({ projectSvc });
  const navigationSvc = new NavigationService();

  const registry: Registry = {
    todoRepo,
    tagRepo,
    projectRepo,
    todoSvc,
    tagSvc,
    toastSvc,
    projectSvc,
    todosViewSvc,
    tagsViewSvc,
    projectsViewSvc,
    navigationSvc,
  };

  return registry;
};

const RegistryContext = React.createContext<Registry>({} as Registry);

export const RegistryProvider = ({
  queryClient,
  children,
}: {
  queryClient: QueryClient;
  children: React.ReactNode;
}) => {
  const [mounted, setMounted] = React.useState(false);
  const toastRef = React.useRef(null);
  const [registry, setRegistry] = React.useState<Registry | null>(null);

  React.useEffect(() => {
    setMounted(true);
    setRegistry(
      initializeRegistry({ queryClient, toastApi: toastRef.current! }),
    );
  }, []);

  return (
    <RegistryContext.Provider value={registry!}>
      <Toast ref={toastRef} />
      {mounted && children}
    </RegistryContext.Provider>
  );
};

export const useRegistry = () => {
  const registry = React.useContext(RegistryContext);

  const get = <T extends keyof Registry>(key: T) => {
    return registry[key];
  };

  return { get };
};
