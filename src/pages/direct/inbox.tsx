import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { useRecoilValue } from "recoil";
import { userDataState } from "../../atoms/userDataAtom";
import DirectInbox from "../../components/chats/DirectInbox";
import LeftComp from "../../components/chats/LeftComp";

type InboxProps = {};

const Inbox: React.FC<InboxProps> = () => {
  const userStateValue = useRecoilValue(userDataState);

  return (
    <>
      <Head>
        <title>Inbox • Chats</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png"
        />
      </Head>

      <Flex
        pos="fixed"
        w="100%"
        justify="center"
        align={{ base: "left", md: "center" }}
        h="calc(100vh - 60px)"
        top={{ base: 0, md: "unset" }}
        zIndex={{ base: "1000", md: "unset" }}
      >
        <Flex
          justify="center"
          bg="white"
          maxW="935px"
          w="100%"
          h={{ base: "calc(100vh - 44px - 49px)", md: "85vh" }}
          border="1px solid"
          borderColor="gray.200"
          borderRadius={{ base: 0, md: 4 }}
        >
          <Flex
            flex={{ base: 1, md: 2.3 }}
            borderRight="1px solid"
            borderColor="gray.200"
          >
            <LeftComp user={userStateValue.currUser} />
          </Flex>

          <Flex
            flex={4}
            display={{ base: "none", md: "flex" }}
            flexDir="column"
            h="85vh"
          >
            <DirectInbox />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
export default Inbox;
