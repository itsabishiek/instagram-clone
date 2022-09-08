import { Avatar, Box, Link, Tab, TabList, Tabs } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";
import useUserData from "../../hooks/useUserData";
import UserMenu from "../menus/UserMenu";
import PostUploadModal from "../modals/PostUploadModal";
import { BiLogIn } from "react-icons/bi";

type BottomNavbarProps = {
  user?: User | null;
};

const BottomNavbar: React.FC<BottomNavbarProps> = ({ user }) => {
  const { userStateValue } = useUserData();

  return (
    <Tabs
      position="fixed"
      bottom={0}
      bg="white"
      border="1px solid"
      borderColor="gray.300"
      display={{ base: "unset", md: "none" }}
      w="100%"
      isFitted={true}
      variant="enclosed"
      zIndex={10001}
    >
      <TabList>
        <Tab>
          <Link href="/">
            <svg
              aria-label="Home"
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
              cursor="pointer"
            >
              <path
                d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z"
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </Link>
        </Tab>

        <Tab>
          <Link href="/search">
            <svg
              aria-label="Search"
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
              cursor="pointer"
            >
              <path
                d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="16.511"
                x2="22"
                y1="16.511"
                y2="22"
              ></line>
            </svg>
          </Link>
        </Tab>

        <Tab>
          <PostUploadModal>
            <Box>
              <svg
                aria-label="New post"
                color="#262626"
                fill="#262626"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
                cursor="pointer"
              >
                <path
                  d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="6.545"
                  x2="17.455"
                  y1="12.001"
                  y2="12.001"
                ></line>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="12.003"
                  x2="12.003"
                  y1="6.545"
                  y2="17.455"
                ></line>
              </svg>
            </Box>
          </PostUploadModal>
        </Tab>

        <Tab>
          <Link href="/">
            <svg
              aria-label="Activity Feed"
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
              cursor="pointer"
            >
              <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
            </svg>
          </Link>
        </Tab>

        <Tab>
          {user ? (
            <UserMenu>
              <Avatar src={userStateValue.currUser?.imageURL} size="xs" />
            </UserMenu>
          ) : (
            <Link href="/login">
              <BiLogIn fontSize="28px" color="#262626" />
            </Link>
          )}
        </Tab>
      </TabList>
    </Tabs>
  );
};
export default BottomNavbar;
