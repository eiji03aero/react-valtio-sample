import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useQuery } from "@tanstack/react-query";
import { useSnapshot } from "valtio";

import { useRegistry } from "../../../contexts/RegistryContext";
import { Project } from "../../../domain/models/Project";
import * as projectApis from "../../../apis/project";

import { CreateProjectWizard } from "./standalone/CreateProjectWizard";

export const ProjectsView = () => {
  const registry = useRegistry();
  const viewSvc = registry.get("projectsViewSvc");

  const state = useSnapshot(viewSvc.getState());
  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: () => projectApis.find(),
    initialData: [] as Project[],
  });

  return (
    <>
      <h1 className="p-component text-2xl">Projects</h1>
      <div className="p-inputgroup flex-1 mb-3">
        <Button label="Create" onClick={() => viewSvc.openCreateWizard()} />
      </div>
      <DataTable value={projects}>
        <Column field="id" header="ID" className="w-2rem"></Column>
        <Column field="name" header="Name"></Column>
      </DataTable>

      {state.showCreate && (
        <CreateProjectWizard onClose={() => viewSvc.closeCreateWizard()} />
      )}
    </>
  );
};
