import { Flex } from "@chakra-ui/react";
import React from "react";

type HomeLeftProps = {};

const HomeLeft: React.FC<HomeLeftProps> = () => {
  return (
    <Flex
      w="100%"
      h="85px"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="lg"
      bg="white"
    ></Flex>
  );
};
export default HomeLeft;
