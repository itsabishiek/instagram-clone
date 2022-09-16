import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { Following, UserData, userDataState } from "../atoms/userDataAtom";
import { auth, firestore } from "../firebase/clientApp";

const useFollow = () => {
  const [user] = useAuthState(auth);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [userStateValue, setUserStateValue] = useRecoilState(userDataState);
  const router = useRouter();

  const onFollowOrUnfollowAccount = async (userData: UserData) => {
    const isJoined = !!userStateValue?.following.find(
      (item) => item.username === userData.username
    );

    if (!user) {
      router.push("/login");
      return;
    }

    if (isJoined) {
      onUnfollowAccount(userData);
      return;
    }

    onFollowAccount(userData);
  };

  const onFollowAccount = async (userData: UserData) => {
    setLoadingFollow(true);
    try {
      const batch = writeBatch(firestore);

      const followingDocRef = doc(
        firestore,
        `users/${userStateValue.currUser.username}/following`,
        userData.username
      );

      // create a new following user
      const newFollowing = {
        id: followingDocRef.id,
        username: userData.username,
        profileImg: userData?.imageURL || "",
      };

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
      const targetUserDocUpdate = doc(
        firestore,
        `users/${userData.username}/followers`,
        userStateValue.currUser.username
      );
      const newFollower = {
        id: targetUserDocUpdate.id,
        username: userStateValue.currUser.username,
        profileImg: userStateValue.currUser.imageURL || "",
      };

      batch.set(targetUserDocUpdate, newFollower);
      batch.update(targetUserDocRef, {
        followers: increment(1),
      });

      if (targetUserDocUpdate.id === followingDocRef.id) {
        batch.update(usersDocRef, {
          followers: increment(1),
        });

        batch.set(targetUserDocUpdate, newFollower);
        batch.update(targetUserDocRef, {
          following: increment(1),
        });
      }

      await batch.commit();

      setUserStateValue((prev) => ({
        ...prev,
        following: [...prev.following, newFollowing],
      }));
      setUserStateValue((prev) => ({
        ...prev,
        userData: {
          ...prev.userData,
          followers: prev.userData.followers + 1,
        },
      }));
    } catch (error) {
      console.log("onFollowAccount Error", error);
    }
    setLoadingFollow(false);
  };

  const onUnfollowAccount = async (userData: UserData) => {
    setLoadingFollow(true);
    try {
      const batch = writeBatch(firestore);

      const followingDocRef = doc(
        firestore,
        `users/${userStateValue.currUser.username}/following`,
        userData.username
      );
      batch.delete(followingDocRef);

      const usersDocRef = doc(
        firestore,
        "users",
        userStateValue.currUser.username
      );

      // update the following and followers count by -1
      batch.update(usersDocRef, {
        following: increment(-1),
      });

      const targetUserDocRef = doc(firestore, "users", userData.username);
      const targetUserDocUpdate = doc(
        firestore,
        `users/${userData.username}/followers`,
        userStateValue.currUser.username
      );

      batch.delete(targetUserDocUpdate);
      batch.update(targetUserDocRef, {
        followers: increment(-1),
      });

      if (targetUserDocUpdate.id !== followingDocRef.id) {
        batch.update(usersDocRef, {
          followers: increment(-1),
        });

        batch.delete(targetUserDocUpdate);
        batch.update(targetUserDocRef, {
          following: increment(-1),
        });
      }

      await batch.commit();

      // update client recoil state
      setUserStateValue((prev) => ({
        ...prev,
        following: prev.following.filter(
          (item) => item.username !== userData.username
        ),
      }));
      setUserStateValue((prev) => ({
        ...prev,
        userData: {
          ...prev.userData,
          followers: prev.userData.followers - 1,
        },
      }));
    } catch (error) {
      console.log("onUnfollowAccount Error", error);
    }
    setLoadingFollow(false);
  };

  const getFollowingAccount = async () => {
    setLoadingFollow(true);
    try {
      // get /following account snippet
      const followingDocs = await getDocs(
        collection(
          firestore,
          `users/${userStateValue.currUser.username}/following`
        )
      );
      const following = followingDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUserStateValue((prev) => ({
        ...prev,
        following: following as Following[],
      }));
    } catch (error) {
      console.log("getFollowingAccount Error", error);
    }
    setLoadingFollow(false);
  };

  useEffect(() => {
    if (!user) {
      setUserStateValue((prev) => ({
        ...prev,
        following: [],
      }));
    }
    getFollowingAccount();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return {
    userStateValue,
    setUserStateValue,
    onFollowOrUnfollowAccount,
    loadingFollow,
    setLoadingFollow,
  };
};
export default useFollow;
