import React, { useEffect } from "react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { Typography } from "@mui/material";

import { setMessages } from "features/messages/messagesSlice";
import { setCurrentChatIdState } from "features/chats/chatsSlice";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { db } from "configs/firebase";
import { getCurrentChatId, getUserData } from "utils/localStorage";

import getStyles from "./styles";

const Messages = (): JSX.Element => {
  const { messages } = useAppSelector((state) => state.messages);
  const { currentChatId } = useAppSelector((state) => state.chats);
  const dispatch = useAppDispatch();
  const classes = getStyles();

  // Subscribe to current chat's messages updates
  useEffect(() => {
    const messagesQuery = query(
      collection(db, `chats/${currentChatId}/messages`),
      orderBy("timestamp", "desc"),
      limit(20),
    );

    const unsubscribe = onSnapshot(messagesQuery, (messagesQuerySnapshot) => {
      let messages: any = {};
      messagesQuerySnapshot.forEach((messageDoc) => {
        messages[messageDoc.id] = {
          ...messageDoc.data(),
          timestamp: messageDoc.data().timestamp?.toDate().toString(),
        };
      });
      dispatch(setMessages(messages));
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChatId]);

  //  Subscribe to current chat's ID
  useEffect(() => {
    const updateCurrentChatId = () => {
      const updatedChatId = getCurrentChatId();
      if (updatedChatId) {
        dispatch(setCurrentChatIdState(updatedChatId));
      }
    };

    if (getCurrentChatId()) {
      updateCurrentChatId();
    }

    window.addEventListener("storage", updateCurrentChatId);

    return () => window.removeEventListener("storage", updateCurrentChatId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {Object.keys(messages).length ? (
        <>
          {Object.keys(messages)
            .map((messageId) => (
              <div
                key={messageId}
                style={
                  messages[messageId].createdBy === getUserData().uid
                    ? classes.container
                    : {}
                }
              >
                <Typography>{messages[messageId].text}</Typography>
              </div>
            ))
            .reverse()}
        </>
      ) : (
        <div>No messages yet...</div>
      )}
    </>
  );
};

export default Messages;
