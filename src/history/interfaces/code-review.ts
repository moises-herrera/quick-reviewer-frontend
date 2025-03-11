export interface CodeReview {
  id: bigint;
  pullRequestId: bigint;
  createdAt: Date;
  reviewer: string;
  status: string;
}
