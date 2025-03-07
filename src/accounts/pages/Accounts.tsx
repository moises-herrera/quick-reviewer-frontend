import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Organizations } from '../components/Organizations';
import { Users } from '../components/Users';

export const Accounts = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Accounts</h2>

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
    </>
  );
};
