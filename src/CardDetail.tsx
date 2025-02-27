import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
import { getOneEvent } from "./utils/Request/userEvent";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { RootState } from "./redux/store/store";
import { logoutUser, updateLocation } from "./redux/reducer/user/userSlice";

const CardDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string[]>([]);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  // For owner view (Accordion editing)
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState<string>("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // For non-owner: Selection state
  const [selectedStatus, setSelectedStatus] = useState<boolean[]>([]);

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state: RootState) => state.user.id);
  const location = useAppSelector((state: RootState) => state.user.location);
  const currentLocation = useLocation();

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
      dispatch(updateLocation(currentLocation.pathname));
      navigate("/signin");
    }
  }, [id, userId]);

  // Initialize the selection state array whenever content changes
  useEffect(() => {
    setSelectedStatus(Array(content.length).fill(false));
  }, [content]);

  // Owner handlers for Accordion view
  const handleAccordionChange = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleUpdateContent = async (index: number) => {
    const updatedContent = [...content];
    updatedContent[index] = editingContent;
    setContent(updatedContent);
    setEditingIndex(null);
  };

  const handleDeleteContent = async (index: number) => {
    const updatedContent = content.filter((_, i) => i !== index);
    setContent(updatedContent);
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else if (expandedIndex && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1);
    }
  };

  // Non-owner: Handle checkbox selection
  const handleCheckboxChange = (index: number) => {
    const newStatus = [...selectedStatus];
    newStatus[index] = !newStatus[index];
    setSelectedStatus(newStatus);
  };

  // Handle Submit Button
  const handleSubmit = () => {
    const selectedItems = content.filter((_, index) => selectedStatus[index]);

    if (selectedItems.length === 0) {
      alert("Please select at least one item.");
      return;
    }

    // Log selected items (Replace this with an API request if needed)
    console.log("Selected Items:", selectedItems);

    // Example: Sending selection data to an API
    // await submitSelectionToAPI({ userId, selectedItems });

    alert("Your selection has been submitted!");
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleBack = () => {
    navigate(location);
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
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        {isOwner ? (
          // Owner view with Accordions for editing/deleting event content
          content.map((item, index) => (
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
          ))
        ) : (
          // Non-owner view: display checkboxes for event content
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
            {/* Submit Button */}
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
