import { Card, CardContent } from '@/components/ui/card';
import { AccountSettingsSection } from './AccountSettingsSection';
import { RepositorySettingsSection } from './RepositorySettingsSection';

export const BotSettingsSection = () => {
  return (
    <article>
      <h2 className="text-2xl font-semibold mb-3">
        QuickReviewer Bot settings
      </h2>

      <Card>
        <CardContent className="flex flex-col gap-6">
          <AccountSettingsSection />
          <RepositorySettingsSection />
        </CardContent>
      </Card>
    </article>
  );
};
