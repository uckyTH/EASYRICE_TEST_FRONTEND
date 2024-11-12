import React from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const CompositionAndDefectRiceTables = ({
  compositionData,
  defectRiceData,
}: CompositionAndDefectRiceProps) => {
  return (
    <>
      {/* Composition Table */}
      <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Composition</Typography>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="composition table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  sx={{ backgroundColor: "gray.300", fontWeight: "bold" }}
                >
                  Name
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    backgroundColor: "gray.300",
                    width: "10%",
                    fontWeight: "bold",
                  }}
                >
                  Length
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    backgroundColor: "gray.300",
                    width: "15%",
                    fontWeight: "bold",
                  }}
                >
                  Actual (%)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {compositionData.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.length}</TableCell>
                  <TableCell align="right">{row.actual}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Defect Rice Table */}
      <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Defect Rice</Typography>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="defect rice table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ backgroundColor: "gray.300", fontWeight: "bold" }}
                >
                  Name
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ backgroundColor: "gray.300", fontWeight: "bold" }}
                >
                  Actual (%)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {defectRiceData.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.actual}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default CompositionAndDefectRiceTables;
