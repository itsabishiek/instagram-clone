import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import safeJsonStringify from "safe-json-stringify";
import { Post } from "../../atoms/postsAtom";
import { UserData } from "../../atoms/userDataAtom";
import PageNotFound from "../../components/PageNotFound";
import ProfileTabs from "../../components/tabs/ProfileTabs";
import { auth, firestore } from "../../firebase/clientApp";
import useFollow from "../../hooks/useFollow";

type ProfilePageProps = {
  userData: UserData;
};

const ProfilePage: React.FC<ProfilePageProps> = ({ userData }) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    userStateValue,
    setUserStateValue,
    onFollowOrUnfollowAccount,
    loadingFollow,
  } = useFollow();
  const router = useRouter();

  const getUserPosts = async () => {
    setLoading(true);
    try {
      const userPostsQuery = query(
        collection(firestore, "posts"),
        where("username", "==", userData.username),
        orderBy("createdAt", "desc")
      );
      const userPostsDocs = await getDocs(userPostsQuery);
      const posts = userPostsDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
        postsFetched: true,
      }));
    } catch (error) {
      console.log("getUserPosts Error", error);
    }
    setLoading(false);
  };

  const getUserData = async (user: User) => {
    setLoading(true);
    try {
      const userQuery = query(
        collection(firestore, "users"),
        where("uid", "==", user.uid)
      );
      const userDoc = await getDocs(userQuery);
      const userData = userDoc.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserStateValue((prev) => ({
        ...prev,
        currUser: userData[0] as UserData,
      }));
    } catch (error) {
      console.log("getUserData Error", error);
    }
    setLoading(false);
  };

  const handleSelectUser = async () => {
    // check whether the group(chats in firestore) exists, if not create
    const combinedId =
      userStateValue.currUser.username > userStateValue.userData.username
        ? userStateValue.currUser.username +
          "and" +
          userStateValue.userData.username
        : userStateValue.userData.username +
          "and" +
          userStateValue.currUser.username;

    try {
      setLoading(true);
      const chatsRef = await getDoc(doc(firestore, `chats/${combinedId}`));

      if (!chatsRef.exists()) {
        // create a doc in chats collection
        await setDoc(doc(firestore, "chats", combinedId), {
          messages: [],
        });

        // update userChats
        await updateDoc(
          doc(
            firestore,
            `users/${userStateValue.currUser.username}`,
            `userChats/${userStateValue.currUser.uid}`
          ),
          {
            [combinedId + ".userInfo"]: {
              uid: userData.uid,
              displayName: userData.fullname,
              username: userData.username,
              photoURL: userData.imageURL,
            },
            [combinedId + ".createdAt"]: serverTimestamp(),
          }
        );

        await updateDoc(
          doc(
            firestore,
            `users/${userStateValue.userData.username}`,
            `userChats/${userStateValue.userData.uid}`
          ),
          {
            [combinedId + ".userInfo"]: {
              uid: userStateValue.currUser.uid,
              displayName: userStateValue.currUser.fullname,
              username: userStateValue.currUser.username,
              photoURL: userStateValue.currUser.imageURL,
            },
            [combinedId + ".createdAt"]: serverTimestamp(),
          }
        );
      }

      router.push(`/direct/t/${combinedId}`);
    } catch (error) {
      console.log("handleSelectUser Error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setUserStateValue((prev) => ({
      ...prev,
      userData: userData,
    }));
    if (user) {
      getUserData(user);
    }
    getUserPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  if (!userData) {
    return <PageNotFound />;
  }

  const isJoined = !!userStateValue?.following.find(
    (item) => item.username === userData.username
  );

  console.log(isJoined);

  return (
    <>
      <Head>
        <title>
          {userData?.fullname} {`(@${userData?.username})`} • Instagram
        </title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png"
        />
      </Head>

      <Box flexGrow={1} m="0px auto 30px" maxW="935px" pb="40px">
        <Flex flexDirection={{ base: "column", md: "row" }} p="30px 20px 0px">
          <Flex
            mr="30px"
            flexGrow={{ base: 0, md: 1 }}
            flexShrink={0}
            align={{ base: "unset", md: "center" }}
            justify={{ base: "unset", md: "center" }}
            mb={{ base: 3, md: 0 }}
          >
            <Center
              w={{ base: "80px", md: "156px" }}
              h={{ base: "80px", md: "156px" }}
              border="1px solid"
              borderColor="#cecece"
              borderRadius="50%"
            >
              <Avatar
                src={userData?.imageURL}
                w={{ base: "77px", md: "150px" }}
                h={{ base: "77px", md: "150px" }}
                bg="gray.200"
                border={{
                  base: "3px solid rgb(250, 250, 250)",
                  md: "6px solid rgb(250, 250, 250)",
                }}
              />
            </Center>

            <Stack
              align="left"
              justify="center"
              display={{ base: "flex", md: "none" }}
              flexBasis={0}
              flexGrow={1}
              w="100%"
              ml="30px"
            >
              <Flex align="center">
                <Text fontSize="28px" color="#262626" fontWeight="light" mr={4}>
                  {userData.username}
                </Text>
                {user?.email === userData.email ? (
                  <svg
                    aria-label="Options"
                    color="#262626"
                    fill="#262626"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                    cursor="pointer"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      fill="none"
                      r="8.635"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></circle>
                    <path
                      d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096"
                      fill="none"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    aria-label="Options"
                    color="#262626"
                    fill="#262626"
                    height="32"
                    role="img"
                    viewBox="0 0 24 24"
                    width="32"
                    cursor="pointer"
                  >
                    <circle cx="12" cy="12" r="1.5"></circle>
                    <circle cx="6" cy="12" r="1.5"></circle>
                    <circle cx="18" cy="12" r="1.5"></circle>
                  </svg>
                )}
              </Flex>

              {user?.email === userData.email ? (
                <Link href="/accounts/edit">
                  <Button
                    variant="outline"
                    color="#262626"
                    border="1px solid rgb(219,219,219)"
                    fontSize="10pt"
                    p="5px 9px"
                    mr={2}
                    w="100%"
                  >
                    Edit Profile
                  </Button>
                </Link>
              ) : (
                <>
                  {isJoined ? (
                    <Flex align="center" gap="8px" mr={3}>
                      <Button
                        variant="outline"
                        h="30px"
                        w="85px"
                        color="inherit"
                        onClick={handleSelectUser}
                        isLoading={loading}
                      >
                        Message
                      </Button>
                      <Button variant="outline" h="30px" w="60px">
                        <svg
                          aria-label="Following"
                          color="#262626"
                          fill="#262626"
                          height="15"
                          role="img"
                          viewBox="0 0 95.28 70.03"
                          width="20"
                        >
                          <path d="M64.23 69.98c-8.66 0-17.32-.09-26 0-3.58.06-5.07-1.23-5.12-4.94-.16-11.7 8.31-20.83 20-21.06 7.32-.15 14.65-.14 22 0 11.75.22 20.24 9.28 20.1 21 0 3.63-1.38 5.08-5 5-8.62-.1-17.28 0-25.98 0Zm19-50.8A19 19 0 1 1 64.32 0a19.05 19.05 0 0 1 18.91 19.18ZM14.76 50.01a5 5 0 0 1-3.37-1.31L.81 39.09a2.5 2.5 0 0 1-.16-3.52l3.39-3.7a2.49 2.49 0 0 1 3.52-.16l7.07 6.38 15.73-15.51a2.48 2.48 0 0 1 3.52 0l3.53 3.58a2.49 2.49 0 0 1 0 3.52L18.23 48.57a5 5 0 0 1-3.47 1.44Z"></path>
                        </svg>
                      </Button>
                      <Button variant="outline" h="30px" w="34px">
                        <svg
                          aria-label="Down chevron icon"
                          color="#262626"
                          fill="#262626"
                          height="12"
                          role="img"
                          viewBox="0 0 24 24"
                          width="12"
                          style={{ transform: "rotate(180deg)" }}
                        >
                          <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
                        </svg>
                      </Button>
                    </Flex>
                  ) : (
                    <Button
                      h="30px"
                      w="150px"
                      variant="solid"
                      isLoading={loadingFollow}
                      onClick={() => onFollowOrUnfollowAccount(userData)}
                    >
                      Follow
                    </Button>
                  )}
                </>
              )}
            </Stack>
          </Flex>

          <Stack pt={1} pb={2} display={{ base: "flex", md: "none" }}>
            <Text fontWeight={700} color="#262626">
              {userData.fullname}
            </Text>
            <Stack fontSize="9pt">
              <Text w="300px">{userData?.bio}</Text>
            </Stack>
          </Stack>

          <Stack flexGrow={3} flexBasis="30px" flexShrink={1}>
            <Flex align="center" display={{ base: "none", md: "flex" }}>
              <Text fontSize="28px" color="#262626" fontWeight="light" mr={6}>
                {userData.username}
              </Text>

              {user?.email === userData.email ? (
                <Link href="/accounts/edit">
                  <Button
                    variant="outline"
                    color="#262626"
                    fontSize="10pt"
                    fontWeight="light"
                    p="5px 9px"
                    mr={2}
                  >
                    Edit Profile
                  </Button>
                </Link>
              ) : (
                <>
                  {isJoined ? (
                    <Flex align="center" gap="8px" mr={3}>
                      <Button
                        variant="outline"
                        h="30px"
                        w="85px"
                        color="inherit"
                        onClick={handleSelectUser}
                        isLoading={loading}
                      >
                        Message
                      </Button>
                      <Button variant="outline" h="30px" w="60px">
                        <svg
                          aria-label="Following"
                          color="#262626"
                          fill="#262626"
                          height="15"
                          role="img"
                          viewBox="0 0 95.28 70.03"
                          width="20"
                        >
                          <path d="M64.23 69.98c-8.66 0-17.32-.09-26 0-3.58.06-5.07-1.23-5.12-4.94-.16-11.7 8.31-20.83 20-21.06 7.32-.15 14.65-.14 22 0 11.75.22 20.24 9.28 20.1 21 0 3.63-1.38 5.08-5 5-8.62-.1-17.28 0-25.98 0Zm19-50.8A19 19 0 1 1 64.32 0a19.05 19.05 0 0 1 18.91 19.18ZM14.76 50.01a5 5 0 0 1-3.37-1.31L.81 39.09a2.5 2.5 0 0 1-.16-3.52l3.39-3.7a2.49 2.49 0 0 1 3.52-.16l7.07 6.38 15.73-15.51a2.48 2.48 0 0 1 3.52 0l3.53 3.58a2.49 2.49 0 0 1 0 3.52L18.23 48.57a5 5 0 0 1-3.47 1.44Z"></path>
                        </svg>
                      </Button>
                      <Button variant="outline" h="30px" w="34px">
                        <svg
                          aria-label="Down chevron icon"
                          color="#262626"
                          fill="#262626"
                          height="12"
                          role="img"
                          viewBox="0 0 24 24"
                          width="12"
                          style={{ transform: "rotate(180deg)" }}
                        >
                          <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
                        </svg>
                      </Button>
                    </Flex>
                  ) : (
                    <Button
                      h="30px"
                      w="120px"
                      mr={2}
                      variant="solid"
                      isLoading={loadingFollow}
                      onClick={() => onFollowOrUnfollowAccount(userData)}
                    >
                      Follow
                    </Button>
                  )}
                </>
              )}

              {user?.email === userData.email ? (
                <svg
                  aria-label="Options"
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                  cursor="pointer"
                >
                  <circle
                    cx="12"
                    cy="12"
                    fill="none"
                    r="8.635"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></circle>
                  <path
                    d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096"
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              ) : (
                <svg
                  aria-label="Options"
                  color="#262626"
                  fill="#262626"
                  height="32"
                  role="img"
                  viewBox="0 0 24 24"
                  width="32"
                  cursor="pointer"
                >
                  <circle cx="12" cy="12" r="1.5"></circle>
                  <circle cx="6" cy="12" r="1.5"></circle>
                  <circle cx="18" cy="12" r="1.5"></circle>
                </svg>
              )}
            </Flex>

            <Flex
              align="center"
              gap={{ base: "0px", md: "40px" }}
              pt={3}
              pb={{ base: 3, md: 0 }}
              borderTop={{ base: "1px solid rgb(219,219,219)", md: "none" }}
              borderBottom={{
                base: "1px solid rgb(219,219,219)",
                md: "none",
              }}
              justify={{ base: "space-around", md: "left" }}
              fontSize="12pt"
              color="#8e8e8e"
              fontWeight={500}
            >
              <Flex
                flexDirection={{ base: "column", md: "row" }}
                align="center"
              >
                <Text fontWeight={600} mr={1} color="#262626">
                  {userStateValue.posts.length}
                </Text>
                <Text fontWeight="light">posts</Text>
              </Flex>
              <Flex
                flexDirection={{ base: "column", md: "row" }}
                align="center"
              >
                <Text fontWeight={600} mr={1} color="#262626">
                  {userData.followers}
                </Text>
                <Text fontWeight="light">followers</Text>
              </Flex>
              <Flex
                flexDirection={{ base: "column", md: "row" }}
                align="center"
              >
                <Text fontWeight={600} mr={1} color="#262626">
                  {userData.following}
                </Text>
                <Text fontWeight="light">following</Text>
              </Flex>
            </Flex>

            <Stack pt={4} display={{ base: "none", md: "unset" }}>
              <Text fontWeight={700} color="#262626">
                {userData.fullname}
              </Text>
              <Stack fontSize="14px">
                <Text w="300px">{userData?.bio}</Text>
              </Stack>
            </Stack>
          </Stack>
        </Flex>

        <ProfileTabs
          posts={userStateValue.posts}
          postsFetched={userStateValue.postsFetched}
        />
      </Box>
    </>
  );
};
export default ProfilePage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const userDocRef = doc(
      firestore,
      "users",
      context.query.username as string
    );
    const userDoc = await getDoc(userDocRef);

    return {
      props: {
        userData: userDoc.exists()
          ? JSON.parse(safeJsonStringify({ id: userDoc.id, ...userDoc.data() }))
          : "",
      },
    };
  } catch (error) {
    console.log("getServerSideProps Error", error);
  }
}
