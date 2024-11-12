import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000/api";

export const fetchAllStandard = async (): Promise<Standard[]> => {
  const response = await axios.get<Standard[]>("/standard");
  return response.data;
};
