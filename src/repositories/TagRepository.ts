import { QueryClient } from "@tanstack/react-query";

import { Tag, TagCreate } from "../domain/models/Tag";
import * as tagApis from "../apis/tag";

export class TagRepository {
  private queryClient: QueryClient;

  constructor(queryClient: QueryClient) {
    this.queryClient = queryClient;
  }

  async invalidateQueries() {
    await this.queryClient.invalidateQueries({ queryKey: ["tags"] });
  }

  async findCache() {
    const tags = this.queryClient.getQueryData<Tag[]>(["tags"]) || [];
    return tags;
  }

  async findCacheById(id: number) {
    const tags = await this.findCache();
    const tag = tags.find((t) => t.id === id);
    if (!tag) {
      throw new Error("not found");
    }

    return tag;
  }

  async create(tagParams: TagCreate) {
    await tagApis.create(tagParams);
  }

  async update(tag: Tag) {
    await tagApis.update(tag);
  }
}
