import { useAuthStore } from '@/auth/store/useAuthStore';
import { SwitchFormControl } from '@/shared/components/SwitchFormControl';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import {
  getAccountSettings,
  syncAccountSettings,
  updateAccountSettings,
} from '../actions/account-settings.actions';
import { BotSettings } from '../interfaces/bot-settings';
import { Button } from '@/components/ui/button';
import { AxiosError } from 'axios';
import { CardSkeleton } from '@/shared/components/CardSkeleton';

export const AccountSettingsSection = () => {
  const accountId = useAuthStore(({ account }) => account?.id);
  const queryClient = useQueryClient();
  const accountSettingsQuery = useQuery({
    queryKey: ['account-settings', accountId],
    queryFn: () => getAccountSettings(accountId || ''),
    refetchOnWindowFocus: false,
  });
  const updateAccountSettingsMutation = useMutation({
    mutationFn: (settings: Partial<BotSettings>) =>
      updateAccountSettings(accountId || '', {
        ...(accountSettingsQuery.data?.data as BotSettings),
        ...settings,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['account-settings', accountId],
      });
    },
  });
  const syncAccountSettingsMutation = useMutation({
    mutationFn: () => syncAccountSettings(accountId || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['repository-settings', accountId],
      });
    },
  });

  const accountSettingsLoading =
    accountSettingsQuery.isFetching || updateAccountSettingsMutation.isPending;
  const hasNotPermissions =
    accountSettingsQuery.error instanceof AxiosError &&
    accountSettingsQuery.error?.status === 403;

  if (accountSettingsQuery.isLoading) {
    return <CardSkeleton />;
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="text-xl font-medium">Account settings</h3>
        <p className="text-gray-600">
          {hasNotPermissions
            ? 'You do not have permission to manage these settings. Only the admin can make changes.'
            : 'Manage your account settings here.'}
        </p>
      </div>

      {hasNotPermissions ? null : (
        <>
          <SwitchFormControl
            label="Auto review mode"
            description="Whether to automatically review pull requests. This will
                    automatically suggest changes to the pull request when it is
                    opened, updated, and marked as ready for review."
            value={accountSettingsQuery.data?.data.autoReviewEnabled}
            onChange={(value) =>
              updateAccountSettingsMutation.mutate({
                autoReviewEnabled: value,
              })
            }
            isLoading={accountSettingsLoading}
          />
          <SwitchFormControl
            label="Request changes workflow"
            description="Whether to review the pull request using an approach that
                    requests changes if needed, or approve it if everything is
                    fine."
            value={
              accountSettingsQuery.data?.data.requestChangesWorkflowEnabled
            }
            onChange={(value) =>
              updateAccountSettingsMutation.mutate({
                requestChangesWorkflowEnabled: value,
              })
            }
            isLoading={accountSettingsLoading}
          />

          <Button
            className="w-fit mt-3"
            variant="outline"
            onClick={() => syncAccountSettingsMutation.mutate()}
          >
            Apply the settings to all the repositories
          </Button>
        </>
      )}
    </div>
  );
};
