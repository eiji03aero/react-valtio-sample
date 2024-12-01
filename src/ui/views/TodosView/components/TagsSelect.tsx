import { MultiSelect } from "primereact/multiselect";
import { useQuery } from "@tanstack/react-query";

import * as tagApis from "../../../../apis/tag";

type Props = {
  value: readonly number[];
  onChange: (ids: number[]) => void;
};
export const TagsSelect = ({ value, onChange }: Props) => {
  const { data: options } = useQuery({
    queryKey: ["tags"],
    queryFn: () => tagApis.find(),
    select: (tags) => tags.map((tag) => ({ label: tag.name, value: tag.id })),
  });

  return (
    <MultiSelect
      className="w-full"
      value={value}
      onChange={(e) => (console.log("onchange", e.value), onChange(e.value))}
      options={options}
      optionLabel="label"
      placeholder="Select tags"
    />
  );
};
