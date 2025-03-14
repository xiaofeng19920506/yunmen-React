import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface PopUpMessageProps {
  message: string;
  open: boolean;
  onClose: () => void;
}

const PopUpMessage: React.FC<PopUpMessageProps> = ({
  message,
  open,
  onClose,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity="info" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default PopUpMessage;
