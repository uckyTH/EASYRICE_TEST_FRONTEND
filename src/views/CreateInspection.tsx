import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllStandard } from "../lib/action/standard.action";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { createInspection } from "../lib/action/history.action";
import { LoadingButton } from "@mui/lab";

const CreateInspection = () => {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [standards, setStandards] = useState<Standard[]>([]);

  const navigate = useNavigate();
  const [formData, setFormData] = useState<InspectionForm>({
    name: "",
    note: "",
    samplingDate: "",
    samplingPoint: [],
    price: 0,
    standardID: "",
    rawData: null,
  });
  const [errors, setErrors] = useState<Partial<InspectionFormError>>({});

  useEffect(() => {
    fetchStandards();
  }, []);
  const fetchStandards = async () => {
    setLoading(true);
    try {
      const data = await fetchAllStandard();
      setStandards(data);
    } catch (error) {
      console.error("Failed to fetch standards:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setErrors((prev) => ({ ...prev, rawData: "" }));
      setFormData((prev) => ({
        ...prev,
        rawData: file,
      }));
      setFileName(file.name);
    }
  };

  const handleChange = (
    field: keyof InspectionForm,
    value: string | number | Date
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSamplingPointChange = (samplingPoint: string) => {
    setFormData((prev) => ({
      ...prev,
      samplingPoint: prev.samplingPoint.includes(samplingPoint)
        ? prev.samplingPoint.filter((item) => item !== samplingPoint)
        : [...prev.samplingPoint, samplingPoint],
    }));
  };

  const validateForm = () => {
    let formErrors: Partial<InspectionFormError> = {};

    // Validate Name
    if (!formData.name) {
      formErrors.name = "Name is required";
    }
    if (!formData.standardID) {
      formErrors.standardID = "Standard is required";
    }
    if (formData.samplingPoint.length === 0) {
      formErrors.samplingPoint = "At least one sampling point must be selected";
    }
    const price = formData.price;

    if (isNaN(price) || price <= 0 || price > 100000) {
      formErrors.price = "Price must be between 0 and 100,000";
    }

    // Validate Date/Time of Sampling
    if (!formData.samplingDate) {
      formErrors.samplingDate = "Date/Time of Sampling is required";
    } else if (isNaN(new Date(formData.samplingDate).getTime())) {
      formErrors.samplingDate = "Invalid date/time format";
    }
    if (!formData.rawData) {
      formErrors.rawData = "File upload is required";
    }
    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleOnSubmit = async () => {
    setLoadingSubmit(true);
    if (!validateForm()) {
      setLoadingSubmit(false);
      return;
    }
    try {
      const res = await createInspection(formData);
      if (res && res.data) {
        navigate(`/result/${res.data.inspectionID}`);
      } else {
        alert("Failed to create inspection");
      }
      setLoadingSubmit(false);
    } catch (error) {
      console.error("Error during submission:", error);
      alert("An error occurred while submitting the form.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      p={3}
    >
      <Typography variant="h2" align="center">
        Create Inspection
      </Typography>
      <Stack
        component={Paper}
        direction={"column"}
        spacing={3}
        p={3}
        width="100%"
        maxWidth={600}
        alignSelf={"center"}
      >
        {/* Name Field */}
        <TextField
          label="Name"
          required
          fullWidth
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
        />

        {/* Standard */}
        <FormControl fullWidth error={!!errors.standardID}>
          <InputLabel id="standard-lebel">Standard</InputLabel>
          <Select
            labelId="standard-lebel"
            id="select-standard"
            value={formData.standardID}
            label="Standard"
            onChange={(e) =>
              handleChange("standardID", e.target.value as string)
            }
          >
            {loading ? (
              <MenuItem disabled>
                <CircularProgress size={24} />
              </MenuItem>
            ) : (
              standards.map((standard) => (
                <MenuItem key={standard.id} value={standard.id}>
                  {standard.name}
                </MenuItem>
              ))
            )}
          </Select>
          {errors.standardID && (
            <Typography color="error">{errors.standardID}</Typography>
          )}
        </FormControl>

        {/* Raw file */}
        <Box>
          <Button
            component="label"
            variant="contained"
            startIcon={""}
            fullWidth
            size="large"
          >
            Upload files
            <input
              type="file"
              accept=".json"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          {fileName && (
            <Typography variant="body2" align="right">
              {fileName}
            </Typography>
          )}
          {errors.rawData && (
            <Typography color="error" variant="body2">
              {errors.rawData}
            </Typography>
          )}
        </Box>

        {/* Note */}
        <TextField
          label="Note"
          fullWidth
          value={formData.note}
          onChange={(e) => handleChange("note", e.target.value)}
        />

        {/* Price */}
        <TextField
          label="Price"
          required
          fullWidth
          type="number"
          value={formData.price === 0 ? "" : formData.price}
          onChange={(e) => {
            const price = parseFloat(e.target.value);
            handleChange("price", !isNaN(price) ? price : 0);
          }}
          error={!!errors.price}
          helperText={errors.price}
        />

        {/* Sampling Point */}
        <Box>
          <Typography variant="body1">Sampling Point</Typography>
          <FormGroup row>
            {["Front End", "Back End", "Other"].map((point) => (
              <FormControlLabel
                key={point}
                control={
                  <Checkbox
                    checked={formData.samplingPoint.includes(point)}
                    onChange={() => handleSamplingPointChange(point)}
                  />
                }
                label={point}
              />
            ))}
          </FormGroup>
          {errors.samplingPoint && (
            <Typography color="error" variant="body2">
              {errors.samplingPoint}
            </Typography>
          )}
        </Box>

        {/* Date/Time of Sampling */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            ampm={false}
            slotProps={{
              actionBar: {
                actions: ["clear", "today", "cancel", "accept"],
              },
              textField: {
                error: !!errors.samplingDate,
                helperText: errors.samplingDate || "",
              },
            }}
            format={"DD/MM/YYYY HH:mm:ss"}
            views={["year", "day", "hours", "minutes", "seconds"]}
            value={formData.samplingDate ? dayjs(formData.samplingDate) : null}
            onChange={(value) => {
              if (!value) {
                handleChange("samplingDate", "");
              } else {
                handleChange("samplingDate", value.toISOString());
              }
            }}
          />
        </LocalizationProvider>

        <Box display={"flex"} justifyContent={"flex-end"}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate(`/`)}
          >
            Cancel
          </Button>
          {/* Submit Button */}
          <LoadingButton
            loading={loadingSubmit}
            variant="contained"
            color="primary"
            onClick={handleOnSubmit}
            sx={{ ml: 2 }}
          >
            Submit
          </LoadingButton>
        </Box>
      </Stack>
    </Box>
  );
};

export default CreateInspection;
