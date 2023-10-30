import axios from "axios";
import { StickyNoteInfo } from "../types/types";

const baseURL = "http://k9e206.p.ssafy.io/api/v1";
const msgURL = `${baseURL}/messages`;



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


const getAll = async () => {
  try {
    const response = await axios({
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}`, },
      url: `${msgURL}`,
      method: `GET`,
    });

    return response.data.data as StickyNoteInfo[];
  } catch (error) {
    console.log(error)
  }
}

const get = async (id: number) => {
  try {
    const response = await axios({
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}`, },
      url: `${msgURL}/${id}`,
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
      url: `${msgURL}`,
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
      url: `${msgURL}/${id}`,
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
      url: `${msgURL}/${id}`,
      method: `DELETE`,
    });
    return response.data.data;
  } catch (error) {
    console.log(error)
  }
}


export default {
  create,
  getAll,
  get,
  update,
  remove
};