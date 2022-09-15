import { Box, Flex, GridItem, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import { BsFillChatFill, BsHeartFill } from "react-icons/bs";
import { Post } from "../../atoms/postsAtom";
import usePosts from "../../hooks/usePosts";

type PostsProps = {
  post: Post;
};

const Posts: React.FC<PostsProps> = ({ post }) => {
  const { onSelectPost } = usePosts();

  return (
    <GridItem
      display="flex"
      w="100%"
      justifyContent="center"
      onClick={() => onSelectPost(post)}
    >
      <Box
        pos="relative"
        w={{ base: "100%", md: "293px" }}
        h={{ base: "130px", md: "293px" }}
        cursor="pointer"
      >
        <Box
          pos="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          bg="rgba(0,0,0,0.4)"
          opacity={0}
          _hover={{ opacity: 1 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Flex align="center" mr={6}>
            <Icon as={BsHeartFill} color="#ffffff" fontSize="20px" mr={2} />
            <Text color="#ffffff">{post.numberOfLikes}</Text>
          </Flex>
          <Flex align="center">
            <Icon as={BsFillChatFill} color="#ffffff" fontSize="20px" mr={2} />
            <Text color="#ffffff">{post.numberOfComments}</Text>
          </Flex>
        </Box>
        <Image src={post.imageURL} alt="" w="100%" h="100%" objectFit="cover" />
      </Box>
    </GridItem>
  );
};
export default Posts;
