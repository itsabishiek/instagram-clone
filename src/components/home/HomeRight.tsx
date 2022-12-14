import {
  Avatar,
  Box,
  Button,
  Flex,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { UserData } from "../../atoms/userDataAtom";
import { auth, firestore } from "../../firebase/clientApp";
import useUserData from "../../hooks/useUserData";
import SuggestionLoader from "../loader/SuggestionLoader";

type HomeRightProps = {};

const HomeRight: React.FC<HomeRightProps> = () => {
  const [user] = useAuthState(auth);
  const { userStateValue, loading } = useUserData();
  const userData = userStateValue?.userData;
  const [loadingUser, setLoadingUser] = useState(false);
  const [suggestions, setSuggestions] = useState<UserData[]>([]);

  const suggestionUsers = async () => {
    setLoadingUser(true);
    try {
      const usersQuery = query(
        collection(firestore, "users"),
        where("email", "!=", user?.email),
        limit(5)
      );
      const userDocs = await getDocs(usersQuery);
      const users = userDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSuggestions(users as UserData[]);
    } catch (error) {
      console.log("suggestionUsers", error);
    }
    setLoadingUser(false);
  };

  useEffect(() => {
    if (user) {
      suggestionUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // console.log(suggestions);

  return (
    <Box pos="sticky" top="90px" w="100%">
      <Flex w="100%" align="center" justifyContent="space-between" mt={4}>
        <Flex align="center">
          <Link href={`/${userData?.username}`}>
            <Box
              border="1px solid"
              borderColor="#c5c5c5"
              mr={4}
              borderRadius="full"
            >
              <Avatar
                src={userData?.imageURL}
                w="56px"
                h="56px"
                cursor="pointer"
                border="3px solid rgb(250, 250, 250)"
              />
            </Box>
          </Link>

          {loading ? (
            <SkeletonText noOfLines={2} width="120px" />
          ) : (
            <Flex flexDir="column">
              <Link href={`/${userData?.username}`}>
                <Text fontSize="11pt" fontWeight={600} cursor="pointer">
                  {userData?.username}
                </Text>
              </Link>
              <Text fontSize="10pt" color="gray.400">
                {userData?.fullname}
              </Text>
            </Flex>
          )}
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

        <Box pt={2}>
          {suggestions.map((item) => (
            <Box key={item.id}>
              {loadingUser ? (
                <SuggestionLoader />
              ) : (
                <Flex pb={2} align="center" justify="space-between">
                  <Flex align="center">
                    <Link href={`/${item.username}`}>
                      <Avatar
                        src={item.imageURL}
                        size="sm"
                        mr={3}
                        cursor="pointer"
                      />
                    </Link>
                    <Flex flexDir="column" justify="center">
                      <Link href={`/${item.username}`}>
                        <Text fontSize="10pt" fontWeight={600} cursor="pointer">
                          {item.username}
                        </Text>
                      </Link>
                      <Text fontSize="9pt">{item.fullname}</Text>
                    </Flex>
                  </Flex>
                  <Button variant="shareButton" color="brand.100">
                    Follow
                  </Button>
                </Flex>
              )}
            </Box>
          ))}
        </Box>
      </Stack>
    </Box>
  );
};
export default HomeRight;
