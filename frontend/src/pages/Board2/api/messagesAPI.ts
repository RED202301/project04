import axios from "axios";
import { StickyNoteInfo } from "../types/types";

const baseURL = "http://localhost:8080/api/v1";
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
      headers: { 'Content-Type': 'multipart/form-data', charset: 'utf-8', Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMTAxNDY1NjkyIiwicm9sZSI6IlJPTEVfVVNFUiIsInVzZXJOYW1lIjoi7ZmN7KCV7ZiEIiwiZXhwIjoxNzE2Mzg2MDY3fQ.fT5olploCo1ewPAUsOFolnRey7VfPNzxhPt7qQKuqhM", },
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