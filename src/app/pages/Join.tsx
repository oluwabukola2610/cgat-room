import React, { useState, FormEvent } from "react";
import { Button, TextField, Box, Typography, Container } from "@mui/material";
import { Login } from "@mui/icons-material";
import { Join as JoinChat } from "../../features/chatRoom.tsx/user";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import Svg from "../Svg";

export const Join = () => {
  const [username, setUsername] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (username.trim()) {
      dispatch(JoinChat({ username: username.toLowerCase() }));
      navigate("/chat-room");
    }
  };

  return (
    <Container>
      <Box sx={{ marginTop: 20 }}>
        <Typography variant="h4" color={"#2E294E"}>
          Join The Chat Room
        </Typography>
        <Typography variant="button">
          If it is your first time, you'll be added to the chat room.
        </Typography>

        <form style={{ marginTop: "2.5rem" }} onSubmit={onSubmit}>
          <TextField
            placeholder="Enter username"
            focused
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div style={{ marginTop: "0.7rem" }}>
            <Button startIcon={<Login />} variant="contained" type="submit">
              Join
            </Button>
          </div>
        </form>
      </Box>

      <div className="side">
      <Svg />
      </div>
    </Container>
  );
};
