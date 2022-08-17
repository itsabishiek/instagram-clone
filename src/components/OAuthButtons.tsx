import { Button, Image, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";

type OAuthButtonsProps = {
  login?: boolean;
};

const OAuthButtons: React.FC<OAuthButtonsProps> = ({ login }) => {
  const [signInWithGoogle, user, userLoading, error] =
    useSignInWithGoogle(auth);
  const [loading, setLoading] = useState(false);

  const createUserDocument = async (user: User) => {
    setLoading(true);
    try {
      await addDoc(collection(firestore, "users"), {
        uid: user.uid,
        fullname: user.displayName,
        username: user.displayName?.toLowerCase().split(" ")[0],
        email: user.email,
        follower: 0,
        following: 0,
        createdAt: serverTimestamp(),
      });
      router.push("/");
    } catch (error) {
      console.log("createUserDocument Error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      createUserDocument(user.user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  console.log(user);

  return (
    <>
      <Button
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        h="30px"
        isLoading={loading}
        onClick={() => signInWithGoogle()}
        variant={login ? "outline" : "solid"}
      >
        <Image
          src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
          alt=""
          h="25px"
          mr={1}
        />
        <Text fontWeight={600} fontSize="10pt" color={login ? "#333" : "white"}>
          Log in with Google
        </Text>
      </Button>

      {error && (
        <Text textAlign="center" fontSize="10pt" color="red" mt={2}>
          {error.message}
        </Text>
      )}
    </>
  );
};
export default OAuthButtons;
