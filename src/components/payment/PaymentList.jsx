import { useIntl } from 'react-intl';
import { Row, Col, Empty } from 'antd';
import { ReactComponent as EmptySVG } from 'assets/svg/empty.svg';
import { PaymentItem } from './PaymentItem';

export const PaymentList = ({
  banks = [],
  onClickDelete = () => {},
  onClickEdit = () => {},
}) => {
  const intl = useIntl();

  return (
    <>
      {banks.length > 0 ? (
        <Row gutter={[42, 42]}>
          {banks.map((bank) => (
            <Col span={12} xxl={{ span: 8 }} key={bank.id}>
              <PaymentItem
                item={bank}
                onClickDelete={() => onClickDelete(bank.id)}
                onClickEdit={() => onClickEdit(bank)}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty
          image={<EmptySVG />}
          imageStyle={{ height: 60 }}
          description={intl.formatMessage({ id: 'views.settings.empty' })}
        />
      )}
    </>
  );
};
