import { FC } from 'react';
import { SwitchFormControl } from '@/shared/components/SwitchFormControl';
import { Repository } from '@/history/interfaces/repository';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BotSettings } from '../interfaces/bot-settings';
import {
  resetRepositorySettings,
  updateRepositorySettings,
} from '@/settings/actions/repository-settings.actions';
import { GITHUB_URL } from '@/constants/app.constants';

interface RepositorySettingsProps {
  repository: Repository;
  accountId?: string;
  accountName?: string;
}

export const RepositorySettings: FC<RepositorySettingsProps> = ({
  repository,
  accountId,
  accountName,
}) => {
  const queryClient = useQueryClient();
  const updateRepositorySettingsMutation = useMutation({
    mutationFn: (settings: Partial<BotSettings>) =>
      updateRepositorySettings(repository.id, {
        autoReviewEnabled: settings.autoReviewEnabled ?? false,
        requestChangesWorkflowEnabled:
          settings.requestChangesWorkflowEnabled ?? false,
        ...settings,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['repository-settings', accountId],
      });
    },
  });
  const resetRepositorySettingsMutation = useMutation({
    mutationFn: () => resetRepositorySettings(repository.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['repository-settings', accountId],
      });
    },
  });
  const isLoadingElement =
    resetRepositorySettingsMutation.isPending ||
    updateRepositorySettingsMutation.isPending;

  const setAccountConfiguration = (checked: boolean) => {
    if (checked) {
      resetRepositorySettingsMutation.mutate();
    } else {
      updateRepositorySettingsMutation.mutate({
        autoReviewEnabled: false,
        requestChangesWorkflowEnabled: false,
      });
    }
  };

  return (
    <div className="flex flex-col gap-3 border-b border-slate-200 pb-4">
      <a
        href={`${GITHUB_URL}/${accountName}/${repository.name}`}
        target="_blank"
      >
        <h4 className="w-fit text-lg font-medium text-blue-500 hover:text-blue-700 hover:underline">
          {repository.name}
        </h4>
      </a>

      <SwitchFormControl
        label="Use account configuration for this repository"
        description="Whether to apply the account configuration to this repository. This
            will override the repository settings if enabled."
        value={!repository.settings}
        onChange={setAccountConfiguration}
        isLoading={isLoadingElement}
      />

      {repository.settings && (
        <>
          <SwitchFormControl
            label="Auto review mode"
            description="Whether to automatically review pull requests. This will
                    automatically suggest changes to the pull request when it is
                    opened, updated, and marked as ready for review."
            value={repository.settings?.autoReviewEnabled}
            onChange={(checked) => {
              updateRepositorySettingsMutation.mutate({
                autoReviewEnabled: checked,
              });
            }}
            isLoading={isLoadingElement}
          />
          <SwitchFormControl
            label="Request changes workflow"
            description="Whether to review the pull request using an approach that requests
            changes if needed, or approve it if everything is fine."
            value={repository.settings?.requestChangesWorkflowEnabled}
            onChange={(checked) => {
              updateRepositorySettingsMutation.mutate({
                requestChangesWorkflowEnabled: checked,
              });
            }}
            isLoading={isLoadingElement}
          />
        </>
      )}
    </div>
  );
};
