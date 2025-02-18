import { useState } from "react";
import {
  Modal,
  TextField,
  Button,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
type EventModalProp = {
  onOpen: boolean;
  onClose: () => void;
};

const EventModal: React.FC<EventModalProp> = ({ onOpen, onClose }) => {
  const [title, setTitle] = useState<string>("");
  const [eventDate, setEventDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);

  const handleCreateEvent = () => {
    console.log("Event Created:", {
      title,
      eventDate: eventDate ? eventDate.format("YYYY-MM-DD") : null,
      startTime: startTime ? startTime.format("HH:mm") : null,
    });
    onClose();
  };

  return (
    <Modal open={onOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
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

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={2}>
            <DatePicker
              label="Event Date"
              value={eventDate}
              onChange={(newValue) => setEventDate(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />

            <TimePicker
              label="Start Time"
              value={startTime}
              onChange={(newValue) => setStartTime(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Stack>
        </LocalizationProvider>

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
