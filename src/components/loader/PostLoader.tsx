import {
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
import React from "react";

const PostLoader: React.FC = () => {
  return (
    <Stack
      spacing={6}
      bg="white"
      mt={{ base: 0, md: 4 }}
      w={{ base: "100%", md: "470px" }}
    >
      <Flex
        padding="8px 4px 8px 12px"
        boxShadow="md"
        bg="white"
        borderRadius={4}
        align="center"
      >
        <SkeletonCircle mr={3} />
        <SkeletonText noOfLines={2} width="30%" />
      </Flex>
      <Skeleton h="350px" w="100%" />
      <Flex align="center" justify="space-between" p="0px 12px">
        <Flex align="center" gap={5}>
          <Skeleton w="30px" h="30px" />
          <Skeleton w="30px" h="30px" />
          <Skeleton w="30px" h="30px" />
        </Flex>
        <Skeleton w="30px" h="30px" />
      </Flex>
      <SkeletonText p="0px 12px" noOfLines={2} spacing="4" />
      <Flex gap={2} p="0px 12px" pb={4} borderRadius={4}>
        <Skeleton w="30px" h="30px" />
        <Skeleton w="100%" h="30px" />
        <Skeleton w="30px" h="30px" />
      </Flex>
    </Stack>
  );
};
export default PostLoader;
