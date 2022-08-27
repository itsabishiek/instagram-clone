import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Input,
  Link,
  Skeleton,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Post } from "../../atoms/postsAtom";
import { auth } from "../../firebase/clientApp";
import PostMenu from "../menus/PostMenu";

type PostItemProps = {
  post: Post;
};

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const [user] = useAuthState(auth);
  const [loadingImage, setLoadingImage] = useState(true);

  console.log(user?.uid);

  return (
    <Stack
      bg="white"
      border={{ base: "none", md: "1px solid" }}
      borderColor={{ base: "none", md: "gray.200" }}
      borderRadius="md"
      mt={{ base: "0rem !important", md: "unset" }}
      mb={{ base: "0rem !important", md: "unset" }}
      m={{ base: "0px", md: "10px 0px !important" }}
      pt="4px"
    >
      <Flex align="center" justify="space-between">
        <Flex align="center" m="8px 4px 8px 12px">
          <Link href={`/${post.username}`}>
            <Avatar src={post.profileImg} w="32px" h="32px" mr={3} />
          </Link>
          <Flex flexDir="column" justify="center">
            <Link
              href={`/${post.username}`}
              _hover={{ textDecoration: "none" }}
            >
              <Text fontSize="10pt" fontWeight={600}>
                {post.username}
              </Text>
            </Link>
            <Text fontSize="9pt">{post?.location}</Text>
          </Flex>
        </Flex>
        <PostMenu userIsCreator={user?.uid === post.userId} />
      </Flex>

      {loadingImage && <Skeleton w="100%" h="350px" />}
      <Image
        src={post.imageURL}
        alt=""
        mt="0rem !important"
        display={loadingImage ? "none" : "unset"}
        onLoad={() => setLoadingImage(false)}
      />

      <Flex
        justify="space-between"
        align="center"
        p="5px 12px 6px"
        m="-34px 0px 0px"
      >
        <Flex align="center" gap={4}>
          <svg
            aria-label="Like"
            color="#262626"
            fill="#262626"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
            cursor="pointer"
          >
            <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
          </svg>
          <svg
            aria-label="Comment"
            color="#262626"
            fill="#262626"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
            cursor="pointer"
          >
            <path
              d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </svg>
          <svg
            aria-label="Share Post"
            color="#262626"
            fill="#262626"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
            cursor="pointer"
          >
            <line
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="22"
              x2="9.218"
              y1="3"
              y2="10.083"
            ></line>
            <polygon
              fill="none"
              points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
            ></polygon>
          </svg>
        </Flex>
        <Box>
          <svg
            aria-label="Save"
            color="#262626"
            fill="#262626"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
            cursor="pointer"
          >
            <polygon
              fill="none"
              points="20 21 12 13.44 4 21 4 3 20 3 20 21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></polygon>
          </svg>
        </Box>
      </Flex>

      <Stack p="0px 12px">
        <Text fontSize="11pt" fontWeight={600}>
          {post.numberOfLikes} likes
        </Text>

        <Text fontSize="10pt">
          <span
            style={{ fontWeight: 600, fontSize: "10pt", cursor: "pointer" }}
          >
            {post.username}
          </span>{" "}
          {post.caption}
        </Text>

        <Text
          fontSize="14px"
          color="#8e8e8e"
          letterSpacing={0.1}
          cursor="pointer"
        >
          View all comments
        </Text>

        <Text color="#8e8e8e" fontSize="8pt" textTransform="uppercase">
          {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
        </Text>
      </Stack>

      <Flex
        align="center"
        p="4px 16px 4px 12px"
        borderTop="1px solid"
        borderBottom={{ base: "1px solid", md: "none" }}
        borderColor="gray.100"
      >
        <svg
          aria-label="Emoji"
          color="#262626"
          fill="#262626"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path>
        </svg>
        <Textarea
          border="none"
          focusBorderColor="none"
          placeholder="Add a comment..."
          _placeholder={{ fontSize: "10pt" }}
          fontSize="10pt"
          minH="unset"
          h="40px"
          m="0px 5px 0px 10px"
          resize="none"
        />
        <Button variant="shareButton" color="brand.100" fontSize="10.5pt">
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
export default PostItem;
