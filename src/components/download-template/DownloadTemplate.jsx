import { useIntl } from 'react-intl';
// import { saveAs } from 'file-saver';
import { StyledButton } from 'styles/overrides';
import { DownloadIcon } from 'assets/icons';

export const DownloadTemplate = ({ fileName }) => {
  const intl = useIntl();

  // const handleClick = async () => {
  //   if (!mutation) {
  //     return;
  //   }

  //   mutation.mutate(null, {
  //     onSuccess(res) {
  //       saveAs(res, fileName);
  //     },
  //   });
  // };

  return (
    <StyledButton
      icon={<DownloadIcon />}
      size="large"
      // onClick={handleClick}
      // loading={mutation.isLoading}
      href={`${process.env.PUBLIC_URL}/${fileName}`}
    >
      {intl.formatMessage({ id: 'common.btn.downloadCsvTemplate' })}
    </StyledButton>
  );
};
