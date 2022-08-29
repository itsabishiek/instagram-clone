import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Post, postState } from "../atoms/postsAtom";
import { userDataState } from "../atoms/userDataAtom";
import { firestore, storage } from "../firebase/clientApp";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const setUserStateValue = useSetRecoilState(userDataState);
  const [loading, setLoading] = useState(false);

  const onDeletePost = async (post: Post, userPost: Post): Promise<boolean> => {
    try {
      if (post.imageURL || userPost.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }

      const postDocRef = doc(firestore, "posts", post.id);
      await deleteDoc(postDocRef);

      const userPostDocRef = doc(
        firestore,
        `users/${post.username}/posts`,
        post.id
      );
      await deleteDoc(userPostDocRef);

      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((prev) => prev.id !== post.id),
        postDeleted: true,
      }));
      setUserStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((prev) => prev.id !== post.id),
        postDeleted: true,
      }));
      return true;
    } catch (error) {
      console.log("onDeletePost Error", error);
      return false;
    }
  };

  return {
    postStateValue,
    setPostStateValue,
    onDeletePost,
  };
};
export default usePosts;
