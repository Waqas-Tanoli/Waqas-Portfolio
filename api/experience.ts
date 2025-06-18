import axios from "axios";

export const getExperience = async () => {
  const response = await axios.get("http://localhost:5000/api/experience");
  //console.log(`Experience Data:`, response);
  return response.data;
};
