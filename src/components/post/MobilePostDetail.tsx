import {
  Stack,
  Flex,
  Avatar,
  InputGroup,
  Textarea,
  InputRightAddon,
  Text,
  Button,
} from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { Post } from "../../atoms/postsAtom";
import { Comment } from "../../hooks/usePosts";
import Comments from "../comments/Comments";

type MobilePostDetailProps = {
  post: Post;
  commentText: string;
  setCommentText: (value: string) => void;
  onCreateComment: () => void;
  comments: Comment[];
  loading: boolean;
  commentLoading: boolean;
  onDeleteComment: (comment: Comment) => void;
  deleting: string;
};

const MobilePostDetail: React.FC<MobilePostDetailProps> = ({
  post,
  commentText,
  setCommentText,
  onCreateComment,
  comments,
  loading,
  commentLoading,
  onDeleteComment,
  deleting,
}) => {
  return (
    <Stack
      display={{ base: "unset", md: "none" }}
      position="absolute"
      top={0}
      w="100%"
      h="100%"
      zIndex={10000}
      bg="white"
    >
      <Flex
        align="center"
        justify="space-between"
        h="44px"
        p="0px 16px"
        borderBottom="1px solid"
        borderColor="gray.300"
        position="fixed"
        top={0}
        w="100%"
        zIndex={100}
        bg="white"
      >
        <svg
          aria-label="Back"
          color="#262626"
          fill="#262626"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
          className="rotateIcon"
          onClick={() => router.back()}
        >
          <path d="M21 17.502a.997.997 0 01-.707-.293L12 8.913l-8.293 8.296a1 1 0 11-1.414-1.414l9-9.004a1.03 1.03 0 011.414 0l9 9.004A1 1 0 0121 17.502z"></path>
        </svg>
        <Text fontWeight={600}>Comments</Text>
        <svg
          aria-label="Share Post"
          color="#262626"
          fill="#262626"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
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

      <Flex
        mt="0rem !important"
        padding="8px 16px"
        bg="#efefef"
        align="center"
        pos="fixed"
        w="100%"
        top="44px"
        zIndex={100}
      >
        <Avatar src={post.profileImg} size="sm" mr={3} />
        <InputGroup
          border="1px solid"
          borderRadius="full"
          borderColor="gray.300"
          bg="white"
          alignItems="center"
        >
          <Textarea
            border="none"
            borderRadius="full"
            focusBorderColor="none"
            placeholder="Add a comment..."
            _placeholder={{ fontSize: "10pt" }}
            fontSize="10pt"
            minH="unset"
            h="44px"
            p="12px 16px"
            resize="none"
            bg="white"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <InputRightAddon border="none" bg="white" borderRadius="full">
            <Button
              variant="shareButton"
              fontSize="11.5pt"
              fontWeight={600}
              color="brand.100"
              onClick={onCreateComment}
              isLoading={loading}
            >
              Post
            </Button>
          </InputRightAddon>
        </InputGroup>
      </Flex>

      <Comments
        post={post}
        comments={comments}
        loading={commentLoading}
        onDeleteComment={onDeleteComment}
        deleting={deleting}
      />
    </Stack>
  );
};
export default MobilePostDetail;
