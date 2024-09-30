import axios from "axios";
import {
  CreateUserPayload,
  LoginResponse,
  User,
  UserData,
} from "../types/auth";
import { makeApiCall } from "./make-api-call";

export async function loginUser(username: string, password: string) {
  return makeApiCall<LoginResponse>({
    url: "login",
    method: "POST",
    data: {
      username,
      password,
    },
  }).then(async (res) => {
    localStorage.setItem("auth-token", res.access);
    const data = await getUserData();
    localStorage.setItem("user-data", JSON.stringify(data));
    setTimeout(() => {
      window.location.reload();
    }, 200);
    return res;
  });
}

export async function getUserData() {
  return makeApiCall<UserData>({
    url: "user",
  });
}

export async function listUsers() {
  return makeApiCall<User[]>({
    method: "get",
    url: "list_users",
  });
}
export async function deleteUser(user_id: number) {
  return makeApiCall({
    method: "delete",
    url: `delete_user/${user_id}`,
  });
}

export async function createUser(payload: CreateUserPayload) {
  try {
    const res = await makeApiCall({
      url: "admin/create-user",
      method: "post",
      data: payload,
    });
    return res;
  } catch (e) {
    throw e;
  }
}
