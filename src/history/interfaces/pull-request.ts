export interface PullRequest {
  id: string;
  number: number;
  repositoryId: string;
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
