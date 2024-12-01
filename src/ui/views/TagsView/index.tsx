import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useQuery } from "@tanstack/react-query";
import { useSnapshot } from "valtio";

import { useRegistry } from "../../../contexts/RegistryContext";
import * as tagApis from "../../../apis/tag";

export const TagsView = () => {
  const registry = useRegistry();
  const viewSvc = registry.get("tagsViewSvc");

  const state = useSnapshot(viewSvc.getState());
  const { data: tags } = useQuery({
    queryKey: ["tags"],
    queryFn: () => tagApis.find(),
    initialData: [],
  });

  return (
    <>
      <h1 className="p-component text-2xl">Tags</h1>
      <div className="p-inputgroup flex-1 mb-3">
        <InputText
          placeholder="Tag name"
          value={state.input}
          onChange={(e) => viewSvc.changeInput(e.target.value)}
        />
        <Button label="Create" onClick={() => viewSvc.createTag()} />
      </div>
      <DataTable value={tags}>
        <Column field="id" header="ID" className="w-2rem"></Column>
        <Column field="name" header="Name"></Column>
      </DataTable>
    </>
  );
};
