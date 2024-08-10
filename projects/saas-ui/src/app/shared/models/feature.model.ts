export class Features {
  id?: string;
  name: string;
  description: string;
  key: string;
  type: 'boolean' | 'number' | 'string' | 'object';
  defaultValue: any;
  value?: string;
  constructor(data?: Partial<Features>) {
    this.id = data?.id;
    this.name = data.name;
    this.description = data.description;
    this.key = data.key;
    this.type = data.type;
    this.defaultValue = data.defaultValue;
    this.value = data.value;
  }
}
