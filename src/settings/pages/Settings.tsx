import { useEffect } from 'react';
import { BotSettingsSection } from '@/settings/components/BotSettingsSection';
import { APP_NAME } from '@/constants/app.constants';
import { UserSection } from '../components/UserSection';

const Settings = () => {
  useEffect(() => {
    document.title = `${APP_NAME} - Settings`;
  }, []);

  return (
    <section className="flex flex-col gap-8">
      <UserSection />
      <BotSettingsSection />
    </section>
  );
};

export default Settings;
