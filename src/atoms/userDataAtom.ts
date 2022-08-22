import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

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

interface UserState {
  userData: UserData;
}

const defaultUserDataState = {
  userData: {} as UserData,
};

export const userDataState = atom<UserState>({
  key: "userAuthState",
  default: defaultUserDataState,
});
