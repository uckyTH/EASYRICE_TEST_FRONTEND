import { Box, Typography } from "@mui/material";

export const InspectionDetailsBox = ({
  label,
  data,
}: InspectionDetailsBoxProps) => {
  return (
    <Box>
      {/* Lebel */}
      <Typography variant="body1" color="gray.500">
        {label}
      </Typography>
      <Typography variant="body1">{data}</Typography>
    </Box>
  );
};
