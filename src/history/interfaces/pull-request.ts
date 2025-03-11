export interface PullRequest {
  id: bigint;
  number: number;
  repositoryId: bigint;
  title: string;
  state: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  closedAt: Date | null;
  author: string;
  additions: number;
  deletions: number;
  changedFiles: number;
}
