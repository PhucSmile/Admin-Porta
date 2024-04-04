import { useIntl } from 'react-intl';

import { useCustomSearchParams } from 'hooks/useCustomSearchParams';
import { Table } from 'components/table';
import { UserFilterSearchForm } from 'views/users/components/UserFilterSearchForm';
import { StyledTypographyParagraph } from 'styles/overrides';
import { calcIndexByOrder, removeFalsyKeys, capitalizeLetter } from 'utils';
import { formatTime } from 'utils/timeUtils';
import { useLogs } from 'api/logApi';

export const LogTable = () => {
  const intl = useIntl();
  const [search, setSearch] = useCustomSearchParams();
  const { data, isLoading } = useLogs({ params: search });

  const columns = [
    {
      title: intl.formatMessage({ id: 'common.table.no' }),
      render: (text, record, index) => {
        return calcIndexByOrder({
          index,
          page: search.page,
          limit: search.limit,
        });
      },
    },
    {
      title: intl.formatMessage({ id: 'views.users.table.id' }),
      dataIndex: 'userId',
    },
    {
      title: intl.formatMessage({ id: 'views.users.table.username' }),
      dataIndex: 'username',
    },
    {
      title: intl.formatMessage({ id: 'views.users.table.role' }),
      dataIndex: 'userRole',
      render: (value) => capitalizeLetter(value),
    },
    {
      title: intl.formatMessage({ id: 'views.users.table.email' }),
      dataIndex: 'userEmail',
    },
    {
      title: intl.formatMessage({ id: 'views.users.table.phone' }),
      dataIndex: 'userPhone',
    },
    {
      title: intl.formatMessage({ id: 'views.logs.table.attachment' }),
      dataIndex: 'attachment',
      align: 'center',
      render: ({ file_name, mimetype, rowTotal, size }) => {
        return (
          <StyledTypographyParagraph>
            <p>
              {intl.formatMessage({ id: 'views.logs.table.rowTotal' })}:{' '}
              {rowTotal}
            </p>
            <p>
              {intl.formatMessage({ id: 'views.logs.table.fileName' })}:{' '}
              {file_name}
            </p>
            <p>
              {intl.formatMessage({ id: 'views.logs.table.size' })}: {size}
            </p>
            <p>
              {intl.formatMessage({ id: 'views.logs.table.mimetype' })}:{' '}
              {mimetype}
            </p>
          </StyledTypographyParagraph>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'common.table.type' }),
      dataIndex: 'type',
    },
    {
      title: intl.formatMessage({ id: 'common.table.time' }),
      dataIndex: 'createdAt',
      render: (value) => formatTime(value, 'HH:mm A DD/MM/YYYY'),
    },
  ];

  const handleChangeTable = ({ current: page, pageSize: limit }) => {
    setSearch(removeFalsyKeys({ ...search, page, limit }));
  };

  return (
    <>
      <UserFilterSearchForm
        onSubmit={(values) => setSearch(values)}
        initialValues={search}
      />

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data?.items || []}
        loading={isLoading}
        pagination={{
          current: search?.page,
          pageSize: search?.limit,
          total: data?.total || 0,
        }}
        onChange={handleChangeTable}
      />
    </>
  );
};
