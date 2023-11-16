import axios from "axios";
import { Post_Req_SecretMessages, Res_SecretMessage } from "./types";

const BACK_SERVER_URL = import.meta.env.VITE_BACK_SERVER_URL
const SECRETMESSAGES_API_URL = `${BACK_SERVER_URL}/api/v1/secretMessages`

const secretMessages_api = {
  search: async (receiverId: string) => {
    const accessToken = localStorage.getItem("accessToken")
    const headers = { Authorization: `Bearer ${accessToken}` };
    const params = { receiverId };
    const url = `${SECRETMESSAGES_API_URL}/search`
    try {
      const response = await axios.get(url, { headers, params })
      return response.data.data as Res_SecretMessage[]
    } catch (error) {
      // console.log(error)
      return []
    }
  },

  fetch: async () => {
    const accessToken = localStorage.getItem("accessToken")
    const headers = { Authorization: `Bearer ${accessToken}` };
    const url = `${SECRETMESSAGES_API_URL}`
    try {
      const response = await axios.get(url, { headers })
      return response.data.data as Res_SecretMessage[]
    } catch (error) {
      // console.log(error)
    }
  },

  create: async (new_secretMessage: Post_Req_SecretMessages) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken)
    const headers = { 'Content-Type': 'multipart/form-data', charset: 'utf-8', Authorization: `Bearer ${accessToken}` };
    const url = `${SECRETMESSAGES_API_URL}`
    try {
      const response = await axios.post(url, new_secretMessage, { headers })
      return response.data.data as Res_SecretMessage;
    } catch (error) {
      // console.log(error)
    }
  },

  remove: async (id: number) => {
    const accessToken = localStorage.getItem("accessToken")
    const headers = { Authorization: `Bearer ${accessToken}` };
    const url = `${SECRETMESSAGES_API_URL}/${id}`
    try {
      const response = await axios.delete(url, { headers })
      return response.data.data;
    } catch (error) {
      // console.log(error)
    }
  }
}

export default secretMessages_api