import { useMutation } from 'react-query';

import { authApi } from 'api/authApi';

export const useSignUp = () => {
  return useMutation(authApi.signUp);
};
