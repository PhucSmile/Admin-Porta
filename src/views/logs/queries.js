import { userApi } from "api/userApi";
import { useMutation, useQuery } from "react-query";

export const useUsers = ({ params, options } = {}) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => userApi.getAll(params),
    ...options,
  });
};

export const useCreateUser = () => {
  return useMutation(userApi.create);
};
