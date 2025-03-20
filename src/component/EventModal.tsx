import { useState } from "react";
import {
  Modal,
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { EventContent, addEvent } from "../redux/reducer/user/userSlice";
import { createEvent } from "../utils/Request/userEvent";
import { RootState } from "../redux/store/store";

type EventModalProp = {
  onOpen: boolean;
  onClose: () => void;
};

const EventModal: React.FC<EventModalProp> = ({ onOpen, onClose }) => {
  const [title, setTitle] = useState<string>("");
  const [events, setEvents] = useState<EventContent[]>([]);
  const { id } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const handleCreateEvent = async () => {
    const result = await createEvent({
      eventTitle: title,
      eventContent: events,
      owner: id,
    });
    dispatch(
      addEvent({
        _id: result.data.event._id || "",
        eventTitle: title,
        eventContent: events,
        owner: id,
      })
    );
    onClose();
  };

  const handleAddSchedule = () => {
    setEvents([...events, { content: "", joinedUser: [] }]);
  };

  const handleRemoveSchedule = (index: number) => {
    if (events.length > 1) {
      setEvents(events.filter((_, i) => i !== index));
    }
  };

  const handleEventChange = (index: number, newEventText: string) => {
    const newEvents = events.map((item, i) =>
      i === index
        ? { content: newEventText, joinedUser: item.joinedUser }
        : item
    );
    setEvents(newEvents);
  };

  return (
    <Modal open={onOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Create New Event
        </Typography>

        <TextField
          fullWidth
          label="Event Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Stack spacing={2}>
          {events.map((item, index) => (
            <Stack
              key={item._id || index}
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <TextField
                label="Event"
                type="text"
                value={item.content}
                onChange={(e) => handleEventChange(index, e.target.value)}
                fullWidth
              />
              {events.length > 1 && (
                <IconButton
                  onClick={() => handleRemoveSchedule(index)}
                  color="error"
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              )}
            </Stack>
          ))}
          <Button
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleAddSchedule}
          >
            Add Event
          </Button>
        </Stack>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateEvent}
          >
            Create Event
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EventModal;
