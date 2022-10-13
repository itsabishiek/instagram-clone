import { atom } from "recoil";

export type ChatUserInfo = {
  displayName: string;
  photoURL: string;
  uid: string;
  username: string;
};

interface Chats {
  combinedId: string;
  chatUserInfo: ChatUserInfo;
}

const defaultChatState: Chats = {
  combinedId: "",
  chatUserInfo: {} as ChatUserInfo,
};

export const chatsAtom = atom({
  key: "chatsAtom",
  default: defaultChatState,
});
