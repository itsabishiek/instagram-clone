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

interface PostState {
  posts: Post[];
  postDeleted: boolean;
}

const defaultPostState: PostState = {
  posts: [],
  postDeleted: false,
};

export const postState = atom<PostState>({
  key: "postState",
  default: defaultPostState,
});
