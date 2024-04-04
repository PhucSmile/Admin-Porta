import { Form } from 'antd';

import { Drawer } from 'components/drawer';
import { OrderId } from './OrderId';
import { OrderForm } from './OrderForm';
import { normalizeOrderData } from '../utils';

export const OrderFormDrawer = ({
  id,
  title,
  onClose,
  onSuccess,
  initialValues,
  canEdit = false,
  ...restProps
}) => {
  const [form] = Form.useForm();
  const normalizeInitialValues = normalizeOrderData(initialValues);

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Drawer
      title={<OrderId orderId={title} />}
      onClose={handleCancel}
      {...restProps}
    >
      <OrderForm
        form={form}
        onCancel={handleCancel}
        onSuccess={onSuccess}
        isOpen={restProps.open}
        initialValues={normalizeInitialValues}
        canEdit={canEdit}
        id={id}
      />
    </Drawer>
  );
};
