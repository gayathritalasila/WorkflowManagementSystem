import React from "react";
import {  MenuItem, Paper, TextField, Typography } from "@mui/material";

const httpMethods = ["GET", "POST", "PUT", "DELETE"];

const ApiCallConfig = ({ selectedNode, onUpdateNode }) => {
  if (!selectedNode) return null;

  const handleChange = (field, value) => {
    console.log("Field:", field);
    console.log("Value:", value);
    console.log("Updated Object:", { [field]: value });

    if (!onUpdateNode) {
        console.error("Error: onUpdateNode is not defined!");
        return;
    }

    onUpdateNode({
        ...selectedNode.data, 
        [field]: value,       
    });
};
  

  return (
    <div style={{ display: "flex",
        alignItems: "center",
        gap: 15,}}>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 60,
          height: 150,
          borderRadius: 3,
          backgroundColor: "white",
        }}>
        <Typography sx={{
            transform: "rotate(-90deg)",
            fontWeight: "bold",
            color: "red",
          }}>Configuration</Typography>
        </Paper>

        <Paper
        elevation={3}
        sx={{
          p: 3,
          width: 400,
          borderRadius: 3,
          border: "2px solid blue",
        }}
      >

        <TextField
          select
          label="Method"
          value={selectedNode.data.method}
          onChange={(e) => handleChange("method", e.target.value)}
          fullWidth
          size="small"
          sx={{marginTop: "10px",}}
        >
          {httpMethods.map((method) => (
            <MenuItem key={method} value={method}>{method}</MenuItem>
          ))}
        </TextField>

        <TextField
          label="URL"
          value={selectedNode.data.url}
          onChange={(e) => handleChange("url", e.target.value)}
          fullWidth
          size="small"
          sx={{marginTop: "10px",}}
        />

        <TextField
          label="Headers (JSON)"
          value={selectedNode.data.headers}
          onChange={(e) => handleChange("headers", e.target.value)}
          fullWidth
          size="small"
          sx={{marginTop: "10px",}}
          multiline
          minRows={2}
        />

        <TextField
          label="Body (JSON)"
          value={selectedNode.data.body}
          onChange={(e) => handleChange("body", e.target.value)}
          fullWidth
          size="small"
          sx={{marginTop: "10px",}}
          multiline
          minRows={2}
        />
        </Paper>
    </div>
  );
};

export default ApiCallConfig;
