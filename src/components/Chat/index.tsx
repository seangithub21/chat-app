import { Dispatch, JSX, SetStateAction } from "react";
import { Field, FieldProps, Formik, FormikValues } from "formik";
import { AppBar, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Button from "components/common/Button";
import Input from "components/common/Input";
import Messages from "components/Messages";
import { sendMessage } from "features/messages/messagesSlice";
import { useAppDispatch } from "hooks/reduxHooks";
import { getCurrentChatId, setCurrentChatId } from "utils/sessionStorage";

import getStyles from "./styles";

interface Props {
  setCurrentChatOpen?: Dispatch<SetStateAction<boolean>>;
}

const Chat = ({ setCurrentChatOpen }: Props): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();
  const classes = getStyles();

  const handleSubmitMessage = (data: FormikValues, { resetForm }: any) => {
    data.message &&
      dispatch(sendMessage({ data, chatId: getCurrentChatId(), resetForm }));
  };

  const handleCloseChat = () => {
    if (isMobile) {
      setCurrentChatId("");
      setCurrentChatOpen && setCurrentChatOpen(false);
    }
  };

  return (
    <div style={classes.container}>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <Button isIcon onClick={handleCloseChat}>
              <ArrowBackIcon sx={classes.backButton} />
            </Button>
          )}
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
                <SendIcon />
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Chat;
