import { useIntl } from 'react-intl';
import { RichText } from 'components/editor';
import { SettingLayout } from './SettingLayout';

export const NoteSetting = () => {
  const intl = useIntl();

  return (
    <SettingLayout
      title={intl.formatMessage({ id: 'views.settings.title.noteTitle' })}
    >
      <RichText />
    </SettingLayout>
  );
};
