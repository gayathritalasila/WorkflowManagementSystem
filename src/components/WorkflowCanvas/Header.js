import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField, IconButton } from "@mui/material";
import SaveIcon from "../../../icons/SaveIcon";
import CloseIcon from "../../../icons/CloseIcon";

const Header = ({ onGoBack, onSave }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    onSave({ name, description });
    setOpen(false);
    setName("");
    setDescription("");
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      padding: "10px 20px",
      background: "white",
      borderRadius: "12px",
      border: "2px solid #E0E0E0",
      width: "fit-content",
      margin: "10px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      gap: "10px"
    }}>
      {/* Go Back Button */}
      <button onClick={onGoBack} style={{
        background: "transparent",
        border: "none",
        color: "black",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        textDecoration: "underline",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        fontFamily: "Poppins"
      }}>
        <span>←Go Back</span>
      </button>

      {/* Title */}
      <span style={{
        fontSize: "18px",
        fontWeight: "bold",
        color: "black",
        marginLeft: "10px",
        fontFamily: "Poppins"
      }}>
        {"Untitled"}
      </span>

      {/* Save Button */}
      <IconButton onClick={handleOpen} style={{ background: "transparent", padding: "5px", marginLeft: "auto" }}>
        <SaveIcon />
      </IconButton>

      {/* Save Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" PaperProps={{
        style: {
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          width: "600px",
          height: "483px"
        }
      }}>
        <DialogTitle style={{ fontSize: "20px", fontWeight: "bold", display: "flex", justifyContent: "space-between", alignItems: "center",fontFamily: "Poppins"}}>
          Save your workflow
          <IconButton onClick={handleClose} style={{ color: "#000" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <span style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight:"500" }}>Name</span>
          <TextField
            fullWidth
            placeholder="Name here"
            variant="outlined"
            margin="dense"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{ style: { borderRadius: "8px", fontFamily: "Poppins", height: "40px", width:"380px" } }}
          />
          <span style={{ fontFamily: "Poppins", marginTop: "10px", display: "block",fontSize: "14px", fontWeight:"500"  }}>Description</span>
          <TextField
            fullWidth
            placeholder="Write here.."
            variant="outlined"
            margin="dense"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputProps={{ style: { borderRadius: "8px", fontFamily: "Poppins", height: "100px" } }}
          />
        </DialogContent>
        <Divider style={{ margin: "10px 0" }} />
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "16px" }}>
          <button onClick={handleSave} style={{ backgroundColor: "#FF3B30", color: "white", fontWeight: "bold", borderRadius: "8px", padding: "10px 20px", border: "none", cursor: "pointer", fontFamily: "Poppins" }}>
            Save
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default Header;
