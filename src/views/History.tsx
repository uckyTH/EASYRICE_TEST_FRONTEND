import {
  Box,
  Button,
  Card,
  Checkbox,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteForeverRounded";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import {
  deleteHistories,
  fetchAllHistories,
  fetchHistoryMatch,
} from "../lib/action/history.action";

const History = () => {
  const [loading, setLoading] = useState(false);
  const [histories, setHistories] = useState<HistoryTable[]>([]);
  const [filteredHistories, setFilteredHistories] = useState<HistoryTable[]>(
    []
  );

  const [searchId, setSearchId] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    loadHistoryData();
  }, []);

  const loadHistoryData = async () => {
    try {
      const data = await fetchAllHistories();
      setHistories(data);
      setFilteredHistories(data);
    } catch (error) {
      console.error("Failed to load history data:", error);
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedItems(
        filteredHistories.map((history) => history.inspectionID)
      );
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectOne = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (event.target.checked) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteHistories(selectedItems);
    } catch (error) {
      console.error("Failed to delete items:", error);
      setLoading(false);
    } finally {
      setTimeout(() => {
        setHistories((prev) =>
          prev.filter(
            (history) => !selectedItems.includes(history.inspectionID)
          )
        );
        setFilteredHistories((prev) =>
          prev.filter(
            (history) => !selectedItems.includes(history.inspectionID)
          )
        );

        setSelectedItems([]);
        setLoading(false);
      }, 500);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = async () => {
    if (searchId) {
      try {
        const data = await fetchHistoryMatch(searchId);
        if (data) {
          setFilteredHistories(data);
        } else {
          setFilteredHistories([]);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
        setFilteredHistories([]);
      }
    } else {
      setFilteredHistories(histories);
    }
  };

  const handleClearSearch = () => {
    setSearchId("");
    setFilteredHistories(histories);
  };

  return (
    <Stack direction={"column"} spacing={3} sx={{ height: "100%" }}>
      {/* Create Button */}
      <Box display={"flex"} justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={() => navigate(`/create-inspection`)}
        >
          Create Inspection
        </Button>
      </Box>

      {/* Search box */}
      <Card sx={{ p: 4 }}>
        <Stack direction={"row"} spacing={2} pb={2}>
          <TextField
            label="Search by Inspection ID"
            fullWidth
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </Stack>
        <Box display={"flex"} justifyContent={"space-between"}>
          {/* clear filter */}
          <Button variant="text" color="error" onClick={handleClearSearch}>
            Clear filter
          </Button>
          {/* Search button */}
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>
      </Card>

      {/* Delete Box */}
      {selectedItems.length > 0 && (
        <Stack direction="row" spacing={2} alignItems={"center"}>
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Delete
          </LoadingButton>
          <Typography>Select items: {selectedItems.length} item(s)</Typography>
        </Stack>
      )}

      {/* Table Inspection */}
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 500, height: 500, overflowY: "auto" }}>
          <Table sx={{ flex: 1 }} size="medium">
            <TableHead
              sx={{
                position: "sticky",
                top: 0,
                zIndex: 1,
                backgroundColor: "primary.main",
              }}
            >
              <TableRow hover>
                <TableCell
                  padding="checkbox"
                  sx={{
                    backgroundColor: "primary.main",
                    width: 50,
                    borderRight: "1px solid #e5e5e5",
                  }}
                >
                  {/* Checkbox for selecting rows */}
                  <Checkbox
                    sx={{
                      color: "white",
                      "&.Mui-checked": {
                        color: "white",
                      },
                    }}
                    checked={selectedItems.length === filteredHistories.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                {[
                  "Create Date - Time",
                  "Inspection ID",
                  "Name",
                  "Standard",
                  "Note",
                ].map((header) => (
                  <TableCell
                    key={header}
                    align="center"
                    sx={{
                      color: "white",
                      backgroundColor: "primary.main",
                      borderRight: "1px solid #e5e5e5",
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredHistories.length > 0 ? (
                filteredHistories
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((history) => (
                    <TableRow
                      hover
                      key={history.inspectionID}
                      onClick={() =>
                        navigate(`/result/${history.inspectionID}`)
                      }
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedItems.includes(history.inspectionID)}
                          onChange={(e) =>
                            handleSelectOne(e, history.inspectionID)
                          }
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableCell>
                      <TableCell align="center">
                        {new Date(history.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>{history.inspectionID}</TableCell>
                      <TableCell>{history.name}</TableCell>
                      <TableCell>{history.standardName}</TableCell>
                      <TableCell>{history.note}</TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          rowsPerPageOptions={[10, 20, 100]}
          count={filteredHistories.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Stack>
  );
};

export default History;
