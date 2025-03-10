import { VITE_API_URL } from '@/constants/app-constants';
import { buttonVariants } from '@/components/ui/button';
import { Link, useSearchParams } from 'react-router';
import Github from '@/shared/icons/Github';
import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
import { toast } from 'sonner';

const SIGN_IN_WITH_GITHUB_URL = `${VITE_API_URL}/github/auth/login`;

export const Login = () => {
  const [searchParams] = useSearchParams();
  const authError = useMemo(() => searchParams.get('error'), [searchParams]);

  useEffect(() => {
    if (authError) {
      toast.error(
        'There was an error while trying to sign in with GitHub. Please try again.'
      );
    }
  }, [authError]);

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <div className="h-[30%] flex flex-col items-center gap-y-4">
        <h1 className="font-bold text-4xl text-blue-600">QuickReviewer</h1>
        <h2 className="font-medium text-xl max-w-[80%] text-center text-balance">
          Sign in to view the dashboard and metrics of QuickReviewer Bot.
        </h2>

        <Link
          className={clsx(
            buttonVariants({
              variant: 'outline',
              className: 'w-64 h-12 !text-base mt-2',
            })
          )}
          to={SIGN_IN_WITH_GITHUB_URL}
        >
          <Github fill="#000" className="size-6" />
          <span>Continue with GitHub</span>
        </Link>
      </div>

      <footer className="absolute bottom-0 w-full text-center p-4">
        <p>
          Developed by{' '}
          <Link
            target="_blank"
            to="https://github.com/moises-herrera"
            className="text-blue-600"
          >
            @moises-herrera
          </Link>
        </p>
      </footer>
    </section>
  );
};
