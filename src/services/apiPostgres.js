import axios from "axios";
const serverUrl = "http://localhost:4000";
export default async function sendRequest(endpoint, method, data) {
  try {
    const response = await axios({
      method: method,
      url: `${serverUrl}${endpoint}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request error:", error);
    throw error;
  }
}
