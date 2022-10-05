import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { UserData } from "../../atoms/userDataAtom";

type LeftCompProps = {
  user: UserData;
};

const LeftComp: React.FC<LeftCompProps> = ({ user }) => {
  return (
    <Flex w="100%" flexDir="column">
      <Flex
        h={{ base: "44px", md: "60px" }}
        w="100%"
        p="0px 20px"
        align="center"
        justify="space-between"
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        <Box opacity={{ base: 1, md: 0 }}>
          <svg
            aria-label="Down chevron icon"
            color="#262626"
            fill="#262626"
            role="img"
            viewBox="0 0 24 24"
            height="20"
            width="20"
            className="rotateIcon"
          >
            <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
          </svg>
        </Box>
        <Flex align="center">
          <Text fontWeight={600} color="black" fontSize="16px">
            {user.username}
          </Text>
          <svg
            aria-label="Down chevron icon"
            color="#262626"
            fill="#262626"
            role="img"
            viewBox="0 0 24 24"
            height="16"
            width="16"
            style={{ transform: "rotate(180deg)", marginLeft: 5 }}
          >
            <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
          </svg>
        </Flex>

        <svg
          aria-label="New message"
          color="#262626"
          fill="#262626"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <path
            d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          ></path>
          <path
            d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          ></path>
          <line
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="16.848"
            x2="20.076"
            y1="3.924"
            y2="7.153"
          ></line>
        </svg>
      </Flex>

      <Flex p="8px 20px" cursor="pointer" _hover={{ bg: "#eeeeee76" }}>
        <Avatar src={user.imageURL} boxSize="56px" mr={3} />

        <Flex flexDir="column" justify="center">
          <Text fontSize="14px">{user.fullname}</Text>
          <Text fontSize="14px" color="#8e8e8e" fontWeight="light">
            Active now
          </Text>
        </Flex>
      </Flex>

      <Flex p="8px 20px" cursor="pointer" _hover={{ bg: "#eeeeee76" }}>
        <Avatar src={user.imageURL} boxSize="56px" mr={3} />

        <Flex flexDir="column" justify="center">
          <Text fontSize="14px">{user.fullname}</Text>
          <Text fontSize="14px" color="#8e8e8e" fontWeight="light">
            Active now
          </Text>
        </Flex>
      </Flex>

      <Flex p="8px 20px" cursor="pointer" _hover={{ bg: "#eeeeee76" }}>
        <Avatar src={user.imageURL} boxSize="56px" mr={3} />

        <Flex flexDir="column" justify="center">
          <Text fontSize="14px">{user.fullname}</Text>
          <Text fontSize="14px" color="#8e8e8e" fontWeight="light">
            Active now
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default LeftComp;
