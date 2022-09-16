import {
  Center,
  Flex,
  Grid,
  Image,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useRecoilValue } from "recoil";
import { Post, postState } from "../../atoms/postsAtom";
import { userDataState } from "../../atoms/userDataAtom";
import { auth, firestore } from "../../firebase/clientApp";
import Posts from "../post/Posts";

type ProfileTabsProps = {
  posts: Post[];
  postsFetched: boolean;
};

const ProfileTabs: React.FC<ProfileTabsProps> = ({ posts, postsFetched }) => {
  const [user] = useAuthState(auth);
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const userStateValue = useRecoilValue(userDataState);
  const [loading, setLoading] = useState(false);
  const { username } = useRouter().query;

  const handleSavedPost = async () => {
    setLoading(true);
    try {
      const savePostQuery = query(
        collection(
          firestore,
          "users",
          `${userStateValue.currUser.username}/saved`
        ),
        where("creator", "==", userStateValue.currUser.username)
      );
      const savedPosts = await getDocs(savePostQuery);
      const saved = savedPosts.docs.map((doc) => doc.data());
      setPostStateValue((prev) => ({
        ...prev,
        saved: saved as Post[],
      }));
    } catch (error) {
      console.log("handleSavedPost Error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      handleSavedPost();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Tabs
        w="100%"
        isFitted={false}
        pt={6}
        display={{ base: "none", md: "flex" }}
        flexDirection="column"
        alignItems="center"
      >
        <TabList
          display="flex"
          justifyContent="center"
          w="100%"
          borderBottom="1px solid rgb(219,219,219)"
        >
          <Tab
            mr={{ base: "0px", md: "40px" }}
            _selected={{ borderColor: "#262626" }}
          >
            <svg
              aria-label=""
              color="#262626"
              fill="#262626"
              height="12"
              role="img"
              viewBox="0 0 24 24"
              width="12"
            >
              <rect
                fill="none"
                height="18"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                width="18"
                x="3"
                y="3"
              ></rect>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="9.015"
                x2="9.015"
                y1="3"
                y2="21"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="14.985"
                x2="14.985"
                y1="3"
                y2="21"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="21"
                x2="3"
                y1="9.015"
                y2="9.015"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="21"
                x2="3"
                y1="14.985"
                y2="14.985"
              ></line>
            </svg>
            <Text
              fontSize="10pt"
              display={{ base: "none", md: "unset" }}
              ml={2}
              color="#262626"
            >
              POSTS
            </Text>
          </Tab>
          <Tab
            mr={{ base: "0px", md: "40px" }}
            _selected={{ borderColor: "#262626" }}
          >
            {username === userStateValue.currUser.username ? (
              <svg
                aria-label=""
                color="#8e8e8e"
                fill="#8e8e8e"
                height="12"
                role="img"
                viewBox="0 0 24 24"
                width="12"
              >
                <polygon
                  fill="none"
                  points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></polygon>
              </svg>
            ) : (
              <svg
                aria-label=""
                color="#262626"
                fill="#262626"
                height="12"
                role="img"
                viewBox="0 0 24 24"
                width="12"
              >
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="2.049"
                  x2="21.95"
                  y1="7.002"
                  y2="7.002"
                ></line>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="13.504"
                  x2="16.362"
                  y1="2.001"
                  y2="7.002"
                ></line>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="7.207"
                  x2="10.002"
                  y1="2.11"
                  y2="7.002"
                ></line>
                <path
                  d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
                <path
                  d="M9.763 17.664a.908.908 0 01-.454-.787V11.63a.909.909 0 011.364-.788l4.545 2.624a.909.909 0 010 1.575l-4.545 2.624a.91.91 0 01-.91 0z"
                  fillRule="evenodd"
                ></path>
              </svg>
            )}

            <Text
              fontSize="10pt"
              display={{ base: "none", md: "unset" }}
              ml={2}
              color="#262626"
            >
              {username === userStateValue.currUser.username
                ? "SAVED"
                : "REELS"}
            </Text>
          </Tab>
          <Tab _selected={{ borderColor: "#262626" }}>
            <svg
              aria-label=""
              color="#8e8e8e"
              fill="#8e8e8e"
              height="12"
              role="img"
              viewBox="0 0 24 24"
              width="12"
            >
              <path
                d="M10.201 3.797L12 1.997l1.799 1.8a1.59 1.59 0 001.124.465h5.259A1.818 1.818 0 0122 6.08v14.104a1.818 1.818 0 01-1.818 1.818H3.818A1.818 1.818 0 012 20.184V6.08a1.818 1.818 0 011.818-1.818h5.26a1.59 1.59 0 001.123-.465z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <path
                d="M18.598 22.002V21.4a3.949 3.949 0 00-3.948-3.949H9.495A3.949 3.949 0 005.546 21.4v.603"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <circle
                cx="12.072"
                cy="11.075"
                fill="none"
                r="3.556"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></circle>
            </svg>
            <Text
              fontSize="10pt"
              display={{ base: "none", md: "unset" }}
              ml={2}
              color="#262626"
            >
              TAGGED
            </Text>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel p="0rem !important" m="0rem !important">
            {posts.length === 0 ? (
              <Flex
                w="100%"
                mt={3}
                flexDir={{ base: "column-reverse", md: "row" }}
              >
                <Image src="/img/mediaUpsell.jpg" alt="" w="380px" h="380px" />

                <Stack
                  w="100%"
                  h={{ md: "380px" }}
                  align="center"
                  justify="center"
                  p={{ base: "40px 0px" }}
                  textAlign="center"
                >
                  <Text fontWeight={700} fontSize={{ base: "11pt" }}>
                    Start capturing and sharing your moments.
                  </Text>
                  <Text fontSize="10pt">
                    Get the app to share your first photo or video.
                  </Text>
                  <Flex justify="center" pt={2}>
                    <Image
                      src="https://iconape.com/wp-content/png_logo_vector/download-on-the-app-store-flat-badge-logo.png"
                      alt=""
                      w="136px"
                      mr={2}
                    />
                    <Image
                      src="https://iconape.com/wp-content/png_logo_vector/get-it-on-google-play-2016-logo.png"
                      alt=""
                      w="136px"
                    />
                  </Flex>
                </Stack>
              </Flex>
            ) : (
              <>
                {!postsFetched ? (
                  <Spinner />
                ) : (
                  <Grid templateColumns="repeat(3, 1fr)" gap={6} p="20px 0px">
                    {posts?.map((post) => (
                      <Posts key={post.id} post={post} />
                    ))}
                  </Grid>
                )}
              </>
            )}
          </TabPanel>

          {username === userStateValue.currUser.username ? (
            <TabPanel p="0rem !important" m="0rem !important">
              {postStateValue.saved.length === 0 ? (
                <Flex
                  flexDir="column"
                  align="center"
                  justify="center"
                  margin="60px 44px"
                >
                  <Flex
                    border="1px solid"
                    borderColor="black"
                    borderRadius="full"
                  >
                    <Image
                      src="https://cdn.icon-icons.com/icons2/3138/PNG/512/bookmark_save_storage_basic_icon_192482.png"
                      alt=""
                      h="50px"
                      w="50px"
                      m="8px"
                    />
                  </Flex>
                  <Text
                    fontWeight="light"
                    fontSize="18pt"
                    mt={3}
                    mb={2}
                    textAlign="center"
                  >
                    Saved photos and reels
                  </Text>
                  <Text fontSize="11pt" color="black" textAlign="center">
                    {`When photos/reels that you saved, they'll appear here.`}
                  </Text>
                </Flex>
              ) : (
                <>
                  {loading ? (
                    <Flex height="40vh" align="center" justify="center">
                      <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="lg"
                      />
                    </Flex>
                  ) : (
                    <Grid templateColumns="repeat(3, 1fr)" gap={6} p="20px 0px">
                      {postStateValue.saved?.map((post) => (
                        <Posts key={post.id} post={post} />
                      ))}
                    </Grid>
                  )}
                </>
              )}
            </TabPanel>
          ) : (
            <TabPanel p="0rem !important" m="0rem !important">
              <Flex
                flexDir="column"
                align="center"
                justify="center"
                margin="60px 44px"
              >
                <Center
                  border="1px solid"
                  borderColor="black"
                  borderRadius="full"
                  h="65px"
                  w="65px"
                >
                  <svg
                    aria-label=""
                    color="#262626"
                    fill="#262626"
                    height="40"
                    role="img"
                    viewBox="0 0 24 24"
                    width="40"
                  >
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="2.049"
                      x2="21.95"
                      y1="7.002"
                      y2="7.002"
                    ></line>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="13.504"
                      x2="16.362"
                      y1="2.001"
                      y2="7.002"
                    ></line>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="7.207"
                      x2="10.002"
                      y1="2.11"
                      y2="7.002"
                    ></line>
                    <path
                      d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                    <path
                      d="M9.763 17.664a.908.908 0 01-.454-.787V11.63a.909.909 0 011.364-.788l4.545 2.624a.909.909 0 010 1.575l-4.545 2.624a.91.91 0 01-.91 0z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </Center>
                <Text
                  fontWeight={500}
                  fontSize="15pt"
                  mt={3}
                  mb={2}
                  textAlign="center"
                >
                  Get the app to share your first photo or video.
                </Text>
                <Text
                  fontWeight="light"
                  fontSize="12pt"
                  mt={1}
                  textAlign="center"
                >
                  Start capturing and sharing your moments.
                </Text>
              </Flex>
            </TabPanel>
          )}

          <TabPanel>
            <Flex
              flexDir="column"
              align="center"
              justify="center"
              margin="60px 44px"
            >
              <Flex border="1px solid" borderColor="black" borderRadius="full">
                <Image
                  src="https://static.thenounproject.com/png/771247-200.png"
                  alt=""
                  h="50px"
                  w="50px"
                  m="8px"
                />
              </Flex>
              <Text
                fontWeight="light"
                fontSize="18pt"
                mt={3}
                mb={2}
                textAlign="center"
              >
                Photos of you
              </Text>
              <Text fontSize="11pt" color="black" textAlign="center">
                {`When people tag you in photos, they'll appear here.`}
              </Text>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Tabs
        w="100%"
        isFitted={true}
        display={{ base: "unset", md: "none" }}
        borderBottom="1px solid rgb(219,219,219)"
      >
        <TabList border="none" pt={2} gap="25px">
          <Tab
            mr={{ base: "0px", md: "40px" }}
            _selected={{ borderColor: "#262626" }}
          >
            <svg
              aria-label="Posts"
              color="#8e8e8e"
              fill="#8e8e8e"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <rect
                fill="none"
                height="18"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                width="18"
                x="3"
                y="3"
              ></rect>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="9.015"
                x2="9.015"
                y1="3"
                y2="21"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="14.985"
                x2="14.985"
                y1="3"
                y2="21"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="21"
                x2="3"
                y1="9.015"
                y2="9.015"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="21"
                x2="3"
                y1="14.985"
                y2="14.985"
              ></line>
            </svg>
          </Tab>
          <Tab
            mr={{ base: "0px", md: "40px" }}
            _selected={{ borderColor: "#262626" }}
          >
            {username === userStateValue.currUser.username ? (
              <svg
                aria-label="Saved"
                color="#8e8e8e"
                fill="#8e8e8e"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <polygon
                  fill="none"
                  points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></polygon>
              </svg>
            ) : (
              <svg
                aria-label="Reels"
                color="#8e8e8e"
                fill="#8e8e8e"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="2.049"
                  x2="21.95"
                  y1="7.002"
                  y2="7.002"
                ></line>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="13.504"
                  x2="16.362"
                  y1="2.001"
                  y2="7.002"
                ></line>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="7.207"
                  x2="10.002"
                  y1="2.11"
                  y2="7.002"
                ></line>
                <path
                  d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
                <path
                  d="M9.763 17.664a.908.908 0 01-.454-.787V11.63a.909.909 0 011.364-.788l4.545 2.624a.909.909 0 010 1.575l-4.545 2.624a.91.91 0 01-.91 0z"
                  fillRule="evenodd"
                ></path>
              </svg>
            )}
          </Tab>
          <Tab _selected={{ borderColor: "#262626" }}>
            <svg
              aria-label="Tagged"
              color="#8e8e8e"
              fill="#8e8e8e"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <path
                d="M10.201 3.797L12 1.997l1.799 1.8a1.59 1.59 0 001.124.465h5.259A1.818 1.818 0 0122 6.08v14.104a1.818 1.818 0 01-1.818 1.818H3.818A1.818 1.818 0 012 20.184V6.08a1.818 1.818 0 011.818-1.818h5.26a1.59 1.59 0 001.123-.465z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <path
                d="M18.598 22.002V21.4a3.949 3.949 0 00-3.948-3.949H9.495A3.949 3.949 0 005.546 21.4v.603"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <circle
                cx="12.072"
                cy="11.075"
                fill="none"
                r="3.556"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></circle>
            </svg>
            <Text
              fontSize="10pt"
              display={{ base: "none", md: "unset" }}
              ml={2}
              color="#262626"
            >
              TAGGED
            </Text>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel p="0rem !important" m="0rem !important">
            {posts.length === 0 ? (
              <Flex
                w="100%"
                mt={3}
                flexDir={{ base: "column-reverse", md: "row" }}
                p="30px 20px 0px"
              >
                <Image src="/img/mediaUpsell.jpg" alt="" w="380px" h="380px" />

                <Stack
                  w="100%"
                  h={{ md: "380px" }}
                  align="center"
                  justify="center"
                  p={{ base: "40px 0px" }}
                  textAlign="center"
                >
                  <Text fontWeight={700} fontSize={{ base: "11pt" }}>
                    Start capturing and sharing your moments.
                  </Text>
                  <Text fontSize="10pt">
                    Get the app to share your first photo or video.
                  </Text>
                  <Flex justify="center" pt={2}>
                    <Image
                      src="https://iconape.com/wp-content/png_logo_vector/download-on-the-app-store-flat-badge-logo.png"
                      alt=""
                      w="136px"
                      mr={2}
                    />
                    <Image
                      src="https://iconape.com/wp-content/png_logo_vector/get-it-on-google-play-2016-logo.png"
                      alt=""
                      w="136px"
                    />
                  </Flex>
                </Stack>
              </Flex>
            ) : (
              <>
                {!postsFetched ? (
                  <Spinner />
                ) : (
                  <Grid
                    templateColumns="repeat(3, 1fr)"
                    p={{ base: "0px", md: "20px 0px" }}
                    gap={{ base: 1, md: 6 }}
                  >
                    {posts?.map((post) => (
                      <Posts key={post.id} post={post} />
                    ))}
                  </Grid>
                )}
              </>
            )}
          </TabPanel>

          {username === userStateValue.currUser.username ? (
            <TabPanel p="0rem !important" m="0rem !important">
              {postStateValue.saved.length === 0 ? (
                <Flex
                  flexDir="column"
                  align="center"
                  justify="center"
                  margin="60px 44px"
                >
                  <Flex
                    border="1px solid"
                    borderColor="black"
                    borderRadius="full"
                  >
                    <Image
                      src="https://cdn.icon-icons.com/icons2/3138/PNG/512/bookmark_save_storage_basic_icon_192482.png"
                      alt=""
                      h="50px"
                      w="50px"
                      m="8px"
                    />
                  </Flex>
                  <Text
                    fontWeight="light"
                    fontSize="15pt"
                    mt={3}
                    mb={2}
                    textAlign="center"
                  >
                    Saved photos and reels
                  </Text>
                  <Text fontSize="10pt" color="black" textAlign="center">
                    {`When photos/reels that you saved, they'll appear here.`}
                  </Text>
                </Flex>
              ) : (
                <>
                  {loading ? (
                    <Flex height="40vh" align="center" justify="center">
                      <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="lg"
                      />
                    </Flex>
                  ) : (
                    <Grid templateColumns="repeat(3, 1fr)" gap={1} p="0px">
                      {postStateValue.saved?.map((post) => (
                        <Posts key={post.id} post={post} />
                      ))}
                    </Grid>
                  )}
                </>
              )}
            </TabPanel>
          ) : (
            <TabPanel p="0rem !important" m="0rem !important">
              <Flex
                flexDir="column"
                align="center"
                justify="center"
                margin="60px 44px"
              >
                <Center
                  border="1px solid"
                  borderColor="black"
                  borderRadius="full"
                  h="65px"
                  w="65px"
                >
                  <svg
                    aria-label=""
                    color="#262626"
                    fill="#262626"
                    height="40"
                    role="img"
                    viewBox="0 0 24 24"
                    width="40"
                  >
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="2.049"
                      x2="21.95"
                      y1="7.002"
                      y2="7.002"
                    ></line>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="13.504"
                      x2="16.362"
                      y1="2.001"
                      y2="7.002"
                    ></line>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="7.207"
                      x2="10.002"
                      y1="2.11"
                      y2="7.002"
                    ></line>
                    <path
                      d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                    <path
                      d="M9.763 17.664a.908.908 0 01-.454-.787V11.63a.909.909 0 011.364-.788l4.545 2.624a.909.909 0 010 1.575l-4.545 2.624a.91.91 0 01-.91 0z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </Center>
                <Text
                  fontWeight={500}
                  fontSize="14pt"
                  mt={3}
                  mb={2}
                  textAlign="center"
                >
                  Get the app to share your first photo or video.
                </Text>
                <Text
                  fontWeight="light"
                  fontSize="12pt"
                  mt={1}
                  textAlign="center"
                >
                  Start capturing and sharing your moments.
                </Text>
              </Flex>
            </TabPanel>
          )}
          <TabPanel>
            <Flex
              flexDir="column"
              align="center"
              justify="center"
              margin="60px 44px"
            >
              <Flex border="1px solid" borderColor="black" borderRadius="full">
                <Image
                  src="https://static.thenounproject.com/png/771247-200.png"
                  alt=""
                  h="50px"
                  w="50px"
                  m="8px"
                />
              </Flex>
              <Text
                fontWeight="light"
                fontSize="15pt"
                mt={3}
                mb={2}
                textAlign="center"
              >
                Photos of you
              </Text>
              <Text fontSize="10pt" color="black" textAlign="center">
                {`When people tag you in photos, they'll appear here.`}
              </Text>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
export default ProfileTabs;
