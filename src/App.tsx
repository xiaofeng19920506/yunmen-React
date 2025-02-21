import { Avatar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { RootState } from "./redux/store/store";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { stringAvatar } from "./utils/userUtil";
import { updateModalState } from "./redux/reducer/eventModal/eventModalSlice";
import EventModal from "./component/EventModal";
import { getEvents } from "./utils/Request/userEvent";
import { updateEvent } from "./redux/reducer/user/userSlice";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { name, id, event } = useAppSelector((state: RootState) => state.user);
  const { open } = useAppSelector((state: RootState) => state.modal);

  const handleSignInClick = () => {
    navigate("/signin");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const openEventModal = () => {
    dispatch(updateModalState(true));
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEvents();
      dispatch(updateEvent(events));
    };
    if (id) {
      fetchEvents();
    }
  }, [id]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "2%",
          padding: "10px",
        }}
      >
        <Button variant="contained" onClick={handleSignUpClick}>
          Sign Up
        </Button>
        {id === "" || id === undefined ? (
          <Button variant={"contained"} onClick={handleSignInClick}>
            Sign In
          </Button>
        ) : (
          <>
            <Button variant="contained" onClick={openEventModal}>
              Add Event
            </Button>
            <Avatar {...stringAvatar(name)}></Avatar>
          </>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flex: "1",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {event.length > 0 ? (
          <div></div>
        ) : id !== "" ? (
          <span>There is no event going on</span>
        ) : (
          <span>Please Sign in to see your events</span>
        )}
      </div>
      <EventModal
        onOpen={open}
        onClose={() => dispatch(updateModalState(false))}
      />
    </div>
  );
};

export default App;
