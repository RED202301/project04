import axios from "axios";
import { MessageGetType } from "../types/types";


const back_base_URL = `${import.meta.env.VITE_BACK_SERVER_URL}/api/v1`;
const messagesURL = `${back_base_URL}/messages`;
const usersURL = `${back_base_URL}/users`;


const getUser = async () => {
  try {
    const response = await axios({
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}`, },
      url: usersURL,
      method: `GET`,
    });
    return response.data.data as { userId: number, userName: string };
  } catch (error) {
    console.log(error)
  }
}

const getUserName = async (id: number) => {
  try {
    const response = await axios({
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}`, },
      url: `${usersURL}/${id}`,
      method: `GET`,
    });
    console.log(response.data.data)
    return response.data.data as string
  } catch (error) {
    console.log(error)
  }
}


interface CreateInfo {
  receiverId: number;
  top: number;
  left: number;
  rotate: number;
  zindex: number;
  type: number;

  content?: string;
  bgcolor?: number;
  sourceFile?: File;
  thumbnailFile?: File;
}


interface UpdateInfo {
  id: number;
  top: number;
  left: number;
  rotate: number;
  zindex: number;
}

const search = async ({ receiverId }) => {
  try {
    const response = await axios({
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}`, },
      params: { receiverId },
      url: `${messagesURL}/search`,
      method: `GET`,
    });
    return response.data.data as MessageGetType[];
  } catch (error) {
    console.log(error)
  }
}


const getAll = async () => {
  try {
    const response = await axios({
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}`, },
      url: `${messagesURL}`,
      method: `GET`,
    });
    return response.data.data as MessageGetType[];
  } catch (error) {
    console.log(error)
  }
}

const get = async (id: number) => {
  try {
    const response = await axios({
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}`, },
      url: `${messagesURL}/${id}`,
      method: `GET`,
    });

    return response.data.data;
  } catch (error) {
    console.log(error)
  }
}


const create = async (createInfo: CreateInfo) => {
  console.log(createInfo)
  try {
    const response = await axios({
      headers: { 'Content-Type': 'multipart/form-data', charset: 'utf-8', Authorization: `Bearer ${localStorage.getItem("accessToken")}`, },
      url: `${messagesURL}`,
      method: `POST`,
      data: createInfo
    });

    return response.data.data;
  } catch (error) {
    console.log(error)
  }
}

const update = async ({ id, ...updateInfo }: UpdateInfo) => {
  try {
    const response = await axios({
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}`, },
      url: `${messagesURL}/${id}`,
      method: `PUT`,
      data: updateInfo
    });

    return response.data.data;
  } catch (error) {
    console.log(error)
  }
}


const remove = async (id: number) => {
  try {
    const response = await axios({
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}`, },
      url: `${messagesURL}/${id}`,
      method: `DELETE`,
    });
    return response.data.data;
  } catch (error) {
    console.log(error)
  }
}

export default {
  getUser,
  getUserName,

  search,
  create,
  getAll,
  get,
  update,
  remove
};