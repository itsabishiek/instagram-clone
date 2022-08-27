import { Flex, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import React from "react";

const SuggestionLoader: React.FC = () => {
  return (
    <Flex w="100%" align="center" justify="space-between" pb={5}>
      <Flex flexGrow={1} align="center">
        <SkeletonCircle mr={3} />
        <SkeletonText noOfLines={2} width="80%" />
      </Flex>
      <Skeleton h="30px" w="60px" ml={2} />
    </Flex>
  );
};
export default SuggestionLoader;
