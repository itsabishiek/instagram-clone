import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type UserData = {
  uid: string;
  email: string;
  fullname: string;
  username: string;
  createdAt?: Timestamp;
  imageURL?: string;
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
