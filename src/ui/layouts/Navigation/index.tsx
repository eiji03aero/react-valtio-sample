import { Card } from "primereact/card";
import { Button } from "primereact/button";

import { useRegistry } from "../../../contexts/RegistryContext";

export const Navigation = () => {
  const registry = useRegistry();
  const navSvc = registry.get("navigationSvc");

  return (
    <div className="w-full">
      <Card>
        <div className="flex w-full align-items-center">
          <span className="mr-5">Playground</span>
          <Button
            label="Projects"
            severity="contrast"
            size="small"
            className="mr-3"
            onClick={() => navSvc.changeTab("projects")}
          ></Button>
          <Button
            label="Todos"
            severity="contrast"
            size="small"
            className="mr-3"
            onClick={() => navSvc.changeTab("todos")}
          ></Button>
          <Button
            label="Tags"
            severity="contrast"
            size="small"
            onClick={() => navSvc.changeTab("tags")}
          ></Button>
        </div>
      </Card>
    </div>
  );
};
