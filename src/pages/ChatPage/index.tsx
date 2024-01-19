import { JSX, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { Field, FieldProps, Formik, FormikValues } from "formik";
import { IconButton, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import {
  setMessages,
  setLoading,
  sendMessage,
} from "features/messages/messagesSlice";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { db } from "configs/firebase";
import Input from "components/common/Input";

const ChatPage = (): JSX.Element => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { messages } = useAppSelector((state) => state.messages);

  // Subscribe to current chat's messages updates
  useEffect(() => {
    const messagesQuery = query(
      collection(db, `chats/${id}/messages`),
      orderBy("timestamp", "desc"),
      limit(20)
    );

    const unsubscribe = onSnapshot(messagesQuery, (messagesQuerySnapshot) => {
      dispatch(setLoading(true));
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
  }, []);

  const handleSubmitMessage = (data: FormikValues, { resetForm }: any) => {
    dispatch(sendMessage({ data, chatId: id, resetForm }));
  };

  return (
    <div>
      <Typography variant="h4">Chat Page</Typography>
      {Object.keys(messages).length ? (
        <div>
          {Object.keys(messages)
            .map((messageId) => (
              <div key={messageId}>{messages[messageId].text}</div>
            ))
            .reverse()}
        </div>
      ) : (
        "No messages yet..."
      )}
      <div>
        <Formik
          initialValues={{ message: "" }}
          onSubmit={handleSubmitMessage}
          enableReinitialize
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="message">
                {({ field }: FieldProps) => (
                  <Input
                    field={field}
                    label="Message"
                    multiline
                    maxRows={4}
                    fullWidth
                  />
                )}
              </Field>
              <IconButton type="submit">
                <SendIcon />
              </IconButton>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChatPage;
