import {
  Tabs,
  TabList,
  Tab,
  Text,
  TabPanels,
  TabPanel,
  Image,
  Stack,
  Flex,
  Box,
  Grid,
  GridItem,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { Post } from "../../atoms/postsAtom";
import { BsFillChatFill, BsHeartFill, BsPlayFill } from "react-icons/bs";
import { useRouter } from "next/router";
import Link from "next/link";

type ProfileTabsProps = {
  posts: Post[];
  postsFetched: boolean;
};

const ProfileTabs: React.FC<ProfileTabsProps> = ({ posts, postsFetched }) => {
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
            <Text
              fontSize="10pt"
              display={{ base: "none", md: "unset" }}
              ml={2}
              color="#262626"
            >
              SAVED
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
          <TabPanel p={0}>
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
                      <Link href={`/p/${post.id}`} key={post.id}>
                        <GridItem>
                          <Box
                            pos="relative"
                            w="293px"
                            h="293px"
                            cursor="pointer"
                          >
                            <Box
                              pos="absolute"
                              top={0}
                              left={0}
                              w="100%"
                              h="100%"
                              bg="rgba(0,0,0,0.4)"
                              opacity={0}
                              _hover={{ opacity: 1 }}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Flex align="center" mr={6}>
                                <Icon
                                  as={BsHeartFill}
                                  color="#ffffff"
                                  fontSize="20px"
                                  mr={2}
                                />
                                <Text color="#ffffff">
                                  {post.numberOfLikes}
                                </Text>
                              </Flex>
                              <Flex align="center">
                                <Icon
                                  as={BsFillChatFill}
                                  color="#ffffff"
                                  fontSize="20px"
                                  mr={2}
                                />
                                <Text color="#ffffff">
                                  {post.numberOfComments}
                                </Text>
                              </Flex>
                            </Box>
                            <Image
                              src={post.imageURL}
                              alt=""
                              w="100%"
                              h="100%"
                              objectFit="cover"
                            />
                          </Box>
                        </GridItem>
                      </Link>
                    ))}
                  </Grid>
                )}
              </>
            )}
          </TabPanel>
          <TabPanel>
            <Flex
              flexDir="column"
              align="center"
              justify="center"
              margin="60px 44px"
            >
              <Flex border="1px solid" borderColor="black" borderRadius="full">
                <Image
                  src="https://cdn.icon-icons.com/icons2/3138/PNG/512/bookmark_save_storage_basic_icon_192482.png"
                  alt=""
                  h="50px"
                  w="50px"
                  m="8px"
                />
              </Flex>
              <Text fontWeight="light" fontSize="18pt" mt={3} mb={2}>
                Saved photos and reels
              </Text>
              <Text fontSize="11pt" color="black">
                {`When photos/reels that you saved, they'll appear here.`}
              </Text>
            </Flex>
          </TabPanel>
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
              <Text fontWeight="light" fontSize="18pt" mt={3} mb={2}>
                Photos of you
              </Text>
              <Text fontSize="11pt" color="black">
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
          <TabPanel p={0}>
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
                  <Grid templateColumns="repeat(3, 1fr)" p="0px">
                    {posts?.map((post) => (
                      <Link href={`/p/${post.id}`} key={post.id}>
                        <GridItem key={post.id}>
                          <Box
                            pos="relative"
                            w="130px"
                            h="130px"
                            cursor="pointer"
                          >
                            <Box
                              pos="absolute"
                              top={0}
                              left={0}
                              w="100%"
                              h="100%"
                              bg="rgba(0,0,0,0.4)"
                              opacity={0}
                              _hover={{ opacity: 1 }}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Flex align="center" mr={6}>
                                <Icon
                                  as={BsHeartFill}
                                  color="#ffffff"
                                  fontSize="20px"
                                  mr={2}
                                />
                                <Text color="#ffffff">
                                  {post.numberOfLikes}
                                </Text>
                              </Flex>
                              <Flex align="center">
                                <Icon
                                  as={BsFillChatFill}
                                  color="#ffffff"
                                  fontSize="20px"
                                  mr={2}
                                />
                                <Text color="#ffffff">
                                  {post.numberOfComments}
                                </Text>
                              </Flex>
                            </Box>
                            <Image
                              src={post.imageURL}
                              alt=""
                              w="100%"
                              h="100%"
                              objectFit="cover"
                            />
                          </Box>
                        </GridItem>
                      </Link>
                    ))}
                  </Grid>
                )}
              </>
            )}
          </TabPanel>
          <TabPanel>
            <Flex
              flexDir="column"
              align="center"
              justify="center"
              margin="60px 44px"
            >
              <Flex border="1px solid" borderColor="black" borderRadius="full">
                <Image
                  src="https://cdn.icon-icons.com/icons2/3138/PNG/512/bookmark_save_storage_basic_icon_192482.png"
                  alt=""
                  h="50px"
                  w="50px"
                  m="8px"
                />
              </Flex>
              <Text fontWeight="light" fontSize="15pt" mt={3} mb={2}>
                Saved photos and reels
              </Text>
              <Text fontSize="10pt" color="black" textAlign="center">
                {`When photos/reels that you saved, they'll appear here.`}
              </Text>
            </Flex>
          </TabPanel>
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
              <Text fontWeight="light" fontSize="15pt" mt={3} mb={2}>
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
