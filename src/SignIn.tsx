import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "./utils/Request/userAuth";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { updateUser } from "./redux/reducer/user/userSlice";
import Cookie from "js-cookie";
import { RootState } from "./redux/store/store";
const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { location } = useAppSelector((state: RootState) => state.user);
  const loginUser = async (email: string, password: string) => {
    try {
      const { user, token } = await login(email, password);
      dispatch(updateUser({ ...user, location }));
      Cookie.set("jwt", token, { expires: 1 });
      navigate(location);
    } catch (error) {
      console.error("login failed: ", error);
      throw error;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser(email, password);
  };

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        className="sign-in-container"
        style={{
          maxWidth: "400px",
          width: "100%",
          margin: "0 auto",
          padding: "1rem",
        }}
      >
        <h2>Sign In</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "95%",
                padding: "0.5rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "95%",
                padding: "0.5rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <Button type="submit" variant="contained">
            Sign In
          </Button>
          <span style={{ marginTop: "5%" }}>
            Don't have an account? please <Link to={"/signup"}>Sign up</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
