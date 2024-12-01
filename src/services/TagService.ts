import { TagRepository } from "../repositories/TagRepository";
import { Tag, TagCreate } from "../domain/models/Tag";

export class TagService {
  private tagRepo: TagRepository;

  constructor(params: { tagRepo: TagRepository }) {
    this.tagRepo = params.tagRepo;
  }

  async create(tagCreate: TagCreate) {
    await this.tagRepo.create(tagCreate);
    await this.tagRepo.invalidateQueries();
  }

  async update(tag: Tag) {
    await this.tagRepo.update(tag);
    await this.tagRepo.invalidateQueries();
  }
}
