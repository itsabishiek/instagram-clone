import { Tabs, TabList, Tab, Text } from "@chakra-ui/react";
import React from "react";

const ProfileTabs: React.FC = () => {
  return (
    <>
      <Tabs
        w="100%"
        isFitted={false}
        pt={6}
        display={{ base: "none", md: "flex" }}
        justifyContent="center"
        borderBottom="1px solid rgb(219,219,219)"
      >
        <TabList border="none">
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
      </Tabs>

      <Tabs
        w="100%"
        isFitted={true}
        pt={6}
        display={{ base: "unset", md: "none" }}
        borderBottom="1px solid rgb(219,219,219)"
        mt={1}
      >
        <TabList border="none">
          <Tab
            mr={{ base: "0px", md: "40px" }}
            _selected={{ border: "none", borderColor: "none" }}
          >
            <svg
              aria-label="Posts"
              color="#0095f6"
              fill="#0095f6"
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
            _selected={{ border: "none", borderColor: "none" }}
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
          <Tab _selected={{ border: "none", borderColor: "none" }}>
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
      </Tabs>
    </>
  );
};
export default ProfileTabs;
