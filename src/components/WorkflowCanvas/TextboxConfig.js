import React from "react";
import { Paper, TextField, Typography } from "@mui/material";

const TextboxConfig = () => {
  return (
    <div style={{ display: "flex",
        alignItems: "center",
        gap: 15,}}
    >
      {/* Sidebar */}
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
        }}
      >
        <Typography
          sx={{
            transform: "rotate(-90deg)",
            fontWeight: "bold",
            color: "red",
          }}
        >
          Configuration
        </Typography>
      </Paper>

      {/* Main Card */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          width: 400,
          borderRadius: 3,
          border: "2px solid blue",
        }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          Message
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter..."
          variant="outlined"
          sx={{
            borderRadius: 2,
          }}
          multiline
          minRows={2}
          
        />
      </Paper>
    </div>
  );
};

export default TextboxConfig;
