import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Form } from 'antd';
import { StyledButton } from 'styles/overrides';
import { Modal } from 'components/modal/Modal';
import { useResetFormOnCloseModal } from 'hooks/useResetFormOnCloseModal';
import { useSendSMS } from 'api/smsApi';
import { Notification } from 'components/Notification';
import { SendSMSForm } from './SendSMSForm';

export const SendSMS = ({ phone, code, publicLink, orderId }) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const sendSMSMutation = useSendSMS();

  useResetFormOnCloseModal({
    form,
    open: isOpen,
  });

  const handleSubmitData = (values) => {
    sendSMSMutation.mutate(
      { ...values, order_id: orderId },
      {
        onSuccess() {
          Notification(
            'success',
            intl.formatMessage({
              id: 'message.sendMessageSuccess',
            }),
          );

          setIsOpen(false);
        },
        onError(error) {
          Notification(
            'error',
            error.message ||
              intl.formatMessage({
                id: 'message.commonError',
              }),
          );
        },
      },
    );
  };

  return (
    <>
      <StyledButton size="large" type="primary" onClick={() => setIsOpen(true)}>
        {intl.formatMessage({ id: 'common.btn.sendLink' })}
      </StyledButton>

      <Modal
        open={isOpen}
        title={intl.formatMessage({ id: 'components.sendSMS.modalTitle' })}
        okText={intl.formatMessage({ id: 'common.btn.send' })}
        onOk={() => {
          form.validateFields().then(handleSubmitData);
        }}
        onCancel={() => setIsOpen(false)}
        okButtonProps={{ loading: sendSMSMutation.isLoading }}
      >
        <SendSMSForm
          form={form}
          initialValues={{
            phone,
            message: intl.formatMessage(
              {
                id: 'components.sendSMS.form.initialValues.message',
              },
              {
                code,
                publicLink,
              },
            ),
          }}
        />
      </Modal>
    </>
  );
};
