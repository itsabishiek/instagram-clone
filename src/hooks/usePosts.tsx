import {
  collection,
  deleteDoc,
  doc,
  increment,
  serverTimestamp,
  Timestamp,
  writeBatch,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { Post, postState } from "../atoms/postsAtom";
import { userDataState } from "../atoms/userDataAtom";
import { auth, firestore, storage } from "../firebase/clientApp";

export type Comment = {
  id: string;
  name: string;
  username: string;
  postId: string;
  profileImg?: string;
  comment: string;
  createdAt: Timestamp;
};

const usePosts = () => {
  const [user] = useAuthState(auth);
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const [userStateValue, setUserStateValue] = useRecoilState(userDataState);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [commenting, setCommenting] = useState(false);
  const [deleting, setDeleting] = useState("");
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

      if (postStateValue.selectedPost) {
        setPostStateValue((prev) => ({
          ...prev,
          selectedPost: updatedPost,
        }));
      }

      await batch.commit();
    } catch (error) {
      console.log("likePost Error", error);
    }
  };

  const onSelectPost = (post: any) => {
    if (!user) {
      router.push("/login");
      return;
    }
    setPostStateValue((prev) => ({
      ...prev,
      selectedPost: post,
    }));

    router.push(`/p/${post.id}`);
  };

  const onCreateComment = async () => {
    setCommenting(true);
    try {
      const batch = writeBatch(firestore);
      // create a comment
      const commentDocRef = doc(
        collection(
          firestore,
          "posts",
          `${postStateValue.selectedPost?.id as string}/comments`
        )
      );
      const newComment: Comment = {
        id: commentDocRef.id,
        name: userStateValue.userData.fullname,
        username: userStateValue.userData.username,
        postId: postStateValue.selectedPost?.id as string,
        profileImg: userStateValue.userData?.imageURL || "",
        comment: commentText,
        createdAt: serverTimestamp() as Timestamp,
      };

      batch.set(commentDocRef, newComment);

      newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;

      // update post numberOfComments (+1)
      const postDocRef = doc(
        firestore,
        "posts",
        postStateValue.selectedPost?.id as string
      );
      batch.update(postDocRef, {
        numberOfComments: increment(1),
      });

      await batch.commit();

      // updating client recoil state
      setCommentText("");
      setComments((prev) => [newComment, ...prev]);
      setPostStateValue((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! + 1,
        } as Post,
      }));
    } catch (error) {
      console.log("onCreateComment Error", error);
    }
    setCommenting(false);
  };

  const onDeleteComment = async (comment: Comment) => {
    setDeleting(comment.id);
    try {
      const batch = writeBatch(firestore);

      const commentDocRef = doc(
        firestore,
        "posts",
        `${postStateValue.selectedPost?.id as string}/comments/${comment.id}`
      );
      await deleteDoc(commentDocRef);

      // update post numberOfComments
      const postDocRef = doc(
        firestore,
        "posts",
        postStateValue.selectedPost?.id as string
      );
      batch.update(postDocRef, {
        numberOfComments: increment(-1),
      });

      await batch.commit();

      // update recoil client state
      setPostStateValue((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! - 1,
        } as Post,
      }));

      // remove comment from comments array
      setComments((prev) => prev.filter((item) => item.id !== comment.id));
    } catch (error) {
      console.log("onDeleteComment Error", error);
    }
    setDeleting("");
  };

  const onSavePost = async (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    username: string
  ) => {
    event.preventDefault();

    if (!user) {
      router.push("/");
      return;
    }

    try {
      const hasSaved = postStateValue.saved.find((item) => item.id === post.id);

      const batch = writeBatch(firestore);
      const updatedPost = { ...post };
      const updatedPosts = [...postStateValue.posts];
      let savedPosts = [...postStateValue.saved];

      // New Save
      if (!hasSaved) {
        const savePostDocRef = doc(
          collection(firestore, "users", `${username}/saved`)
        );
        const newSave = {
          id: post.id,
          userId: post.userId,
          name: post.name,
          creator: username,
          username: post.username,
          profileImg: post.profileImg || "",
          imageURL: post.imageURL || "",
          caption: post.caption || "",
          location: post.location || "",
          numberOfComments: post.numberOfComments,
          numberOfLikes: post.numberOfLikes,
          createdAt: post.createdAt as Timestamp,
        };

        batch.set(savePostDocRef, newSave);
        savedPosts = [newSave, ...savedPosts];
      } else {
        const savePostDocRef = doc(
          firestore,
          "users",
          `${username}/saved/${hasSaved.id}`
        );

        batch.delete(savePostDocRef);
        savedPosts = savedPosts.filter((save) => save.id !== hasSaved.id);
      }

      // update the state with updated values
      const postIndex = postStateValue.posts.findIndex(
        (item) => item.id === post.id
      );
      updatedPosts[postIndex] = updatedPost;
      setPostStateValue((prev) => ({
        ...prev,
        posts: updatedPosts,
        saved: savedPosts,
      }));

      if (postStateValue.selectedPost) {
        setPostStateValue((prev) => ({
          ...prev,
          selectedPost: updatedPost,
        }));
      }

      await batch.commit();
    } catch (error) {
      console.log("onSavePost Error", error);
    }
  };

  return {
    postStateValue,
    setPostStateValue,
    setUserStateValue,
    onDeletePost,
    likePost,
    onSelectPost,
    onCreateComment,
    commentText,
    setCommentText,
    comments,
    setComments,
    commenting,
    onDeleteComment,
    deleting,
    onSavePost,
  };
};
export default usePosts;
