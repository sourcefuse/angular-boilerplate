import { required, validate } from '@main-project/core/decorators';

@validate()
export class NameIdRequired {
  @required()
  id: string;
  @required()
  name: string;
  constructor(data: NameIdRequired) {
    this.id = data.id;
    this.name = data.name;
  }
}
