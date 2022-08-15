import { User } from "firebase/auth";
import { query, collection, where, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { userDataState, UserData } from "../atoms/userDataAtom";
import { auth, firestore } from "../firebase/clientApp";

const useUserData = () => {
  const [user] = useAuthState(auth);
  const [userStateValue, setUserStateValue] = useRecoilState(userDataState);

  const getUserData = async (user: User) => {
    try {
      const userQuery = query(
        collection(firestore, "users"),
        where("uid", "==", user.uid)
      );
      const userDoc = await getDocs(userQuery);
      const userData = userDoc.docs.map((doc) => doc.data());
      setUserStateValue((prev) => ({
        ...prev,
        userData: userData[0] as UserData,
      }));
    } catch (error) {
      console.log("getUserData Error", error);
    }
  };

  useEffect(() => {
    if (user) {
      getUserData(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  //   console.log(userStateValue);

  return {
    userStateValue,
    setUserStateValue,
  };
};

export default useUserData;
