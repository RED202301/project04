import axios from "axios";
import { Message_Position, Post_Req_Messages, Res_Message } from "./types";

const BACK_SERVER_URL = import.meta.env.VITE_BACK_SERVER_URL
const MESSAGES_API_URL = `${BACK_SERVER_URL}/api/v1/messages`

const messages_api = {
  search: async (receiverId: string) => {
    const accessToken = localStorage.getItem("accessToken")
    const headers = { Authorization: `Bearer ${accessToken}` };
    const params = { receiverId };
    const url = `${MESSAGES_API_URL}/search`
    try {
      const response = await axios.get(url, { headers, params })
      return response.data.data as Res_Message[]
    } catch (error) {
      // console.log(error)
      return []
    }
  },

  fetch: async () => {
    const accessToken = localStorage.getItem("accessToken")
    const headers = { Authorization: `Bearer ${accessToken}` };
    const url = `${MESSAGES_API_URL}`
    try {
      const response = await axios.get(url, { headers })
      return response.data.data as Res_Message[]
    } catch (error) {
      // console.log(error)
    }
  },

  create: async (new_message: Post_Req_Messages) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = { 'Content-Type': 'multipart/form-data', charset: 'utf-8', Authorization: `Bearer ${accessToken}` };
    const url = `${MESSAGES_API_URL}`
    try {
      const response = await axios.post(url, new_message, { headers })
      return response.data.data as Res_Message;
    } catch (error) {
      // console.log(error)
    }
  },

  update: async (id: number, updated_position: Message_Position) => {
    const accessToken = localStorage.getItem("accessToken")
    const headers = { Authorization: `Bearer ${accessToken}` };
    const url = `${MESSAGES_API_URL}/${id}`
    try {
      const response = await axios.put(url, updated_position, { headers })
      return response.data.data;
    } catch (error) {
      // console.log(error)
    }
  },

  remove: async (id: number) => {
    const accessToken = localStorage.getItem("accessToken")
    const headers = { Authorization: `Bearer ${accessToken}` };
    const url = `${MESSAGES_API_URL}/${id}`
    try {
      const response = await axios.delete(url, { headers })
      return response.data.data;
    } catch (error) {
      // console.log(error)
    }
  }
}

export default messages_api