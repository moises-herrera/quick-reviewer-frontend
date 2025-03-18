export interface Account {
  id: string;
  type: 'User' | 'Organization';
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
