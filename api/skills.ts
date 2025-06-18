import axios from "axios";

export const getSkills = async () => {
  const response = await axios.get("http://localhost:5000/api/skills");
  console.log(`Skills Data: `, response);
  return response.data;
};
