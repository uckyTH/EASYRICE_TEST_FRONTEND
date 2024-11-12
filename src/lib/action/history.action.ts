import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000/api";

export const fetchAllHistories = async (): Promise<HistoryTable[]> => {
  const response = await axios.get<HistoryTable[]>("/history");
  return response.data;
};

export const fetchHistoryMatch = async (
  inspectionID: string
): Promise<HistoryTable[] | null> => {
  try {
    const response = await axios.get<HistoryTable[]>(
      `/history/${inspectionID}`
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch history by ID:", error);
    return null;
  }
};

export const deleteHistories = async (ids: string[]): Promise<void> => {
  await axios.delete("/history/", { data: { ids: ids } });
};

export const fetchHistoryById = async (
  inspectionID: string
): Promise<InspectionResult[] | null> => {
  try {
    const response = await axios.get<InspectionResult[]>(
      `/history/${inspectionID}`
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch history by ID:", error);
    return null;
  }
};

export const createInspection = async (
  formData: InspectionForm
): Promise<resInspectionReult | null> => {
  try {
    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("note", formData.note || "");
    formPayload.append("price", String(formData.price));
    formPayload.append("samplingDate", formData.samplingDate);
    formData.samplingPoint.forEach((point) =>
      formPayload.append("samplingPoint", point)
    );

    formPayload.append("standardID", formData.standardID);

    if (formData.rawData) {
      formPayload.append("rawData", formData.rawData); // Add file if present
    }

    console.log("Form data submitted:", formPayload);
    const response = await axios.post<resInspectionReult>(
      `/history/`,
      formPayload
    );

    return response.data;
  } catch (error) {
    console.error("Failed to create inspection:", error);
    return null;
  }
};

export const updateInspectionById = async (
  id: string ,
  data: Partial<updateForm>
) => {
  try {
    console.log(data);
    
    const response = await axios.put(`/history/${id}`, data);
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error("Failed to update inspection:", error);
    throw error;
  }
};
