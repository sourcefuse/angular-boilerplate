export interface Feature {
  name: string;
  description: string;
  key: string;
  type: 'boolean' | 'number' | 'string' | 'object';
  defaultValue: any;
}
