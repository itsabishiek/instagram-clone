import {
  Avatar,
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { Post } from "../../atoms/postsAtom";
import { Comment } from "../../hooks/usePosts";
import CommentItem from "./CommentItem";

type CommentsProps = {
  post: Post;
  comments: Comment[];
  loading: boolean;
  onDeleteComment: (comment: Comment) => void;
  deleting: string;
};

const Comments: React.FC<CommentsProps> = ({
  post,
  comments,
  loading,
  onDeleteComment,
  deleting,
}) => {
  return (
    <Stack
      h={{ base: "unset", md: "250px" }}
      overflowY="scroll"
      mt="0rem !important"
    >
      <Flex
        p="8px 4px 8px 12px"
        align="left"
        mt={{ base: "115px", md: "0" }}
        zIndex={{ base: 90, md: "unset" }}
        borderBottom={{ base: "1px solid", md: "none" }}
        borderColor="gray.200"
      >
        <Avatar src={post.profileImg} size="sm" mr={3} />
        <Box>
          <Text fontSize={{ base: "9pt", md: "10pt" }} mb={1}>
            <span
              style={{ fontWeight: 600, fontSize: "10pt", cursor: "pointer" }}
            >
              {post.username}
            </span>{" "}
            {post.caption}
          </Text>
          <Text fontSize="8pt">
            {moment(post.createdAt?.seconds * 1000).fromNow()}
          </Text>
        </Box>
      </Flex>

      {!!comments.length ? (
        <>
          {comments.map((comment: Comment) => (
            <Box key={comment.id}>
              {loading ? (
                <Flex p="8px 4px 8px 12px" align="center">
                  <SkeletonCircle size="10" mr={3} />
                  <SkeletonText w="70%" noOfLines={2} spacing="2" />
                </Flex>
              ) : (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onDeleteComment={onDeleteComment}
                  deleting={deleting}
                />
              )}
            </Box>
          ))}
        </>
      ) : (
        <Flex
          flexDir="column"
          h={{ base: "350px", md: "100%" }}
          align="center"
          justify="center"
        >
          <Text
            fontSize={{ base: "14pt", md: "11.5pt" }}
            fontWeight={600}
            color="#8e8e8e"
            textAlign="center"
            mb={1}
          >
            No Commments Yet
          </Text>
          <Text
            fontSize={{ base: "11pt", md: "9.5pt" }}
            fontWeight="light"
            color="#8e8e8e"
            textAlign="center"
          >
            Start the conversation
          </Text>
        </Flex>
      )}
    </Stack>
  );
};
export default Comments;
