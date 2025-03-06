import { Route, Routes } from 'react-router';
import { AccountsMain } from '../components/AccountsMain';
import { Repositories } from '../components/Repositories';

export const Accounts = () => {
  return (
    <section className="w-full">
      <Routes>
        <Route path="/" element={<AccountsMain />} />
        <Route path="/:accountId/repositories" element={<Repositories />} />
      </Routes>
    </section>
  );
};
