import { Box, Flex, Stack } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { query, collection, orderBy, getDocs, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Post, postState } from "../../atoms/postsAtom";
import { firestore } from "../../firebase/clientApp";
import PostItem from "../post/PostItem";
import PostLoader from "../loader/PostLoader";
import Stories from "../Stories";
import usePosts from "../../hooks/usePosts";

type HomeLeftProps = {
  user?: User | null;
};

const HomeLeft: React.FC<HomeLeftProps> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const { postStateValue, setPostStateValue, onDeletePost } = usePosts();

  const getPosts = async () => {
    setLoading(true);
    try {
      const postsQuery = query(
        collection(firestore, "posts"),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postsQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error) {
      console.log("getPosts Error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid, postStateValue.postDeleted]);

  return (
    <Stack w={{ base: "100%", md: "470px" }}>
      {user && <Stories />}

      <Stack mt={{ base: "0rem !important", md: "1rem !important" }}>
        {postStateValue.posts.map((post) => (
          <Box key={post.id}>
            {loading ? (
              <PostLoader />
            ) : (
              <PostItem post={post} onDeletePost={onDeletePost} />
            )}
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

export default HomeLeft;
