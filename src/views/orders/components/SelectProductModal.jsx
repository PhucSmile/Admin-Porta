import { useIntl } from 'react-intl';

import { Modal } from 'components/modal';
import { SelectProductTable } from './SelectProductTable';

export const SelectProductModal = ({
  onApply = () => {},
  ...restPropsModal
}) => {
  const intl = useIntl();

  return (
    <Modal
      size="large"
      footer={null}
      title={intl.formatMessage({ id: 'views.orders.modal.productCodeTitle' })}
      open
      {...restPropsModal}
    >
      <SelectProductTable onApply={onApply} />
    </Modal>
  );
};
