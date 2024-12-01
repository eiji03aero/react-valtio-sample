import {
  Tag,
  TagRecord,
  TagCreate,
  fromTagRecord,
  toTagRecord,
} from "../domain/models/Tag";

export const find = async (params?: { ids?: number[] }) => {
  let data: TagRecord[] = JSON.parse(
    window.localStorage.getItem("data:tags") ?? "[]",
  );

  const ids = params?.ids;
  if (ids) {
    data = data.filter((tag) => ids.includes(tag.id));
  }

  return data.map(fromTagRecord);
};

export const create = async (tagParams: TagCreate) => {
  const tags: TagRecord[] = JSON.parse(
    window.localStorage.getItem("data:tags") ?? "[]",
  );
  const nextId = tags.length === 0 ? 1 : Math.max(...tags.map((t) => t.id)) + 1;
  const tag = toTagRecord({
    ...tagParams,
    id: nextId,
  });
  window.localStorage.setItem("data:tags", JSON.stringify([tag, ...tags]));
};

export const update = async (tag: Tag) => {
  const tags: Tag[] = JSON.parse(
    window.localStorage.getItem("data:tags") ?? "[]",
  );
  const nextTags = tags.map((t) => (t.id === tag.id ? toTagRecord(tag) : t));
  window.localStorage.setItem("data:tags", JSON.stringify(nextTags));
};
