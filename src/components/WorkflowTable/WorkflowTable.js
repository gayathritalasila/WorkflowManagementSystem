import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Button, IconButton } from "@mui/material";
import { format } from "date-fns";
import ActivePinIcon from "../../../icons/ActivePinIcon";
import InactivePinIcon from "../../../icons/InactivePinIcon";
import MoreVertIcon from "../../../icons/MoreVertIcon";
import ExpandIcon from "../../../icons/ExpandIcon";
import CustomPagination from "../CustomPagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkflows } from "./workflowTable.actions";

const WorkflowTable = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const { workflows, status, error } = useSelector((state)=>state.workflows);

  const rowsPerPage = 8;
  const totalPages = 15;

  useEffect(()=>{
    if(status === "idle"){
      dispatch(fetchWorkflows());
    }
  }, [status, dispatch]);

  const columns = [
    {
      field: "name",
      headerName: "Workflow Name",
      flex: 1,
      renderCell: (params) => <span style={{ fontWeight: 500 }}>{params.value}</span>
    },
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      renderCell: (params) => params.value
    },
    { field: "lastEdited", 
      headerName: "Last Edited On", 
      flex: 1, 
      renderCell: (params) => {
        const { lastEditedBy, lastEditedAt } = params.row;
        if (!lastEditedBy || !lastEditedAt) return "N/A";
  
        const date = new Date(lastEditedAt);
        const formattedTime = format(date, "HH:mm 'IST' - dd/MM"); // "22:43 IST - 28/05"
  
        return `${lastEditedBy} | ${formattedTime}`;
      }, 
    },
    { field: "description", headerName: "Description", flex: 1.5 },
    {
      field: "pinned",
      headerName: "",
      width: 50,
      renderCell: (params) => (
        <IconButton size="small">
          {params.value ? <ActivePinIcon /> : <InactivePinIcon />}
        </IconButton>
      ),
    },
    {
      field: "execute",
      headerName: "",
      width: 100,
      renderCell: () => (
        <Button variant="outlined" size="small" sx={{ textTransform: "none", fontSize: "12px", fontWeight: 500 }}>
          Execute
        </Button>
      ),
    },
    {
      field: "edit",
      headerName: "",
      width: 85,
      renderCell: () => (
        <Button variant="outlined" size="small" sx={{ fontSize: "12px", fontWeight: 500 }}>
          Edit
        </Button>
      ),
    },
    {
      field: "options",
      headerName: "",
      width: 60,
      renderCell: () => (
        <IconButton size="small">
          <MoreVertIcon />
        </IconButton>
      ),
    },
    {
      field: "expand",
      headerName: "",
      width: 50,
      renderCell: () => (
        <IconButton size="small">
          <ExpandIcon />
        </IconButton>
      ),
    },
  ];

  // const rows = [
  //     { id: 494, name: "Workflow Name here...", lastEdited: "Zubin Khanna | 22:43 IST - 28/05", description: "Some Description Here Regarding The Flow...", pinned: true },
  //     { id: 495, name: "Workflow Name here...", lastEdited: "Zubin Khanna | 22:43 IST - 28/05", description: "Some Description Here Regarding The Flow...", pinned: false },
  //     { id: 496, name: "Workflow Name here...", lastEdited: "Zubin Khanna | 22:43 IST - 28/05", description: "Some Description Here Regarding The Flow...", pinned: false },
  //     { id: 497, name: "Workflow Name here...", lastEdited: "Zubin Khanna | 22:43 IST - 28/05", description: "Some Description Here Regarding The Flow...", pinned: false },
  //     { id: 498, name: "Workflow Name here...", lastEdited: "Zubin Khanna | 22:43 IST - 28/05", description: "Some Description Here Regarding The Flow...", pinned: false },
  //     { id: 499, name: "Workflow Name here...", lastEdited: "Zubin Khanna | 22:43 IST - 28/05", description: "Some Description Here Regarding The Flow...", pinned: false },
  //     { id: 500, name: "Workflow Name here...", lastEdited: "Zubin Khanna | 22:43 IST - 28/05", description: "Some Description Here Regarding The Flow...", pinned: false },
  //     { id: 501, name: "Workflow Name here...", lastEdited: "Zubin Khanna | 22:43 IST - 28/05", description: "Some Description Here Regarding The Flow...", pinned: false },
  //     { id: 502, name: "Workflow Name here...", lastEdited: "Zubin Khanna | 22:43 IST - 28/05", description: "Some Description Here Regarding The Flow...", pinned: false },
  //     { id: 503, name: "Workflow Name here...", lastEdited: "Zubin Khanna | 22:43 IST - 28/05", description: "Some Description Here Regarding The Flow...", pinned: false },

  // ];

  const rows = Array.from({ length: totalPages }, (_, i) => ({
    id: 494 + i,
    name: `Workflow Name ${i + 1}`,
    lastEdited: "Zubin Khanna | 22:43 IST - 28/05",
    description: "Some Description Here Regarding The Flow...",
    pinned: i % 2 === 0, // Alternate pinned values
  }));

  return (
    <Paper sx={{ height: "500px", width: "100%", padding: 2 }}>
      {status === "loading" && <p>Loading workflows...</p>}
      {error && <p>Error: {error}</p>}
      {status === "succeeded" && (
      <DataGrid
        rows={workflows}
        columns={columns}
        pageSize={rowsPerPage}
        page={page}
        paginationMode="server"
        rowCount={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
        autoHeight={false}
        pagination
        disableColumnMenu
        disableSelectionOnClick
        slots={{
          pagination: () => (
            <CustomPagination
              page={page + 1}
              count={Math.ceil(totalPages / rowsPerPage)}
              onPageChange={(val) => setPage(val - 1)}
            />
          ),
        }}
        sx={{
          border: "none",
          fontSize: "14px",
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "1px solid #F68B21",
            fontWeight: "bold",
            fontSize: "14px",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #F8F2E7",
            fontSize: "13px",
          },
          "& .MuiDataGrid-footerContainer": {
            justifyContent: "center",
            paddingTop: "10px",
          },
          "& .MuiDataGrid-iconSeparator": {
            display: "none",
          },
        }}
      />
      )}
    </Paper>
  );
};

export default WorkflowTable;
