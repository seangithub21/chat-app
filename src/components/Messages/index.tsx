import { auth } from "configs/firebase";
import { useAppSelector } from "hooks/reduxHooks";

const Messages = (): JSX.Element => {
  const { messages } = useAppSelector((state) => state.messages);

  return (
    <>
      {messages ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            height: "100%",
            padding: "1rem",
          }}
        >
          {Object.keys(messages)
            .map((messageId) => (
              <div
                key={messageId}
                style={{
                  display: "flex",
                  justifyContent:
                    auth.currentUser?.uid === messages[messageId].createdBy
                      ? "flex-end"
                      : "flex-start",
                }}
              >
                <span
                  style={{
                    borderRadius: "1rem",
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    padding: "1rem",
                  }}
                >
                  {messages[messageId].text}
                </span>
              </div>
            ))
            .reverse()}
        </div>
      ) : (
        <div>No messages yet...</div>
      )}
    </>
  );
};

export default Messages;
