import {
  collection,
  deleteDoc,
  doc,
  increment,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Post, postState } from "../atoms/postsAtom";
import { userDataState } from "../atoms/userDataAtom";
import { auth, firestore, storage } from "../firebase/clientApp";

const usePosts = () => {
  const [user] = useAuthState(auth);
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const setUserStateValue = useSetRecoilState(userDataState);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }

      const postDocRef = doc(firestore, "posts", post.id);
      await deleteDoc(postDocRef);

      setPostStateValue((prev) => ({
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

  const likePost = async (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    username: string
  ) => {
    event.preventDefault();

    if (!user) {
      router.push("/login");
      return;
    }

    try {
      const { numberOfLikes } = post;
      const hasLiked = postStateValue.likes.find(
        (like) => like.postId === post.id
      );

      const batch = writeBatch(firestore);
      const updatedPost = { ...post };
      const updatedPosts = [...postStateValue.posts];
      let likedPosts = [...postStateValue.likes];

      // New Like
      if (!hasLiked) {
        const likePostDocRef = doc(
          collection(firestore, "users", `${username}/likes`)
        );
        const newLike = {
          id: likePostDocRef.id,
          username: username,
          postId: post.id,
        };

        batch.set(likePostDocRef, newLike);
        updatedPost.numberOfLikes = numberOfLikes + 1;
        likedPosts = [...likedPosts, newLike];
      } else {
        const likePostDocRef = doc(
          firestore,
          "users",
          `${username}/likes/${hasLiked.id}`
        );

        batch.delete(likePostDocRef);
        updatedPost.numberOfLikes = numberOfLikes - 1;
        likedPosts = likedPosts.filter((like) => like.id !== hasLiked.id);
      }

      // update the state with updated values
      const postIndex = postStateValue.posts.findIndex(
        (item) => item.id === post.id
      );
      updatedPosts[postIndex] = updatedPost;
      setPostStateValue((prev) => ({
        ...prev,
        posts: updatedPosts,
        likes: likedPosts,
      }));

      const postDocRef = doc(firestore, "posts", post.id);
      batch.update(postDocRef, {
        numberOfLikes: updatedPost.numberOfLikes,
      });

      await batch.commit();
    } catch (error) {
      console.log("likePost Error", error);
    }
  };

  return {
    postStateValue,
    setPostStateValue,
    setUserStateValue,
    onDeletePost,
    likePost,
  };
};
export default usePosts;
