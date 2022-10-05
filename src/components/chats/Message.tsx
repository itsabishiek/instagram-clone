import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import pic from "../../../public/img/mediaUpsell.jpg";

type MessageProps = {
  sender?: boolean;
};

const Message: React.FC<MessageProps> = ({ sender }) => {
  return (
    <Flex align="center" gap="10px" flexDir={sender ? "row-reverse" : "row"}>
      {!sender && (
        <Image
          src={pic}
          alt=""
          width="22px"
          height="22px"
          style={{
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      )}
      <Text
        fontSize="14px"
        p="14px"
        border={sender ? "none" : "1px solid"}
        borderColor="gray.200"
        borderRadius="25px"
        bg={sender ? "#eeeeee" : ""}
        maxW="50%"
      >
        Hey, this is a message from Mark Zuckerburg.
      </Text>
    </Flex>
  );
};
export default Message;
