import { Avatar, Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import useUserData from "../../hooks/useUserData";

type HomeRightProps = {};

const HomeRight: React.FC<HomeRightProps> = () => {
  const { userStateValue, loading } = useUserData();
  const userData = userStateValue?.userData;

  return (
    <>
      <Flex w="100%" align="center" justifyContent="space-between" mt={4}>
        <Flex align="center">
          <Link href={`/${userData.username}`}>
            <Avatar
              src={userData?.imageURL}
              w="56px"
              h="56px"
              mr={4}
              cursor="pointer"
            />
          </Link>
          <Flex flexDir="column">
            <Link href={`/${userData.username}`}>
              <Text fontSize="11pt" fontWeight={600} cursor="pointer">
                {userData.username}
              </Text>
            </Link>
            <Text fontSize="10pt" color="gray.400">
              {userData.fullname}
            </Text>
          </Flex>
        </Flex>
        <Text
          fontSize="10pt"
          fontWeight={600}
          color="brand.100"
          cursor="pointer"
        >
          Switch
        </Text>
      </Flex>

      <Stack w="100%" mt={4}>
        <Flex align="center" justify="space-between">
          <Text fontSize="11pt" fontWeight={600} color="#8e8e8e">
            Suggestions for you
          </Text>
          <Text fontSize="9pt" fontWeight={600} color="black" cursor="pointer">
            See all
          </Text>
        </Flex>
      </Stack>
    </>
  );
};
export default HomeRight;
