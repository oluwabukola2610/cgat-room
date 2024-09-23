import React, { useState, useEffect, useRef } from "react"
import { Box, Button, Typography, TextField } from "@mui/material"
import { Logout, Message, Send } from "@mui/icons-material"
import { RootState } from "../store"
import { LogOut } from "../../features/chatRoom.tsx/user"
import { useAppDispatch, useAppSelector } from "../hooks"

export interface MessageObject {
  userName: string
  message: string
  time: string
}

export const ChatRoom = () => {
  const dispatch = useAppDispatch()
  const userName = useAppSelector((state: RootState) => state.user.username)
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem("messages") as string)
  )
  const [message, setMessage] = useState("")
  const [displayedMessages, setDisplayedMessages] = useState<MessageObject[]>([]);

  const pageSize = 1; 
  const [page, setPage] = useState(1);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const sendMsg = () => {
    setMessages([...messages, { userName, message, time: Date() }])
    const msgs = JSON.parse(localStorage.getItem("messages") as string)
    msgs.push({ userName, message, time: Date() })
    localStorage.setItem("messages", JSON.stringify(msgs))
    setMessage("")
  }

  const loadMoreMessages = () => {
    const newPage = page + 1;
    setPage(newPage);
    const newMessages = messages.slice(-pageSize * newPage, -pageSize * (newPage - 1));
    setDisplayedMessages([...newMessages, ...displayedMessages]);
  };
  const handleScroll = () => {
    if (chatBoxRef.current) {
      if (chatBoxRef.current.scrollTop === 0 && page * pageSize < messages.length) {
        loadMoreMessages();
      }
    }
  };
  useEffect(() => {
    // Re-renders the component once local storage changes to get up to date messages
    window.addEventListener("storage", () => {
      setMessages(JSON.parse(localStorage.getItem("messages") as string))
    })
    setDisplayedMessages(
      messages.slice((page - 1) * pageSize, page * pageSize)
    )
  }, [messages, page])

  return (
    <Box className="chat-room">
      {/* ==== HEADER ==== */}
      <header className="chat-room_header">
        <Typography variant="h6">
          WebChats - Chat Room <Message />
        </Typography>
        <Button
          startIcon={<Logout />}
          variant="contained"
          color="error"
          onClick={() => {
            dispatch({ type: LogOut.type })
          }}
        >
          Sign Out
        </Button>
      </header>

      {/* ==== MESSAGES ==== */}
      <Box className="messages" ref={chatBoxRef} onScroll={handleScroll} style={{ overflowY: "auto" }}>        {messages &&
          messages.map((message: MessageObject) => {
            return (
              <div
                className={`message-box ${message.userName === userName && "user"}`}
                key={message.time}
              >
                <Typography>{message.message}</Typography>
                <div className="time">
                  <span style={{ display: "block" }}>@{message.userName}</span>
                  <span>{message.time}</span>
                </div>
              </div>
            )
          })}
      </Box>
      <div id="current"></div>

      {/* ==== SEND MESSAGE ==== */}
      <Box className="chat-room_sendMessage">
        <TextField
          placeholder="Enter Message"
          sx={{ width: "90%" }}
          multiline
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          startIcon={<Send />}
          sx={{ marginX: "3rem" }}
          variant={"contained"}
          onClick={sendMsg}
          href={"#current"}
          disabled={message === "" ? true : false}
        >
          send
        </Button>
      </Box>
    </Box>
  )
}
