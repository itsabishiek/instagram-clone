import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";
import { LikePost, Post } from "./postsAtom";

export type UserData = {
  id: string;
  uid: string;
  email: string;
  fullname: string;
  username: string;
  followers: number;
  following: number;
  createdAt?: Timestamp;
  imageURL?: string;
  website?: string;
  bio?: string;
  phoneNumber?: string;
};

export type Following = {
  id: string;
  username: string;
  profileImg: string;
};

interface UserState {
  userData: UserData;
  currUser: UserData;
  following: Following[];
  posts: Post[];
  postsFetched: boolean;
  postDeleted: boolean;
}

const defaultUserDataState: UserState = {
  userData: {} as UserData,
  currUser: {} as UserData,
  following: [] as Following[],
  posts: [],
  postsFetched: false,
  postDeleted: false,
};

export const userDataState = atom<UserState>({
  key: "userAuthState",
  default: defaultUserDataState,
});
