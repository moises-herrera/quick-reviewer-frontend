import { Route, Routes } from 'react-router';
import { PullRequests } from '../components/pull-requests/PullRequests';
import { Repositories } from '../components/repositories/Repositories';
import { Accounts } from '../pages/Accounts';
import { CodeReviews } from '../components/code-reviews/CodeReviews';

export const AccountsRoutes = () => {
  return (
    <section className="w-full">
      <Routes>
        <Route path="/" element={<Accounts />} />
        <Route path="/:ownerName/repositories" element={<Repositories />} />
        <Route
          path="/:ownerName/repositories/:repositoryName/pulls"
          element={<PullRequests />}
        />
        <Route
          path="/:ownerName/repositories/:repositoryName/pulls/:pullRequestNumber/reviews"
          element={<CodeReviews />}
        />
      </Routes>
    </section>
  );
};
