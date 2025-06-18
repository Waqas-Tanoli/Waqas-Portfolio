import axios from "axios";

export const getEducation = async () => {
  const response = await axios.get("http://localhost:5000/api/education");
  return response.data;
};
