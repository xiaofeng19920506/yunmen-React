import {
  Avatar,
  Grid,
  Container,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { RootState } from "./redux/store/store";
import { stringAvatar } from "./utils/userUtil";
import { updateModalState } from "./redux/reducer/eventModal/eventModalSlice";
import EventModal from "./component/EventModal";
import { getEvents } from "./utils/Request/userEvent";
import {
  Event,
  getAllEvents,
  logoutUser,
} from "./redux/reducer/user/userSlice";
import DashboardCard from "./component/DashboardCard";
import Loading from "./component/Loading";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { name, id, events } = useAppSelector((state: RootState) => state.user);
  const { open } = useAppSelector((state: RootState) => state.modal);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSignInClick = useCallback(() => navigate("/signin"), [navigate]);
  const handleSignUpClick = useCallback(() => navigate("/signup"), [navigate]);

  const openEventModal = useCallback(
    () => dispatch(updateModalState(true)),
    [dispatch]
  );

  const handleLogOutClick = useCallback(() => {
    dispatch(logoutUser());
    navigate("/");
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!id) return;

    const fetchEvents = async () => {
      setLoading(true);
      try {
        const events: Event[] = await getEvents();
        dispatch(getAllEvents(events));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [id, dispatch]);

  const renderAuthButtons = () => (
    <>
      <Button variant="contained" onClick={handleSignUpClick}>
        Sign Up
      </Button>
      <Button variant="contained" onClick={handleSignInClick}>
        Sign In
      </Button>
    </>
  );

  const renderUserSection = () => (
    <>
      <Button variant="contained" onClick={handleLogOutClick}>
        Log Out
      </Button>
      <Button variant="contained" onClick={openEventModal}>
        Add Event
      </Button>
      <Avatar {...stringAvatar(name || "Guest User")} />
    </>
  );

  const renderContent = () => {
    if (!id) {
      return (
        <Typography variant="h6" textAlign="center" mt={4}>
          Please sign in to view your events
        </Typography>
      );
    }
    if (events?.length === 0) {
      return (
        <Typography variant="h6" textAlign="center" mt={4}>
          There are currently no events
        </Typography>
      );
    }

    return (
      <Grid container spacing={3} justifyContent="center">
        {events?.length > 0 &&
          events.map((event) => (
            <Grid
              item
              key={event._id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              display="flex"
              justifyContent="center"
            >
              <DashboardCard
                id={event?._id || ""}
                title={event.eventTitle}
                content={event.eventContent}
              />
            </Grid>
          ))}
      </Grid>
    );
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            py: 4,
            px: { xs: 2, sm: 3 },
          }}
        >
          <Box display="flex" justifyContent="flex-end" gap={2} mb={4}>
            {id ? renderUserSection() : renderAuthButtons()}
          </Box>

          {renderContent()}

          <EventModal
            onOpen={open}
            onClose={() => dispatch(updateModalState(false))}
          />
        </Container>
      )}
    </>
  );
};

export default App;
