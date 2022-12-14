import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { useRecoilValue } from "recoil";
import { userDataState } from "../../atoms/userDataAtom";
import { Comment } from "../../hooks/usePosts";

type CommentItemProps = {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  deleting: string;
};

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onDeleteComment,
  deleting,
}) => {
  const userStateValue = useRecoilValue(userDataState);

  return (
    <Flex p="8px 12px 8px 12px" align="left" justify="space-between">
      <Flex align="left">
        <Avatar src={comment.profileImg} size="sm" mr={3} />
        <Box>
          <Text fontSize={{ base: "9pt", md: "10pt" }} mb={1}>
            <span
              style={{ fontWeight: 600, fontSize: "10pt", cursor: "pointer" }}
            >
              {comment.username}
            </span>{" "}
            {comment.comment}
          </Text>
          <Flex align="center">
            <Text fontSize="8pt" mr={3}>
              {moment(comment.createdAt?.seconds * 1000).fromNow()}
            </Text>
            <Text
              fontSize="8pt"
              letterSpacing={0.1}
              cursor="pointer"
              fontWeight={600}
              color="#8e8e8e"
              mr={3}
            >
              Reply
            </Text>

            {userStateValue.userData.username === comment.username && (
              <Button
                variant="shareButton"
                fontSize="8pt"
                letterSpacing={0.1}
                cursor="pointer"
                fontWeight={600}
                color="#8e8e8e"
                h="inherit"
                mr={3}
                onClick={() => onDeleteComment(comment)}
                isLoading={deleting === comment.id}
              >
                Delete
              </Button>
            )}
          </Flex>
        </Box>
      </Flex>

      <Box>
        <svg
          aria-label="Like"
          color="#262626"
          fill="#262626"
          height="12"
          role="img"
          viewBox="0 0 24 24"
          width="12"
          cursor="pointer"
        >
          <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
        </svg>
      </Box>
    </Flex>
  );
};
export default CommentItem;
