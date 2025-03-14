import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useAppDispatch } from "../hooks/reduxHooks";
import { showPopUp, updateMessage } from "../redux/reducer/user/userSlice";
import { inviteUser } from "../utils/Request/userEvent";

interface InviteUserModalProps {
  open: boolean;
  onCancel: () => void;
  eventId: string;
}

const InviteUserModal: React.FC<InviteUserModalProps> = ({
  open,
  onCancel,
  eventId,
}) => {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const handleConfirm = async () => {
    try {
      if (eventId !== "") {
        await inviteUser(email, eventId);
        dispatch(updateMessage("User Invited"));
        dispatch(showPopUp(true));
        handleCancel();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    onCancel();
    setEmail("");
  };

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
      <DialogTitle>Invite User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="user-email"
          label="User Email"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ padding: "16px" }}>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleConfirm} color="primary" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InviteUserModal;
