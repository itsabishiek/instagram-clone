import { atom } from "recoil";
import { Timestamp } from "firebase/firestore";

export type Post = {
  id: string;
  userId: string;
  name: string;
  username: string;
  profileImg: string;
  caption: string;
  location: string;
  numberOfComments: number;
  numberOfLikes: number;
  imageURL: string;
  createdAt: Timestamp;
};

export type LikePost = {
  id: string;
  username: string;
  postId: string;
};

interface PostState {
  posts: Post[];
  likes: LikePost[];
  hasLiked: boolean;
  postDeleted: boolean;
  selectedPost: Post | null;
}

const defaultPostState: PostState = {
  posts: [],
  likes: [],
  hasLiked: false,
  postDeleted: false,
  selectedPost: null,
};

export const postState = atom<PostState>({
  key: "postState",
  default: defaultPostState,
});
