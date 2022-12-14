import {
  Avatar,
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import Link from "next/link";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useRecoilValue } from "recoil";
import { LikePost, Post, postState } from "../../atoms/postsAtom";
import { userDataState } from "../../atoms/userDataAtom";
import { auth, firestore } from "../../firebase/clientApp";
import { Comment } from "../../hooks/usePosts";
import Comments from "../comments/Comments";
import PostMenu from "../menus/PostMenu";

type PostItemProps = {
  post: Post;
  onDeletePost: (post: Post) => Promise<boolean>;
  likePost: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    username: string
  ) => void;
  savePost: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    username: string
  ) => void;
  commentText: string;
  setCommentText: (value: string) => void;
  onCreateComment: () => void;
  comments: Comment[];
  loading: boolean;
  commentLoading: boolean;
  onDeleteComment: (comment: Comment) => void;
  deleting: string;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  onDeletePost,
  likePost,
  commentText,
  setCommentText,
  onCreateComment,
  comments,
  loading,
  commentLoading,
  onDeleteComment,
  deleting,
  savePost,
}) => {
  const [user] = useAuthState(auth);
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const userStateValue = useRecoilValue(userDataState);

  const handleLike = async () => {
    if (userStateValue.currUser.username) {
      const likePostQuery = query(
        collection(
          firestore,
          "users",
          `${userStateValue.currUser.username}/likes`
        ),
        where("username", "==", userStateValue.currUser?.username)
      );
      const likedPosts = await getDocs(likePostQuery);
      const likes = likedPosts.docs.map((doc) => doc.data());
      setPostStateValue((prev) => ({
        ...prev,
        likes: likes as LikePost[],
      }));
    }
  };

  const handleSavedPost = async () => {
    const savePostQuery = query(
      collection(
        firestore,
        "users",
        `${userStateValue.currUser.username}/saved`
      ),
      where("creator", "==", userStateValue.currUser.username)
    );
    const savedPosts = await getDocs(savePostQuery);
    const saved = savedPosts.docs.map((doc) => doc.data());
    setPostStateValue((prev) => ({
      ...prev,
      saved: saved as Post[],
    }));
  };

  useEffect(() => {
    if (user && userStateValue.currUser) {
      handleLike();
      handleSavedPost();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userStateValue.currUser]);

  const hasLiked = postStateValue.likes.find((like) => like.postId === post.id);
  const hasSaved = postStateValue.saved.find((item) => item.id === post.id);

  return (
    <Stack
      bg="white"
      borderTop={{ base: "none", md: "1px solid" }}
      borderBottom={{ base: "none", md: "1px solid" }}
      borderRight={{ base: "none", md: "1px solid" }}
      borderColor={{ base: "none", md: "gray.200" }}
      mt={{ base: "0rem !important", md: "unset" }}
      mb={{ base: "0rem !important", md: "unset" }}
      pt="4px"
      pos="relative"
      h="100%"
    >
      <Flex
        align="center"
        justify="space-between"
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        <Flex align="center" p="8px 4px 8px 12px">
          <Link href={`/${post.username}`}>
            <Avatar src={post.profileImg} w="32px" h="32px" mr={3} />
          </Link>
          <Flex flexDir="column" justify="center">
            <Link href={`/${post.username}`}>
              <Text fontSize="10pt" fontWeight={600}>
                {post.username}
              </Text>
            </Link>
            <Text fontSize="9pt">{post?.location}</Text>
          </Flex>
        </Flex>
        <PostMenu
          userIsCreator={user?.uid === post.userId}
          post={post}
          onDeletePost={onDeletePost}
        />
      </Flex>

      <Comments
        post={post}
        comments={comments}
        loading={commentLoading}
        onDeleteComment={onDeleteComment}
        deleting={deleting}
      />

      <Flex
        justify="space-between"
        align="center"
        p="5px 12px 6px"
        m="-34px 0px 0px"
        pos="sticky"
        w="100%"
        borderTop="1px solid"
        borderColor="gray.200"
      >
        <Flex align="center" gap={4} pt={2}>
          {hasLiked ? (
            <svg
              aria-label="Unlike"
              color="#ed4956"
              fill="#ed4956"
              height="24"
              role="img"
              viewBox="0 0 48 48"
              width="24"
              cursor="pointer"
              onClick={(e) =>
                likePost(e, post, userStateValue.userData.username)
              }
            >
              <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
            </svg>
          ) : (
            <svg
              aria-label="Like"
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
              cursor="pointer"
              className="likeButton"
              onClick={(e) =>
                likePost(e, post, userStateValue.userData.username)
              }
            >
              <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
            </svg>
          )}

          <Box _hover={{ opacity: 0.6 }}>
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
          </Box>
        </Flex>

        {hasSaved ? (
          <svg
            aria-label="Remove"
            color="#262626"
            fill="#262626"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
            className="likeButton"
            cursor="pointer"
            onClick={(e) => savePost(e, post, userStateValue.currUser.username)}
          >
            <path d="M20 22a.999.999 0 01-.687-.273L12 14.815l-7.313 6.912A1 1 0 013 21V3a1 1 0 011-1h16a1 1 0 011 1v18a1 1 0 01-1 1z"></path>
          </svg>
        ) : (
          <svg
            aria-label="Save"
            color="#262626"
            fill="#262626"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
            className="likeButton"
            cursor="pointer"
            onClick={(e) => savePost(e, post, userStateValue.currUser.username)}
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
        )}
      </Flex>

      <Stack p="0px 12px" pb={{ base: 3, md: 0 }} pos="sticky" w="100%">
        {post.numberOfLikes > 0 && (
          <Text fontSize={{ base: "10pt", md: "11pt" }} fontWeight={600}>
            {post.numberOfLikes} likes
          </Text>
        )}

        <Text
          color="#8e8e8e"
          fontSize={{ base: "6pt", md: "8pt" }}
          textTransform="uppercase"
        >
          {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
        </Text>
      </Stack>

      <Flex
        align="center"
        p="4px 16px 4px 12px"
        borderTop="1px solid"
        borderBottom={{ base: "1px solid", md: "none" }}
        borderColor="gray.100"
        display={{ base: "none", md: "flex" }}
        pos="sticky"
        w="100%"
        bottom={0}
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
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button
          variant="shareButton"
          color="brand.100"
          fontSize="10.5pt"
          onClick={onCreateComment}
          isLoading={loading}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
export default PostItem;
