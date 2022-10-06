import { Box } from "@chakra-ui/react";
import React from "react";
import Message from "./Message";

type MessagesProps = {};

const Messages: React.FC<MessagesProps> = () => {
  return (
    <Box
      p="20px 20px 0"
      h={{ base: "calc(100vh - 190px)", md: "calc(85vh - 144px)" }}
      overflowY="scroll"
      display="flex"
      flexDir="column"
      gap="10px"
    >
      <Message sender />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message sender />
      <Message />
      <Message sender />
      <Message sender />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message sender />
      <Message />
      <Message />
      <Message />
      <Message sender />
      <Message />
      <Message sender />

      <Message />
    </Box>
  );
};
export default Messages;
