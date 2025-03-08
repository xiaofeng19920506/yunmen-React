import { Avatar, Grid, Container } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { RootState } from "./redux/store/store";
import { stringAvatar } from "./utils/userUtil";
import { updateModalState } from "./redux/reducer/eventModal/eventModalSlice";
import EventModal from "./component/EventModal";
import { getEvents } from "./utils/Request/userEvent";
import {
  getAllEvents,
  logoutUser,
  Event,
} from "./redux/reducer/user/userSlice";
import DashboardCard from "./component/DashboardCard";

interface GetEventsResponse {
  events: Event[];
  joinedEvents: Event[];
}
const App = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { name, id, event } = useAppSelector((state: RootState) => state.user);
  const { open } = useAppSelector((state: RootState) => state.modal);

  const handleSignInClick = (): void => {
    navigate("/signin");
  };

  const handleSignUpClick = (): void => {
    navigate("/signup");
  };

  const openEventModal = (): void => {
    dispatch(updateModalState(true));
  };

  const handleLogOutClick = (): void => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const { events, joinedEvents }: GetEventsResponse = await getEvents();
      const combined: Event[] = events.concat(joinedEvents);
      const allEvents: Event[] = combined.filter(
        (event, index, self) =>
          index ===
          self.findIndex(
            (e: Event) => e._id.toString() === event._id.toString()
          )
      );
      dispatch(getAllEvents(allEvents));
    };
    if (id) {
      fetchEvents();
    }
  }, [id, dispatch]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Header with sign in/up or event actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "1rem",
          marginBottom: "20px",
        }}
      >
        {id === "" || id === undefined ? (
          <>
            <Button variant="contained" onClick={handleSignUpClick}>
              Sign Up
            </Button>
            <Button variant="contained" onClick={handleSignInClick}>
              Sign In
            </Button>
          </>
        ) : (
          <>
            <Button variant="contained" onClick={handleLogOutClick}>
              Log Out
            </Button>
            <Button variant="contained" onClick={openEventModal}>
              Add Event
            </Button>
            <Avatar {...stringAvatar(name)} />
          </>
        )}
      </div>

      {event?.length >= 1 ? (
        <Grid container spacing={3} justifyContent="center">
          {event.map(({ _id, eventTitle, eventContent }, index) => {
            return (
              <Grid
                item
                key={_id || `event-${index}`}
                xs={12}
                sm={6}
                md={4}
                lg={3}
              >
                <DashboardCard
                  id={_id}
                  title={eventTitle}
                  content={eventContent}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : id !== "" ? (
        <span style={{ textAlign: "center", marginTop: "20px" }}>
          There is no event going on
        </span>
      ) : (
        <span style={{ textAlign: "center", marginTop: "20px" }}>
          Please Sign in to see your events
        </span>
      )}

      {/* Event modal */}
      <EventModal
        onOpen={open}
        onClose={() => dispatch(updateModalState(false))}
      />
    </Container>
  );
};

export default App;
