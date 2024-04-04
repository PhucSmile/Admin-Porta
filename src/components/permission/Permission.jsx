/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { checkPermission } from './checkPermission';
import { getCurrentUser } from 'store/slices/authSlice';

export const Permission = (props) => {
  const {
    children,
    noAccess,
    entityOwnerId,
    roles = [],
    type = 'one-of',
    debug = false,
  } = props;
  const user = useSelector(getCurrentUser);
  const [hasAccess, setHasAccess] = useState();

  useEffect(() => {
    if (!user) {
      setHasAccess(false);
      return;
    }

    const doesHaveAccess = checkPermission(user, roles, {
      type,
      entityOwnerId,
      debug,
    });

    setHasAccess(doesHaveAccess);
  }, [entityOwnerId, roles, type, user]);

  const renderNoAccess = () => {
    if (typeof noAccess === 'function') {
      return noAccess({
        user,
        hasAccess,
      });
    }
    return noAccess;
  };

  if (hasAccess === undefined) {
    return <h3>Checking permission...</h3>;
  }

  return hasAccess ? children : renderNoAccess() || null;
};
