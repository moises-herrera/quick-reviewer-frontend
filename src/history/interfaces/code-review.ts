export interface CodeReview {
  id: string;
  pullRequestId: string;
  createdAt: Date;
  reviewer: string;
  status: string;
}
