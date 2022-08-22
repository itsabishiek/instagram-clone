import { atom } from "recoil";
import { Timestamp } from "firebase/firestore";

export type Post = {
  id: string;
  uid: string;
  name: string;
  username: string;
  profileImg: string;
  caption: string;
  numberOfComments: number;
  numberOfLikes: number;
  imageURL: string;
  createdAt: Timestamp;
};

interface PostState {
  posts: Post[];
}

const defaultPostState: PostState = {
  posts: [],
};

export const postState = atom<PostState>({
  key: "postState",
  default: defaultPostState,
});
