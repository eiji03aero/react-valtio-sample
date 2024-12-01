import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { useSnapshot } from "valtio";

import { useRegistry } from "../../../../contexts/RegistryContext";
import { TagsSelect } from "./TagsSelect";

type Props = {
  onHide: () => void;
};

export const DetailDrawer = ({ onHide }: Props) => {
  const registry = useRegistry();
  const viewSvc = registry.get("todosViewSvc");

  const state = useSnapshot(viewSvc.getState());
  const form = state.detailDrawerForm;

  const renderForm = () => {
    return (
      <div className="flex flex-column gap-3">
        <div>
          <label className="font-bold block mb-2">Name</label>
          <InputText
            className="w-full"
            value={form.name}
            onChange={(e) => viewSvc.setDetailName(e.target.value)}
          />
        </div>
        <div>
          <label className="font-bold block mb-2">Due</label>
          <Calendar
            className="w-full"
            value={form.due}
            onChange={(e) => viewSvc.setDetailDue(e.target.value)}
          />
        </div>
        <div>
          <label className="font-bold block mb-2">Status</label>
          <Checkbox
            checked={form.status === "todo"}
            onChange={(e) =>
              viewSvc.setDetailStatus(e.target.checked ? "done" : "todo")
            }
          />
        </div>
        <div>
          <label className="font-bold block mb-2">tagIds</label>
          <TagsSelect
            value={form.tagIds}
            onChange={(val) => viewSvc.setDetailTagIds(val)}
          />
        </div>
        <div>
          <Button onClick={() => viewSvc.updateTodo()}>Save</Button>
        </div>
      </div>
    );
  };

  return (
    <Sidebar
      className="w-30rem"
      visible={true}
      position="right"
      onHide={onHide}
    >
      {renderForm()}
    </Sidebar>
  );
};
