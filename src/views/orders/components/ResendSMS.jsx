import { useIntl } from 'react-intl';
import { Popconfirm } from 'antd';
import { StyledButton } from 'styles/overrides';
import { Notification } from 'components/Notification';
import { useSendSMS } from 'api/smsApi';
import { getPublicOrderLink } from '../utils';

export const ResendSMS = ({ onSuccess = () => {}, selectedRows = [] }) => {
  const intl = useIntl();
  const sendSmsMutation = useSendSMS();
  const isDisabled = selectedRows.length <= 0;

  const sleep = time => {
      return new Promise((resolve)=>setTimeout(resolve,time)
    )
  }

  const handleResendMultipleSMS = async () => {
    if (isDisabled) return;

    let total_count = selectedRows.length;
    let fail_count = 0;
    let fail_error;
    for (let item of selectedRows) {
      try {
        await sendSmsMutation.mutateAsync({
          order_id: item.id,
          phone: item.orderAddress?.phone,
          message: intl.formatMessage(
            {
              id: 'components.sendSMS.form.initialValues.message',
            },
            {
              code: item.code,
              publicLink: getPublicOrderLink(item.code),
            },
          ),
        });
      } catch (error) {
        fail_count++;
        fail_error = error;
      }

      await sleep(1000);
    }

    if(fail_count > 0){
      let fail_message = fail_count.toString() + '/' + total_count.toString() + ' failed SMS sendings'
      fail_message = fail_message + ' - ' + fail_error.message || intl.formatMessage({ id: 'message.commonError'})
      Notification(
        'error',
        fail_message
      );
    } else {
      Notification(
        'success',
        intl.formatMessage({
          id: 'message.sendMessageSuccess',
        }),
      );  
      onSuccess();
    }
  };

  return (
    <Popconfirm
      placement="top"
      title={intl.formatMessage({ id: 'components.sendSMS.popconfirm.title' })}
      onConfirm={handleResendMultipleSMS}
      okText={intl.formatMessage({ id: 'common.btn.send' })}
      cancelText={intl.formatMessage({ id: 'common.btn.cancel' })}
      disabled={isDisabled}
    >
      <StyledButton size="large" danger disabled={isDisabled}>
        {intl.formatMessage({ id: 'common.btn.resendSMS' })}
      </StyledButton>
    </Popconfirm>
  );
};
