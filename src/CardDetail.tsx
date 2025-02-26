import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getOneEvent } from "./utils/Request/userEvent";
import { useAppSelector } from "./hooks/reduxHooks";
import { RootState } from "./redux/store/store";

const CardDetail: React.FC = () => {
  const { id } = useParams();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string[]>([]);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState<string>("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const userId = useAppSelector((state: RootState) => state.user.id);

  useEffect(() => {
    const fetchEvent = async (id: string) => {
      const { event } = await getOneEvent(id);
      setTitle(event.eventTitle);
      setContent(event.eventContent);
      setIsOwner(userId === event.owner);
    };
    if (id) {
      fetchEvent(id);
    }
  }, [id, userId]);

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

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
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
                  {isOwner && (
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
                  )}
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </Container>
  );
};

export default CardDetail;
