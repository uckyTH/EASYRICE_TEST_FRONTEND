import { Box, Paper } from "@mui/material";

const InspectionImageBox = ({ imageLink }: InspectionImageBoxProps) => {
  return (
    <Box>
      <Paper>
        <Box
          component="img"
          src={imageLink}
          alt="Inspection Image"
          width={300}
          height={500}
        />
      </Paper>
    </Box>
  );
};

export default InspectionImageBox;
