import { useAuthStore } from '@/auth/store/useAuthStore';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { APP_NAME } from '@/constants/app';
import { GITHUB_URL } from '@/constants/app-constants';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { Link } from 'react-router';

const Profile = () => {
  const user = useAuthStore(({ user }) => user);

  useEffect(() => {
    document.title = `${APP_NAME} - Profile`;
  }, []);

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-2xl font-semibold">Profile</h2>

      <Card>
        <CardContent className="flex flex-col gap-2">
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
    </section>
  );
};

export default Profile;
