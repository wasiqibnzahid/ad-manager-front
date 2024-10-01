import {
  createUser,
  deleteUser,
  getUserData,
  listUsers,
  loginUser,
  updateUser,
} from "../services/auth-api";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { CreateUserPayload, User, UserData } from "../types/auth";

export const authKeys = {
  user: ["user"],
  users: ["user", "users"],
};
export const useAuth = () => {
  const { data } = useQuery({
    queryKey: authKeys.user,
    queryFn: async () => {
      const userData: UserData = await getUserData().catch((e) => null);
      console.log("ZE RES IS ", userData);
      if (userData) {
        localStorage.setItem("user-data", JSON.stringify(userData));
        return userData;
      }
      return null;
    },
  });

  const prevData: UserData = localStorage.getItem("user-data")
    ? JSON.parse(localStorage.getItem("user-data"))
    : null;
  return {
    isLoggedIn: !!(data || prevData),
    userData: data || prevData,
  };
};
export const useLogin = () => {
  const queryClient = new QueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: (param: { username: string; password: string }) =>
      loginUser(param.username, param.password),
    onSettled: () => {
      localStorage.removeItem("user-data");
      queryClient.invalidateQueries({ queryKey: authKeys.user });
    },
  });

  return {
    login: mutateAsync,
  };
};

export const useLogout = () => {
  const queryClient = new QueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      localStorage.removeItem("user-data");
      localStorage.removeItem("auth-token");
      window.location.reload();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.user });
    },
  });

  return {
    logout: mutateAsync,
  };
};

export const useUsers = () => {
  const { data, isFetching } = useQuery({
    queryKey: authKeys.users,
    queryFn: () => listUsers(),
  });

  return {
    users: data || [],
    isLoadingUsers: isFetching,
  };
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (user_id: number) => {
      return deleteUser(user_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authKeys.users,
      });
    },
  });
  return {
    deleteUser: mutateAsync,
    isDeletingUser: isPending,
  };
};

export const useCreateUser = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: CreateUserPayload) => {
      return createUser(payload);
    },
  });
  return {
    createUser: mutateAsync,
    isCreatingUser: isPending,
  };
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (user: User & { password?: string }) => {
      return updateUser(user);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: authKeys.users,
      });
    },
  });
  return {
    isUpdatingUser: isPending,
    updateUser: mutateAsync,
  };
};
