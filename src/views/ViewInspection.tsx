import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import InspectionImageBox from "../components/InspectionImageBox";
import { InspectionDetailsBox } from "../components/InspectionDetailsBox";
import Grid from "@mui/material/Grid2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchHistoryById } from "../lib/action/history.action";
import { formatDateForDisplay, formattedPrice } from "../lib/utils";
import CompositionAndDefectRiceTables from "../components/CompositionAndDefectRiceTables";

const Inspection = () => {
  const { id } = useParams<{ id: string }>();
  const [inspect, setInspect] = useState<InspectionResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHistoryData = async () => {
      if (id) {
        const data = await fetchHistoryById(id);
        if (data) {
          setInspect(data);
        } else {
          setInspect([]);
        }
      }
    };

    loadHistoryData();
  }, [id]);
  if (!inspect) {
    return <Typography align="center">Loading...</Typography>;
  }

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      p={3}
    >
      <Typography variant="h3" align="center">
        Inspection
      </Typography>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        sx={{
          justifyContent: "center",
          alignItems: "start",
          flexWrap: "wrap",
        }}
        mt={3}
      >
        {/* Image box*/}
        <Box>
          <InspectionImageBox imageLink={inspect[0]?.imageLink || ""} />
          <Stack direction="row" spacing={1} justifyContent="right" mt={2}>
            <Button variant="outlined" onClick={() => navigate(`/`)}>
              Back
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() =>
                navigate(`/edit-result/${id}`, {
                  state: {
                    note: inspect[0]?.note,
                    price: inspect[0]?.price,
                    samplingDate: inspect[0]?.samplingDate,
                    samplingPoint: inspect[0]?.samplingPoint,
                  },
                })
              }
              sx={{ ml: 2 }}
            >
              Edit
            </Button>
          </Stack>
        </Box>

        {/* Inspecttion result box*/}
        <Stack
          component={Paper}
          elevation={0}
          spacing={2}
          p={2}
          width={"70%"}
          sx={{ backgroundColor: "gray.300" }}
        >
          {/* General details */}
          <Paper elevation={0} sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InspectionDetailsBox
                  label="Create Date - Time:"
                  data={
                    inspect[0]?.createdAt
                      ? formatDateForDisplay(inspect[0]?.createdAt)
                      : "-"
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InspectionDetailsBox
                  label="Inspection ID:"
                  data={inspect[0]?.inspectionID}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InspectionDetailsBox
                  label="Standard:"
                  data={inspect[0]?.standardName}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InspectionDetailsBox
                  label="Update Date - Time:"
                  data={
                    inspect[0]?.updatedAt
                      ? formatDateForDisplay(inspect[0]?.updatedAt)
                      : "-"
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InspectionDetailsBox
                  label="Total Sample:"
                  data={inspect[0]?.total_sample + " kernels"}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Optional details */}
          <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InspectionDetailsBox label="Note:" data={inspect[0]?.note} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InspectionDetailsBox label="Price:" data={formattedPrice(inspect[0]?.price)} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InspectionDetailsBox
                  label="Date/Time of Sampling:"
                  data={
                    inspect[0]?.samplingDate
                      ? formatDateForDisplay(inspect[0]?.samplingDate)
                      : "-"
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InspectionDetailsBox
                  label="Sampling Point:"
                  data={inspect[0]?.samplingPoint?.join(", ")}
                />
              </Grid>
            </Grid>
          </Paper>
          {/* Composition and Defect Ricetable details */}
          <CompositionAndDefectRiceTables
            compositionData={inspect[0]?.compositionData ?? []} // Fallback to an empty array if undefined
            defectRiceData={inspect[0]?.defectRiceData ?? []}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Inspection;
