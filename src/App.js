import { ConfigProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';
import flatten from 'flat';
import moment from 'moment';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useSelector } from 'react-redux';

import THEME from 'config/themes';
import AppLocale from 'config/translations';
import { validateMessages } from 'constants/common';
import { ROLE } from 'constants/roles';
import { PATH_NAME } from 'constants/routes';
import GlobalStyle from 'styles/globalStyle';
import { PrivateRoute } from 'components';
import IndexLayout from './layout/IndexLayout';
import DashboardLayout from './layout/DashboardLayout';
import AuthLayout from './layout/AuthLayout';
import Login from './views/auth/Login';
import Homepage from './views/homepage/Homepage';
import Dashboard from './views/dashboard/Dashboard';
import Orders from './views/orders/Orders';
import ViewOrder from './views/orders/ViewOrder';
import Products from './views/products/Products';
import Customers from './views/customers/Customers';
import Users from './views/users/Users';
import Logs from './views/logs/Logs';
import Settings from './views/settings/Settings';
import { NotFound } from './components/layout/NotFound';
import ViewDashboard from 'views/dashboard/ViewDashboard';
import { Permission } from 'components/permission/Permission';
import Profile from 'views/profile/Profile';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  const locale = useSelector((state) => state.app.currentLocale);

  moment.locale(locale);

  return (
    <ConfigProvider
      locale={AppLocale[locale].antd}
      form={{ validateMessages: validateMessages[locale], requiredMark: false }}
      // componentSize="small"
    >
      <IntlProvider
        locale={locale}
        messages={flatten(AppLocale[locale].messages)}
      >
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={THEME}>
            <GlobalStyle />

            <Routes>
              <Route element={<IndexLayout />}>
                <Route path={PATH_NAME.CUSTOMER_ORDER} element={<Homepage />} />
                <Route path={PATH_NAME.PROFILE} element={<Profile />} />
              </Route>

              <Route element={<PrivateRoute />}>
                <Route path={PATH_NAME.ROOT} element={<DashboardLayout />}>
                  <Route
                    index
                    element={<Navigate to={PATH_NAME.DASHBOARD} />}
                  />

                  <Route path={PATH_NAME.DASHBOARD}>
                    <Route index element={<Dashboard />} />
                    <Route path="detail" element={<ViewDashboard />} />
                  </Route>

                  <Route path={PATH_NAME.ORDERS}>
                    <Route index element={<Orders />} />
                    <Route path=":id" element={<ViewOrder />} />
                  </Route>

                  <Route path={PATH_NAME.PRODUCTS}>
                    <Route index element={<Products />} />
                  </Route>

                  <Route path={PATH_NAME.CUSTOMERS}>
                    <Route index element={<Customers />} />
                  </Route>

                  <Route path={PATH_NAME.USERS}>
                    <Route
                      index
                      element={
                        <Permission
                          roles={[ROLE.SUPPER_ADMIN]}
                          noAccess={<NotFound />}
                        >
                          <Users />
                        </Permission>
                      }
                    />
                  </Route>

                  <Route path={PATH_NAME.LOGS}>
                    <Route index element={<Logs />} />
                  </Route>

                  <Route path={PATH_NAME.SETTINGS}>
                    <Route index element={<Settings />} />
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Route>
              </Route>

              <Route element={<AuthLayout />}>
                <Route path={PATH_NAME.LOGIN} element={<Login />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </ThemeProvider>

          <ReactQueryDevtools />
        </QueryClientProvider>
      </IntlProvider>
    </ConfigProvider>
  );
}

export default App;
