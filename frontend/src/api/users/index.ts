import axios from "axios";

const BACK_SERVER_URL = import.meta.env.VITE_BACK_SERVER_URL
const USERS_API_URL = `${BACK_SERVER_URL}/api/v1/users`


const users_api = {
  getUserByToken: async function () {
    const accessToken = localStorage.getItem("accessToken")
    const headers = { Authorization: `Bearer ${accessToken}` };
    const url = `${USERS_API_URL}`
    try {
      const response = await axios.get(url, { headers });
      return response.data.data as { userId: number, userName: string, userProfileImageUrl: string };
    } catch (error) {
      console.log(error)
    }
  },
  getUsernameById: async function (id: number) {
    const accessToken = localStorage.getItem("accessToken")
    const headers = { Authorization: `Bearer ${accessToken}` };
    const url = `${USERS_API_URL}/${id}`
    try {
      const response = await axios.get(url, { headers });
      return response.data.data as { userId: number, userName: string, userProfileImageUrl: string };
    } catch (error) {
      console.log(error)
    }
  }
}

export default users_api