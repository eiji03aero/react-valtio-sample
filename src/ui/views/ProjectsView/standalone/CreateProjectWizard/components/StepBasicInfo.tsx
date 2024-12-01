import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";

type Props = {
  name: string;
  description: string;
  due: Date;
  onChangeName: (name: string) => void;
  onChangeDescription: (desc: string) => void;
  onChangeDue: (due: Date | undefined | null) => void;
  onNext: () => void;
};

export const StepBasicInfo = ({
  name,
  description,
  due,
  onChangeName,
  onChangeDescription,
  onChangeDue,
  onNext,
}: Props) => {
  return (
    <div className="flex flex-column gap-3">
      <div className="flex flex-column gap-2">
        <label className="font-bold">Name</label>
        <InputText
          className="w-full"
          value={name}
          onChange={(e) => onChangeName(e.target.value)}
        />
      </div>
      <div className="flex flex-column gap-2">
        <label className="font-bold">Description</label>
        <InputTextarea
          className="w-full"
          value={description}
          onChange={(e) => onChangeDescription(e.target.value)}
        />
      </div>
      <div className="flex flex-column gap-2">
        <label className="font-bold">Due</label>
        <Calendar
          className="w-full"
          value={due}
          onChange={(e) => onChangeDue(e.target.value)}
        />
      </div>
      <div className="flex justify-content-between">
        <span></span>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
};
