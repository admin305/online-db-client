import React, { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from 'hooks/redux';
import theme from 'theme';

import styled from 'styled-components';

import Table from 'components/Table';
import Button from 'components/Button';
import Typography from 'components/Typography';
import Pagination from 'components/Pagination';

import { adminApi } from '../services/AdminApi';
import Spacer from 'components/Spacer';
import Dropdown from 'components/Dropdown';

enum ColumnTitles {
  id = 'id',
  login = 'Логин',
  email = 'Почта',
  name = 'Имя',
  sername = 'Фамилия',
  createdAt = 'Дата регистрации',
  role = 'Права',
  action = 'Действие',
}

const ACTION_KEY = 'action';
const ROLE_KEY = 'role';

const ITEMS_PER_PAGE = 5;

const Admin: React.FC = () => {
  const [getAllUser] = adminApi.useGetAllUserMutation();
  const [deleteUser] = adminApi.useDeleteUserMutation();
  const [getAllRoles] = adminApi.useGetAllRolesMutation();
  const [setUserRole] = adminApi.useSetUserRoleMutation();

  const users = useAppSelector((state) => state.userReducer.users);
  const roles = useAppSelector((state) => state.userReducer.roles);

  const [currentPage, setCurrentPage] = useState(0);

  const columns = useMemo(() => {
    if (users[0]) {
      const userColumns = users.map((item) => ({
        id: item.id,
        login: item.login,
        email: item.email,
        name: item.name,
        sername: item.sername,
        role: item.roles[0].description,
        createdAt: item.createdAt,
        action: ColumnTitles.action,
      }));
      const keys = Object.keys(userColumns[0]);

      return keys.map((key) => ({
        title: ColumnTitles[key as keyof typeof ColumnTitles],
        key,
        render: (value: string, id: number) => {
          if (key === ACTION_KEY) {
            return (
              <SButtonContainer>
                <Button
                  backgroundColor={theme.colors.red}
                  hoverBackground={theme.colors.red}
                  onClick={() => deleteUser({ id })}>
                  <Typography fontWeight={600} color={theme.colors.white}>
                    Удалить
                  </Typography>
                </Button>
              </SButtonContainer>
            );
          }

          if (key === ROLE_KEY) {
            return (
              <Dropdown
                options={roles.map((item) => ({
                  name: item.description,
                }))}
                onChange={(event) => {
                  console.log(event.target.value);
                  setUserRole({ value: event.target.value, userId: id });
                }}
                withoutBorder
                defaultValue={value}
              />
            );
          }

          return value;
        },
      }));
    }

    return [];
  }, [users, roles, deleteUser, setUserRole]);

  const paginationData = useMemo(
    () =>
      users.slice(
        ITEMS_PER_PAGE * currentPage,
        Math.min(ITEMS_PER_PAGE * (currentPage + 1), users.length),
      ),
    [users, currentPage],
  );

  useEffect(() => {
    getAllUser();
    getAllRoles();
  }, []);

  return (
    <SAdmin>
      <STableContainer>
        <Spacer height={20} />
        <Table
          onClick={(item) => console.log(item)}
          data={paginationData.map((item) => ({
            id: item.id,
            login: item.login,
            email: item.email,
            name: item.name,
            sername: item.sername,
            role: item.roles[0].description,
            banned: item.banned ? 'Да' : 'Нет',
            createdAt: item.createdAt.split('T')[0],
          }))}
          columns={columns}
        />

        <Spacer height={20} />
{/* 
        <Pagination
          itemsPerPage={ITEMS_PER_PAGE}
          totalItemsCount={users.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        /> */}
      </STableContainer>
    </SAdmin>
  );
};

const SAdmin = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  width: 100%;
  height: 100%;
  background: ${theme.colors.backgroundLightBlueColor};
`;

const SButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 40px;
`;

const STableContainer = styled.div`
  width: 70%;
`;

export default Admin;
