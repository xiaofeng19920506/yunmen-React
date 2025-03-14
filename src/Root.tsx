import { Route, Routes } from "react-router-dom";
import App from "./App";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProtectedRoute from "./component/ProtectedRoute";
import CardDetail from "./CardDetail";
import PopUpMessage from "./component/PopupMessage";
import { useAppSelector, useAppDispatch } from "./hooks/reduxHooks";
import { RootState } from "./redux/store/store";
import { showPopUp, updateMessage } from "./redux/reducer/user/userSlice";

function Root() {
  const { popMessage, show } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(showPopUp(false));
    dispatch(updateMessage(""));
  };
  return (
    <>
      <PopUpMessage message={popMessage} open={show} onClose={handleClose} />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/cards/:id"
          element={
            <ProtectedRoute>
              <CardDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default Root;
