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
  where,
} from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
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
                <Button
                  h="30px"
                  w="150px"
                  variant={isJoined ? "outline" : "solid"}
                  isLoading={loadingFollow}
                  onClick={() => onFollowOrUnfollowAccount(userData)}
                >
                  {isJoined ? "Following" : "Follow"}
                </Button>
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
                <Button
                  h="30px"
                  w="120px"
                  mr={2}
                  variant={isJoined ? "outline" : "solid"}
                  isLoading={loadingFollow}
                  onClick={() => onFollowOrUnfollowAccount(userData)}
                >
                  {isJoined ? "Following" : "Follow"}
                </Button>
              )}

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
