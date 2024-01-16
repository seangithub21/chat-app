import { JSX, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { Typography } from "@mui/material";

import { setMessages, setLoading } from "features/messages/messagesSlice";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { db } from "configs/firebase";

const ChatPage = (): JSX.Element => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { messages } = useAppSelector((state) => state.messages);

  // Subscribe to this chat's messages updates
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, `chats/${id}/messages`),
      (messagesSnapshot) => {
        dispatch(setLoading(true));
        let messages: any = {};
        messagesSnapshot.forEach((messageDoc) => {
          messages[messageDoc.id] = {
            ...messageDoc.data(),
            timestamp: messageDoc.data().timestamp?.toDate().toString(),
          };
        });
        dispatch(setMessages(messages));
      }
    );

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Typography variant="h4">Chat Page</Typography>
      {Object.keys(messages).length
        ? Object.keys(messages).map((messageId) => (
            <div key={messageId}>{messages[messageId].text}</div>
          ))
        : "No messages yet..."}
    </div>
  );
};

export default ChatPage;
