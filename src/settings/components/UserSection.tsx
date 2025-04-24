import { useAuthStore } from '@/auth/store/useAuthStore';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GITHUB_URL } from '@/constants/app.constants';
import { cn } from '@/lib/utils';
import { Link } from 'react-router';

export const UserSection = () => {
  const user = useAuthStore(({ user }) => user);

  return (
    <article>
      <h2 className="text-2xl font-semibold mb-3">
        User information from GitHub
      </h2>

      <Card>
        <CardContent className="flex flex-col">
          <p>
            <span className="font-medium">Name:</span>{' '}
            {user?.name ?? 'GitHub user'}
          </p>
          <p>
            <span className="font-medium">Username:</span>{' '}
            <Link
              target="_blank"
              to={`${GITHUB_URL}/${user?.username}`}
              className={cn(
                buttonVariants({ variant: 'link' }),
                'text-blue-500 hover:text-blue-700 !pl-0 !text-base'
              )}
            >
              @{user?.username}
            </Link>
          </p>
          <p>
            <span className="font-medium">Email:</span> {user?.email}
          </p>
        </CardContent>
      </Card>
    </article>
  );
};
