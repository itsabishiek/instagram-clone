import { Box } from "@chakra-ui/react";
import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { chatsAtom } from "../../atoms/chatsAtom";
import { firestore } from "../../firebase/clientApp";
import Message, { MessageType } from "./Message";

type MessagesProps = {};

const Messages: React.FC<MessagesProps> = () => {
  const [messages, setMessages] = useState<DocumentData>([]);
  const chatStateValue = useRecoilValue(chatsAtom);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(firestore, "chats", chatStateValue.combinedId),
      (snapshot) => {
        if (snapshot.exists()) {
          setMessages(snapshot.data().messages);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [chatStateValue.combinedId]);

  console.log(messages);

  return (
    <Box
      p="20px 20px 0"
      h={{ base: "calc(100% - 175px)", md: "calc(85vh - 144px)" }}
      overflowY="scroll"
      display="flex"
      flexDir="column"
      gap="10px"
    >
      {messages.map((m: MessageType) => (
        <Message key={m.id} message={m} />
      ))}
    </Box>
  );
};
export default Messages;
