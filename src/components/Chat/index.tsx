import { JSX } from "react";
import { Field, FieldProps, Formik, FormikValues } from "formik";
import { AppBar, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { sendMessage } from "features/messages/messagesSlice";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { getCurrentChatId, getUserData } from "utils/localStorage";
import Messages from "components/Messages";
import Input from "components/common/Input";
import Button from "components/common/Button";

import getStyles from "./styles";

interface Props {
  handleOpenChats: () => void;
}

const Chat = ({ handleOpenChats }: Props): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { chats, currentChatId } = useAppSelector((state) => state.chats);
  const dispatch = useAppDispatch();
  const classes = getStyles();

  const handleSubmitMessage = (data: FormikValues, { resetForm }: any) => {
    data.message &&
      dispatch(sendMessage({ data, chatId: getCurrentChatId(), resetForm }));
  };

  return (
    <div style={classes.container}>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <Button isIcon onClick={handleOpenChats}>
              <ArrowBackIcon sx={classes.backButton} />
            </Button>
          )}
          {currentChatId &&
            (chats[currentChatId]?.participants.participant1.uid ===
            getUserData().uid
              ? chats[currentChatId]?.participants.participant2.email
              : chats[currentChatId]?.participants.participant1.email)}
        </Toolbar>
      </AppBar>
      <div style={classes.messages}>
        <Messages />
      </div>
      <div>
        <Formik
          initialValues={{ message: "" }}
          onSubmit={handleSubmitMessage}
          enableReinitialize
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} style={classes.form}>
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
              <Button isIcon type="submit">
                <SendIcon fontSize="large" />
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Chat;
