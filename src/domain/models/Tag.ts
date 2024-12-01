export type TagRecord = {
  id: number;
  name: string;
};

export type Tag = {
  id: number;
  name: string;
};

export type TagCreate = Omit<Tag, "id">;

export const fromTagRecord = (t: TagRecord): Tag => {
  return {
    id: t.id,
    name: t.name,
  };
};

export const toTagRecord = (t: Tag): TagRecord => {
  return {
    id: t.id,
    name: t.name,
  };
};
