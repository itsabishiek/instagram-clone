import { User } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { UserData, userDataState } from "../atoms/userDataAtom";
import { auth, firestore } from "../firebase/clientApp";

const useUserData = () => {
  const [user] = useAuthState(auth);
  const [userStateValue, setUserStateValue] = useRecoilState(userDataState);
  const [loading, setLoading] = useState(false);

  const getUserData = async (user: User) => {
    setLoading(true);
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
    setLoading(false);
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
    loading,
  };
};

export default useUserData;
