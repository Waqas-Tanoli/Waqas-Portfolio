import axios from "axios";

export const getProfile = async () => {
  const response = await axios.get("http://localhost:5000/api/profile");
  console.log(`Profile Data:`, response);
  return response.data;
};
