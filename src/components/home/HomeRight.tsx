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
      <Flex w="100%" align="center" justifyContent="space-between">
        <Flex align="center">
          <Link href={`/${userData.username}`}>
            <Avatar
              src={userData?.imageURL}
              size="lg"
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
          <Text fontSize="11pt" fontWeight={600} color="gray.500">
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
