import { Dispatch, JSX, SetStateAction } from "react";
import { Field, FieldProps, Formik, FormikValues } from "formik";
import { AppBar, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Button from "components/common/Button";
import Input from "components/common/Input";
import Messages from "components/Messages";
import { auth } from "configs/firebase";
import { sendMessage } from "features/messages/messagesSlice";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { getCurrentChatId } from "utils/sessionStorage";

import getStyles from "./styles";

interface Props {
  currentChatOpen: string;
  setCurrentChatOpen?: Dispatch<SetStateAction<string>>;
}

const Chat = ({ currentChatOpen, setCurrentChatOpen }: Props): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { chats } = useAppSelector((state) => state.chats);
  const dispatch = useAppDispatch();
  const classes = getStyles({ isMobile });

  const chatWith = chats[currentChatOpen]?.participantEmails.find(
    (email: string) => email !== auth.currentUser?.email,
  );

  const handleSubmitMessage = (data: FormikValues, { resetForm }: any) => {
    data.message &&
      dispatch(sendMessage({ data, chatId: getCurrentChatId() })).then(() =>
        resetForm(),
      );
  };

  const handleCloseChat = () =>
    isMobile && setCurrentChatOpen && setCurrentChatOpen("");

  return (
    <div style={classes.container}>
      <AppBar position="static" sx={{ borderRadius: isMobile ? "" : "1rem" }}>
        <Toolbar sx={{ display: "flex", gap: "1rem" }}>
          {isMobile && (
            <Button isIcon onClick={handleCloseChat}>
              <ArrowBackIcon sx={classes.backButton} />
            </Button>
          )}
          <div style={{ color: "#000" }}>{chatWith}</div>
        </Toolbar>
      </AppBar>
      <div style={classes.chat}>
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
                  <SendIcon sx={{ fontSize: "3rem" }} />
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Chat;
