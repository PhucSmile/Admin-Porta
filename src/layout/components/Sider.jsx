/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { getCurrentUser } from 'store/slices/authSlice';
import { StyledSider, StyledSiderUserInfo } from 'styles/overrides';
import { UserInfo } from 'components/user/UserInfo';

import { SiderMenu } from './SiderMenu';
import {
  findMatchedMenuItemByPathname,
  findRelatedMatchedMenuItemByPathname,
  findRelatedMenuItemsByMatchedMenuItem,
} from '../utils/handleMenuItems';
import { setBreadcrumbs } from 'store/slices/layoutSlice';

export const Sider = ({ collapsed = false, items = [] }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentUser = useSelector(getCurrentUser);
  const [selectedKeys, setSelectedKeys] = useState([]);

  const normalizeMenuItem = useCallback((item) => {
    item.text = item.label;

    if (item.url) {
      item.label = <Link to={item.url}>{item.label}</Link>;
    }

    return item;
  }, []);

  const normalizeMenuItems = useCallback((items = []) => {
    return items.map((item) => {
      const newItem = normalizeMenuItem(item);

      return newItem;
    });
  }, []);

  const menuItems = useMemo(() =>
    normalizeMenuItems(
      items.map((item) => ({
        ...item,
        label: intl.formatMessage({ id: `layout.sider.${item.key}` }),
      })),
    ),
  );

  useEffect(() => {
    let matchedMenuItem = findMatchedMenuItemByPathname(
      menuItems,
      location.pathname,
    );

    if (!matchedMenuItem) {
      matchedMenuItem = findRelatedMatchedMenuItemByPathname(
        menuItems,
        location.pathname,
      );
    }

    if (!matchedMenuItem) {
      return;
    }

    const matchedMenuItems = findRelatedMenuItemsByMatchedMenuItem(
      matchedMenuItem,
      menuItems,
    );

    const layoutData = matchedMenuItems.reduce(
      (obj, curr) => {
        obj.selectedKeys.push(curr.key);
        obj.breadcrumbs.push({
          key: curr.key,
          label: curr.text ?? curr.label,
          url: curr.url,
        });

        return obj;
      },
      { selectedKeys: [], breadcrumbs: [] },
    );

    dispatch(setBreadcrumbs(layoutData.breadcrumbs));

    setSelectedKeys(layoutData.selectedKeys);
  }, [location.pathname]);

  return (
    <StyledSider trigger={null} collapsible collapsed={collapsed}>
      <StyledSiderUserInfo>
        <UserInfo
          isVertical
          fullName={currentUser.fullName}
          role={currentUser.role}
          isCollapsed={collapsed}
        />
      </StyledSiderUserInfo>

      <SiderMenu items={menuItems} selectedKeys={selectedKeys} />
    </StyledSider>
  );
};
