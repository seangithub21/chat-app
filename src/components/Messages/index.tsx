import { useAppSelector } from "hooks/reduxHooks";

const Messages = (): JSX.Element => {
  const { messages } = useAppSelector((state) => state.messages);

  return (
    <>
      {messages ? (
        <>
          {Object.keys(messages)
            .map((messageId) => (
              <div key={messageId}>{messages[messageId].text}</div>
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
