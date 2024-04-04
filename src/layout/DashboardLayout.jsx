import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Grid, Drawer } from 'antd';

import { ROLE } from 'constants/roles';
import { PATH_NAME } from 'constants/routes';
import {
  StyledLayout,
  StyledLayoutContentWrapper,
  StyledLayoutContent,
} from 'styles/overrides';
import {
  PieChartIcon,
  InboxIcon,
  LayoutIcon,
  PeopleIcon,
  LogIcon,
  SettingIcon,
} from 'assets/icons';
import { getCurrentUser } from 'store/slices/authSlice';
import { Sider } from './components/Sider';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const currentUser = useSelector(getCurrentUser);
  const screens = Grid.useBreakpoint();

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const MENU_ITEMS = [
    {
      url: PATH_NAME.DASHBOARD,
      key: 'dashboard',
      icon: <PieChartIcon />,
    },
    {
      url: PATH_NAME.ORDERS,
      key: 'orders',
      icon: <InboxIcon />,
    },
    {
      url: PATH_NAME.PRODUCTS,
      key: 'products',
      icon: <LayoutIcon />,
    },
    {
      url: PATH_NAME.CUSTOMERS,
      key: 'customers',
      icon: <PeopleIcon />,
    },
    ...(currentUser?.role === ROLE.SUPPER_ADMIN
      ? [
          {
            url: PATH_NAME.USERS,
            key: 'users',
            icon: <PeopleIcon />,
          },
        ]
      : []),
    {
      url: PATH_NAME.LOGS,
      key: 'logs',
      icon: <LogIcon />,
    },
    {
      url: PATH_NAME.SETTINGS,
      key: 'settings',
      icon: <SettingIcon />,
    },
  ];

  return (
    <>
      <StyledLayout>
        {screens.lg && <Sider collapsed={isCollapsed} items={MENU_ITEMS} />}

        <StyledLayoutContentWrapper collapsed={isCollapsed.toString()}>
          <Header onCollapse={handleToggleCollapse} />
          <StyledLayoutContent>
            <Outlet />
          </StyledLayoutContent>
          <Footer />
        </StyledLayoutContentWrapper>
      </StyledLayout>

      {!screens.lg && (
        <Drawer
          open={isCollapsed}
          closable={false}
          onClose={() => setIsCollapsed(false)}
          bodyStyle={{ padding: 0 }}
          contentWrapperStyle={{ width: 'auto' }}
          placement="left"
        >
          <Sider items={MENU_ITEMS} />
        </Drawer>
      )}
    </>
  );
}
