export interface Account {
  id: bigint;
  type: 'User' | 'Organization';
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
