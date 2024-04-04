import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { STORAGE_KEY } from 'constants/common';
import { PATH_NAME } from 'constants/routes';
import { doCheckAuth } from 'store/slices/authSlice';
import { Loading } from 'components/loading';

export default function PrivateRoute() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const accessToken = localStorage.getItem(STORAGE_KEY.TOKEN);

  useEffect(() => {
    if (accessToken && !isLoggedIn) {
      (async () => {
        try {
          const result = await dispatch(
            doCheckAuth({ accessToken: accessToken }),
          );
          unwrapResult(result);
        } catch (error) {
          localStorage.removeItem(STORAGE_KEY.TOKEN);
        }
        setIsCheckingStatus(false);
      })();
    } else {
      setIsCheckingStatus(false);
    }
  }, [dispatch, accessToken, isLoggedIn]);

  if (isCheckingStatus) {
    return <Loading />;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to={PATH_NAME.LOGIN} />;
}
