import { Avatar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { RootState } from "./redux/store/store";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { stringAvatar } from "./utils/userUtil";
import { updateModalState } from "./redux/reducer/eventModal/eventModalSlice";
import EventModal from "./component/EventModal";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token, name } = useAppSelector((state: RootState) => state.user);
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
    //fetching user information and grab the avatar uri
    if (token) {
      
    }
  }, [token]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "2%" }}>
        <Button variant="contained" onClick={handleSignUpClick}>
          Sign Up
        </Button>
        {token === "" ? (
          <Button variant={"contained"} onClick={handleSignInClick}>
            Sign In
          </Button>
        ) : (
          <>
            <Button variant="contained" onClick={openEventModal}>
              Add Event
            </Button>
            <Avatar {...stringAvatar(name ? name : "Anonomous User")}></Avatar>
          </>
        )}
      </div>
      <div>

      </div>
      <EventModal
        onOpen={open}
        onClose={() => dispatch(updateModalState(false))}
      />
    </div>
  );
};

export default App;
