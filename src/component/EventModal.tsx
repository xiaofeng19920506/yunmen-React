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
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

type Schedule = {
  date: Dayjs | null;
  time: Dayjs | null;
};

type EventModalProp = {
  onOpen: boolean;
  onClose: () => void;
};

const EventModal: React.FC<EventModalProp> = ({ onOpen, onClose }) => {
  const [title, setTitle] = useState<string>("");
  const [schedules, setSchedules] = useState<Schedule[]>([
    { date: null, time: null },
  ]);

  const handleCreateEvent = () => {
    const formattedSchedules = schedules.map((schedule) => ({
      date: schedule.date ? schedule.date.format("YYYY-MM-DD") : null,
      time: schedule.time ? schedule.time.format("HH:mm") : null,
    }));
    console.log("Event Created:", {
      title,
      schedules: formattedSchedules,
    });
    onClose();
  };

  const handleAddSchedule = () => {
    setSchedules([...schedules, { date: null, time: null }]);
  };

  const handleRemoveSchedule = (index: number) => {
    if (schedules.length > 1) {
      setSchedules(schedules.filter((_, i) => i !== index));
    }
  };

  const handleDateChange = (index: number, newDate: Dayjs | null) => {
    const newSchedules = schedules.map((schedule, i) =>
      i === index ? { ...schedule, date: newDate } : schedule
    );
    setSchedules(newSchedules);
  };

  const handleTimeChange = (index: number, newTime: Dayjs | null) => {
    const newSchedules = schedules.map((schedule, i) =>
      i === index ? { ...schedule, time: newTime } : schedule
    );
    setSchedules(newSchedules);
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

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={2}>
            {schedules.map((schedule, index) => (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <DatePicker
                  label="Event Date"
                  value={schedule.date}
                  onChange={(newValue) => handleDateChange(index, newValue)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
                <TimePicker
                  label="Start Time"
                  value={schedule.time}
                  onChange={(newValue) => handleTimeChange(index, newValue)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
                {schedules.length > 1 && (
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
              Add Date &amp; Time
            </Button>
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
