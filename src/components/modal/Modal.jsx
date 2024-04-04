import { useIntl } from 'react-intl';
import { MODAL_WIDTH } from 'constants/styles';
import { StyledModal, StyledButton } from 'styles/overrides';
import { CloseIcon } from 'assets/icons';

export const Modal = ({ size = 'medium', ...props }) => {
  const intl = useIntl();

  return (
    <StyledModal
      open
      width={MODAL_WIDTH[size] ?? MODAL_WIDTH['medium']}
      closeIcon={<CloseIcon />}
      footer={[
        <StyledButton
          key="submit"
          type="primary"
          size="large"
          onClick={props.onOk}
          {...props.okButtonProps}
        >
          {props.okText ?? intl.formatMessage({ id: 'common.btn.save' })}
        </StyledButton>,
        <StyledButton
          key="cancel"
          size="large"
          onClick={props.onCancel}
          {...props.cancelButtonProps}
        >
          {props.cancelText ?? intl.formatMessage({ id: 'common.btn.cancel' })}
        </StyledButton>,
      ]}
      {...props}
    />
  );
};
