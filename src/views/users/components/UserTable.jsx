import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Popconfirm } from 'antd';

import { capitalizeLetter } from 'utils/stringUtils';
import {
  calcCurrentPageWithNum,
  calcIndexByOrder,
  removeFalsyKeys,
} from 'utils/common';
import { useCustomSearchParams } from 'hooks/useCustomSearchParams';
import { StyledActions, StyledButton, StyledSpace } from 'styles/overrides';
import { Table } from 'components/table';
import { useUsers, useDeleteUser } from 'api/userApi';
import { UserFilterSearchForm } from './UserFilterSearchForm';
import { UserModal } from './UserModal';
import { Notification } from 'components/Notification';

export const UserTable = () => {
  const intl = useIntl();
  const [search, setSearch] = useCustomSearchParams();
  const { data, isLoading, refetch } = useUsers({ params: search });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const deleteUserMutation = useDeleteUser();

  const [selectedUser, setSelectedUser] = useState(null);

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
      dataIndex: 'id',
    },
    {
      title: intl.formatMessage({ id: 'views.users.table.username' }),
      dataIndex: 'fullName',
    },
    {
      title: intl.formatMessage({ id: 'views.users.table.email' }),
      dataIndex: 'email',
    },
    {
      title: intl.formatMessage({ id: 'views.users.table.phone' }),
      dataIndex: 'phone',
    },
    {
      title: intl.formatMessage({ id: 'views.users.table.role' }),
      dataIndex: 'role',
      render: (value) => capitalizeLetter(value),
    },
    {
      render: (record) => (
        <StyledSpace>
          <StyledButton onClick={() => handleEdit(record)}>
            {intl.formatMessage({ id: 'common.btn.edit' })}
          </StyledButton>

          <Popconfirm
            title={intl.formatMessage({ id: 'message.confirmDelete' })}
            onConfirm={() => handleDelete(record.id)}
          >
            <StyledButton danger>
              {intl.formatMessage({ id: 'common.btn.delete' })}
            </StyledButton>
          </Popconfirm>
        </StyledSpace>
      ),
    },
  ];

  const handleDelete = (userId) => {
    deleteUserMutation.mutate(userId, {
      onSuccess() {
        const calculatedPage = calcCurrentPageWithNum({
          page: search.page,
          limit: search.limit,
          total: data?.total,
        });

        if (calculatedPage !== search.page) {
          setSearch(
            removeFalsyKeys({
              ...search,
              page: calculatedPage,
            }),
          );
        } else {
          refetch();
        }
      },
      onError(error) {
        Notification(
          'error',
          error?.message || intl.formatMessage({ id: 'message.commonError' }),
        );
      },
    });
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsOpenModal(true);
  };

  const handleChangeTable = ({ current: page, pageSize: limit }) => {
    setSearch(removeFalsyKeys({ ...search, page, limit }));
  };

  return (
    <>
      <UserFilterSearchForm
        onSubmit={(values) => setSearch(values)}
        initialValues={search}
      />

      <StyledActions size={24}>
        <StyledButton
          size="large"
          type="primary"
          onClick={() => setIsOpenModal(true)}
        >
          {intl.formatMessage({ id: 'common.btn.addNew' })}
        </StyledButton>
      </StyledActions>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data?.items || []}
        loading={isLoading || deleteUserMutation.isLoading}
        pagination={{
          current: search?.page,
          pageSize: search?.limit,
          total: data?.total || 0,
        }}
        onChange={handleChangeTable}
      />

      <UserModal
        open={isOpenModal}
        onCancel={() => {
          setIsOpenModal(false);
          setSelectedUser(null);
        }}
        onSuccess={() => {
          setIsOpenModal(false);
          refetch();
          setSelectedUser(null);
        }}
        initialValues={selectedUser}
      />
    </>
  );
};
