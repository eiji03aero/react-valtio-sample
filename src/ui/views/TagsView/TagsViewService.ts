import { proxy } from "valtio";

import { TagService } from "../../../services/TagService";

type TagsViewState = {
  input: string;
};

export class TagsViewService {
  private tagSvc: TagService;
  private state: TagsViewState;

  constructor(params: { tagSvc: TagService }) {
    this.tagSvc = params.tagSvc;
    this.state = proxy<TagsViewState>({
      input: "",
    });
  }

  getState() {
    return this.state;
  }

  changeInput(input: string) {
    this.state.input = input;
  }

  async createTag() {
    await this.tagSvc.create({
      name: this.state.input,
    });
    this.state.input = "";
  }
}
