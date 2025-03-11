export interface Repository {
  id: bigint;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: bigint;
}
