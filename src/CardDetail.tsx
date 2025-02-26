import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { getOneEvent } from "./utils/Request/userEvent";

const CardDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("Sample Card Title");
  const [content, setContent] = useState(
    "This is a sample content for the card. It can be longer if needed."
  );
  useEffect(() => {
    const fetchEvent = async (id: string) => {
      const event = await getOneEvent(id);
      console.log({ event });
    };
    if (id) {
      fetchEvent(id);
    }
  }, [id]);

  const handleUpdate = async () => {
    console.log("Update card:", id);
    // Handle saving the changes (e.g., API call to update the card in the database)
    setIsEditing(false); // Exit edit mode
  };

  const handleDeleteClick = () => {
    setOpenDialog(true); // Open confirmation dialog
  };

  const handleConfirmDelete = async () => {
    console.log("Deleting card:", id);
    setOpenDialog(false);
    navigate("/"); // Redirect to home or another page after deletion
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        {!isEditing ? (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(true)}
            >
              Edit Card
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteClick}
            >
              Delete Card
            </Button>
          </>
        ) : (
          <>
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Save Changes
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </>
        )}
      </Box>

      {/* Card Title & Content */}
      <Paper elevation={3} sx={{ padding: 3 }}>
        {!isEditing ? (
          <>
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {content}
            </Typography>
          </>
        ) : (
          <>
            <TextField
              fullWidth
              label="Card Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Card Content"
              variant="outlined"
              multiline
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </>
        )}
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this card?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CardDetail;
