import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Organizations } from '../components/Organizations';
import { Users } from '../components/Users';
import { useEffect } from 'react';
import { APP_NAME } from '@/constants/app.constants';

export const Accounts = () => {
  useEffect(() => {
    document.title = `${APP_NAME} - GitHub History`;
  }, []);

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-semibold mb-2">GitHub history</h2>
        <p>
          This page displays the history of the GitHub data the application has
          collected.
        </p>
        <p>
          You can view the data of GitHub accounts with repositories to which
          you have access. This includes organizations and users.
        </p>
      </div>

      <Tabs defaultValue="organizations" className="w-full">
        <TabsList>
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="organizations">
          <Organizations />
        </TabsContent>
        <TabsContent value="users">
          <Users />
        </TabsContent>
      </Tabs>
    </section>
  );
};
