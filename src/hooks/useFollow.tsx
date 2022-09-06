import { doc, increment, writeBatch } from "firebase/firestore";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { UserData, userDataState } from "../atoms/userDataAtom";
import { firestore } from "../firebase/clientApp";

const useFollow = () => {
  const [loading, setLoading] = useState(false);
  const [userStateValue, setUserStateValue] = useRecoilState(userDataState);

  const onFollowOrUnfollowAccount = async () => {};

  const onFollowAccount = async (userData: UserData) => {
    setLoading(true);
    try {
      const batch = writeBatch(firestore);

      // create a new following user
      const newFollowing = {
        username: userData.username,
        profileImg: userData?.imageURL || "",
      };

      const followingDocRef = doc(
        firestore,
        `users/${userStateValue.currUser.username}/following`,
        userData.username
      );
      batch.set(followingDocRef, newFollowing);

      const usersDocRef = doc(
        firestore,
        "users",
        userStateValue.currUser.username
      );
      batch.update(usersDocRef, {
        following: increment(1),
      });
      const targetUserDocRef = doc(firestore, "users", userData.username);
      batch.update(targetUserDocRef, {
        followers: increment(1),
      });

      await batch.commit();

      setUserStateValue((prev) => ({
        ...prev,
        following: [...prev.following, newFollowing],
      }));
    } catch (error) {
      console.log("onFollowAccount Error", error);
    }
    setLoading(false);
  };

  const onUnfollowAccount = async () => {
    setLoading(true);
    try {
    } catch (error) {
      console.log("onUnfollowAccount Error", error);
    }
    setLoading(false);
  };

  return {
    onFollowOrUnfollowAccount,
    onFollowAccount,
    onUnfollowAccount,
    loading,
  };
};
export default useFollow;
