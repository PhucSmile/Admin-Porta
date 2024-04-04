import { useIntl } from 'react-intl';
import { StyledTable } from 'styles/overrides';

export const Table = ({ pagination, ...props }) => {
  const intl = useIntl();

  return (
    <div>
      <StyledTable
        bordered
        pagination={
          pagination === false
            ? pagination
            : {
                position: ['bottomCenter'],
                showQuickJumper: true,
                showTotal: (total) =>
                  intl.formatMessage({ id: 'common.table.total' }, { total }),
                locale: { page: '' },
                ...pagination,
              }
        }
        {...props}
      />
    </div>
  );
};
