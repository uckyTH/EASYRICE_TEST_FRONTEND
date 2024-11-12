declare interface InspectionDetailsBoxProps {
  label: string;
  data: any;
}

declare type CompositionData = {
  _id: string;
  key: string;
  name: string;
  length: number;
  actual: number;
};

declare type DefectRiceData = {
  _id: string;
  name: string;
  actual: number;
};
declare type StandardData = {
  key: string;
  minLength: number;
  maxLength: number;
  shape: string[];
  name: string;
  conditionMin: "GE" | "LE" | "GT" | "LT";
  conditionMax: "GE" | "LE" | "GT" | "LT";
};

declare interface Standard {
  id: string;
  name: string;
  createDate: string;
  standardData: StandardData[];
}

declare type InspectionForm = {
  name: string;
  note: string;
  samplingDate: string;
  samplingPoint: string[];
  price: number;
  standardID: string;
  rawData: File | null;
};

declare type InspectionFormError = {
  name: string;
  note: string;
  samplingDate: string;
  samplingPoint: string;
  price: string;
  standardID: string;
  rawData: string;
};

declare interface InspectionResult {
  name: string;
  createDate: Date;
  createdAt: Date;
  updatedAt: Date;
  inspectionID: string;
  note: string;
  standardName: string;
  samplingDate: Date;
  samplingPoint: string[];
  price: number;
  imageLink: string;
  total_sample: number;
  standardID: string;
  standardData: StandardData[];
  compositionData: CompositionData[];
  defectRiceData: DefectRiceData[];
}

declare interface HistoryTable {
  createdAt: string;
  inspectionID: string;
  name: string;
  standardName: string;
  note: string;
}

declare interface InspectionImageBoxProps {
  imageLink: string;
}

declare interface CompositionDatasProps {
  key: string;
  name: string;
  length: string;
  actual: number;
  _id: string;
}

declare interface DefectRiceDatasProps {
  name: string;
  actual: number;
  _id: string;
}

declare interface CompositionAndDefectRiceProps {
  compositionData: CompositionData[];
  defectRiceData: DefectRiceData[];
}

declare interface resInspectionReult {
  message: string;
  data: InspectionResult;
}

declare type updateForm = {
  note: string;
  samplingDate: string;
  samplingPoint: string[];
  price: number;
};
