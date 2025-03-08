import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  deleteEvent,
  getOneEvent,
  updateEvent,
} from "./utils/Request/userEvent";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { RootState } from "./redux/store/store";
import { logoutUser } from "./redux/reducer/user/userSlice";

const CardDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string[]>([]);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  // Editing states
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState<string>("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Selection states (for non-owner)
  const [selectedStatus, setSelectedStatus] = useState<boolean[]>([]);

  const [newContent, setNewContent] = useState<string>("");

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state: RootState) => state.user.id);

  useEffect(() => {
    const fetchEvent = async (id: string) => {
      const { event } = await getOneEvent(id);
      setTitle(event.eventTitle);
      setContent(event.eventContent);
      setIsOwner(userId === event.owner);
    };

    if (id && userId !== "") {
      fetchEvent(id);
    } else {
      navigate("/signin", { state: { from: location } });
    }
  }, [id, userId, location, navigate]);

  useEffect(() => {
    setSelectedStatus(Array(content.length).fill(false));
  }, [content]);

  const handleAccordionChange = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleUpdateContent = async (index: number) => {
    if (!isOwner) return;
    const updatedContent = [...content];
    updatedContent[index] = editingContent;
    setContent(updatedContent);
    setEditingIndex(null);
    setExpandedIndex(null);
    if (id) {
      await updateEvent(id, {
        _id: id,
        eventTitle: title,
        eventContent: updatedContent,
      });
    }
  };

  const handleDeleteContent = async (index: number) => {
    const updatedContent = content.filter((_, i) => i !== index);
    setContent(updatedContent);
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else if (expandedIndex && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1);
    }

    if (id) {
      await updateEvent(id, {
        _id: id,
        eventTitle: title,
        eventContent: updatedContent,
      });
      setContent(updatedContent);
    }
  };

  const handleCheckboxChange = (index: number) => {
    const newStatus = [...selectedStatus];
    newStatus[index] = !newStatus[index];
    setSelectedStatus(newStatus);
  };

  const handleSubmit = () => {
    const selectedItems = content.filter((_, index) => selectedStatus[index]);

    if (selectedItems.length === 0) {
      alert("Please select at least one item.");
      return;
    }

    console.log("Selected Items:", selectedItems);
    alert("Your selection has been submitted!");
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleDeleteEvent = async () => {
    if (id) {
      await deleteEvent(id);
      navigate("/");
    }
  };

  const handleAddContent = async () => {
    const updatedContent = ["", ...content];
    setContent(updatedContent);
    setExpandedIndex(0);
    setEditingIndex(0);
    if (id) {
      await updateEvent(id, {
        _id: id,
        eventTitle: title,
        eventContent: updatedContent,
      });
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "1rem",
          marginBottom: "20px",
        }}
      >
        <Button variant="contained" onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" onClick={handleLogout}>
          Log Out
        </Button>
      </div>

      <Paper elevation={3} sx={{ padding: 3 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          <Button
            variant="outlined"
            color="error"
            size="small"
            sx={{
              height: "80%",
              padding: "4px 10px", // Reduce padding for a compact look
              minWidth: "auto", // Prevents unnecessary stretching
            }}
            onClick={handleDeleteEvent}
          >
            Delete
          </Button>
        </div>

        {isOwner ? (
          <>
            {/* Input field to add new content (Now on Top) */}
            <Box mb={2} display="flex" gap={2}>
              <TextField
                fullWidth
                variant="outlined"
                label="Add New Content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddContent}
              >
                Add
              </Button>
            </Box>

            {content.map((item, index) => (
              <Accordion
                key={index}
                expanded={expandedIndex === index}
                onChange={() => handleAccordionChange(index)}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">{item}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {editingIndex === index ? (
                    <Box>
                      <TextField
                        fullWidth
                        variant="outlined"
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                      />
                      <Box mt={1} display="flex" gap={1}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleUpdateContent(index)}
                        >
                          Save Changes
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => setEditingIndex(null)}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Box>
                      <Typography variant="body1">{item}</Typography>
                      <Box mt={1} display="flex" gap={1}>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => {
                            setEditingIndex(index);
                            setEditingContent(item);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteContent(index)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </>
        ) : (
          <>
            {content.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={selectedStatus[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                }
                label={item}
                sx={{ display: "block", mb: 1 }}
              />
            ))}
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={selectedStatus.every((status) => !status)}
              >
                Submit Selection
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default CardDetail;
