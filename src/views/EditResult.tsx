import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateInspectionById } from "../lib/action/history.action";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const EditResult = () => {
  const location = useLocation();
  const { note, price, samplingDate, samplingPoint } = location.state || {};
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<Partial<InspectionForm>>({
    note: note || "",
    price: price || 0,
    samplingDate: samplingDate || "",
    samplingPoint: samplingPoint || [],
  });

  //Set err
  const [errors, setErrors] = useState<Partial<InspectionFormError>>({});

  const validateForm = () => {
    let formErrors: Partial<InspectionFormError> = {};
    if (!formValues.samplingPoint || formValues.samplingPoint.length === 0) {
      formErrors.samplingPoint = "At least one sampling point must be selected";
    }
    const price = formValues.price;

    if (!price || isNaN(price) || price <= 0 || price > 100000) {
      formErrors.price = "Price must be between 0 and 100,000";
    }

    // Validate Date/Time of Sampling
    if (!formValues.samplingDate) {
      formErrors.samplingDate = "Date/Time of Sampling is required";
    } else if (isNaN(new Date(formValues.samplingDate).getTime())) {
      formErrors.samplingDate = "Invalid date/time format";
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  useEffect(() => {
    if (!location.state) {
      navigate(`/result/${id}`);
    }
  }, [id, location.state, navigate]);

  const handleChange = (
    field: keyof InspectionForm,
    value: string | number | Date
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    navigate(`/edit-result/${id}`);
  };
  const handleSubmit = async () => {
    if (!validateForm()) {
      //setLoadingSubmit(false);
      return;
    }
    if (id && validateForm()) {
      // Check if id is defined
      try {
       

        const updatedInspection = await updateInspectionById(id, formValues);
        if (updatedInspection) {
          navigate(`/result/${id}`);
        }
      } catch (error) {
        console.error("Failed to update inspection:", error);
      }
    } else {
      console.error("ID is undefined");
    }
  };

  const handleSamplingPointChange = (samplingPoint: string) => {
    setFormValues((prev) => ({
      ...prev,
      samplingPoint: (prev.samplingPoint || []).includes(samplingPoint)
        ? (prev.samplingPoint || []).filter((item) => item !== samplingPoint)
        : [...(prev.samplingPoint || []), samplingPoint],
    }));
  };
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      p={3}
    >
      <Typography variant="h3" align="center">
        Edit Inspection ID : {id}
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
        <TextField
          label={"Note"}
          name="note"
          value={formValues.note}
          onChange={(e) => handleChange("note", e.target.value)}
          fullWidth
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={formValues.price === 0 ? "" : formValues.price}
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
                    checked={(formValues.samplingPoint || []).includes(point)}
                    onChange={() => handleSamplingPointChange(point)}
                  />
                }
                label={point}
              />
            ))}
            {errors.samplingPoint && (
              <Typography color="error" variant="body2">
                {errors.samplingPoint}
              </Typography>
            )}
          </FormGroup>
        </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            ampm={false}
            format={"DD/MM/YYYY HH:mm:ss"}
            slotProps={{
              actionBar: {
                actions: ["clear", "today", "cancel", "accept"],
              },
              textField: {
                error: !!errors.samplingDate,
                helperText: errors.samplingDate || "",
              },
            }}
            views={["year", "day", "hours", "minutes", "seconds"]}
            value={
              formValues.samplingDate ? dayjs(formValues.samplingDate) : null
            }
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
          <Button variant="outlined" color="primary" onClick={handleCancel}>
            Cancle
          </Button>
          {/* Submit Button */}
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default EditResult;
