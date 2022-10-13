import { Flex, Image, Text } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import React, { useRef, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { chatsAtom } from "../../atoms/chatsAtom";
import { userDataState } from "../../atoms/userDataAtom";

export type MessageType = {
  createdAt: Timestamp;
  id: string;
  senderId: string;
  text: string;
  image?: string;
};

type MessageProps = {
  message: MessageType;
};

const Message: React.FC<MessageProps> = ({ message }) => {
  const userStateValue = useRecoilValue(userDataState);
  const chatStateValue = useRecoilValue(chatsAtom);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <Flex
      gap="10px"
      flexDir={
        message.senderId === userStateValue.currUser.username
          ? "row-reverse"
          : "row"
      }
      ref={scrollRef}
    >
      <Flex alignSelf="start" transform="translateY(25px)">
        {!(message.senderId === userStateValue.currUser.username) && (
          <Image
            src={chatStateValue.chatUserInfo.photoURL}
            alt=""
            width="22px"
            height="22px"
            borderRadius="50%"
            objectFit="cover"
          />
        )}
      </Flex>
      <Flex
        flexDir="column"
        align={
          message.senderId === userStateValue.currUser.username
            ? "flex-end"
            : "flex-start"
        }
        w="100%"
        maxW={{ base: "60%", md: "50%" }}
        gap="10px"
      >
        {message?.text && (
          <Text
            fontSize="14px"
            p="14px"
            border={
              message.senderId === userStateValue.currUser.username
                ? "none"
                : "1px solid"
            }
            borderColor="gray.200"
            borderRadius="25px"
            bg={
              message.senderId === userStateValue.currUser.username
                ? "#eeeeee"
                : ""
            }
          >
            {message.text}
          </Text>
        )}
        {message?.image && (
          <Image
            src={message.image}
            width="100%"
            height="100%"
            borderRadius="15px"
            objectFit="contain"
            alt=""
          />
        )}
      </Flex>
    </Flex>
  );
};
export default Message;
