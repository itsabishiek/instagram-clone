import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import pic from "../../../public/img/mediaUpsell.jpg";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

type RightCompProps = {};

const RightComp: React.FC<RightCompProps> = () => {
  return (
    <Flex position="relative" flexDir="column">
      <Flex
        position="sticky"
        top={0}
        h={{ base: "44px", md: "60px" }}
        w="100%"
        p="0px 25px"
        align="center"
        justify="space-between"
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        <Box display={{ base: "flex", md: "none" }}>
          <svg
            aria-label="Down chevron icon"
            color="#262626"
            fill="#262626"
            role="img"
            viewBox="0 0 24 24"
            height="20"
            width="20"
            className="rotateIcon"
          >
            <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
          </svg>
        </Box>
        <Flex align="center">
          <Image
            src={pic}
            alt=""
            width="26px"
            height="26px"
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
          <Text fontWeight={600} color="black" fontSize="16px" ml={3}>
            {"⚡𝙏 𝙃 𝙄 𝙍 𝙐🧧"}
          </Text>
        </Flex>

        <Flex align="center" gap="15px">
          <Box display={{ base: "none", md: "unset" }}>
            <svg
              aria-label="Audio call"
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
              cursor="pointer"
            >
              <path d="M18.227 22.912c-4.913 0-9.286-3.627-11.486-5.828C4.486 14.83.731 10.291.921 5.231a3.289 3.289 0 0 1 .908-2.138 17.116 17.116 0 0 1 1.865-1.71 2.307 2.307 0 0 1 3.004.174 13.283 13.283 0 0 1 3.658 5.325 2.551 2.551 0 0 1-.19 1.941l-.455.853a.463.463 0 0 0-.024.387 7.57 7.57 0 0 0 4.077 4.075.455.455 0 0 0 .386-.024l.853-.455a2.548 2.548 0 0 1 1.94-.19 13.278 13.278 0 0 1 5.326 3.658 2.309 2.309 0 0 1 .174 3.003 17.319 17.319 0 0 1-1.71 1.866 3.29 3.29 0 0 1-2.138.91 10.27 10.27 0 0 1-.368.006Zm-13.144-20a.27.27 0 0 0-.167.054A15.121 15.121 0 0 0 3.28 4.47a1.289 1.289 0 0 0-.36.836c-.161 4.301 3.21 8.34 5.235 10.364s6.06 5.403 10.366 5.236a1.284 1.284 0 0 0 .835-.36 15.217 15.217 0 0 0 1.504-1.637.324.324 0 0 0-.047-.41 11.62 11.62 0 0 0-4.457-3.119.545.545 0 0 0-.411.044l-.854.455a2.452 2.452 0 0 1-2.071.116 9.571 9.571 0 0 1-5.189-5.188 2.457 2.457 0 0 1 .115-2.071l.456-.855a.544.544 0 0 0 .043-.41 11.629 11.629 0 0 0-3.118-4.458.36.36 0 0 0-.244-.1Z"></path>
            </svg>
          </Box>
          <Box display={{ base: "none", md: "unset" }}>
            <svg
              aria-label="Video call"
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
              cursor="pointer"
            >
              <rect
                fill="none"
                height="18"
                rx="3"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                width="16.999"
                x="1"
                y="3"
              ></rect>
              <path
                d="m17.999 9.146 2.495-2.256A1.5 1.5 0 0 1 23 8.003v7.994a1.5 1.5 0 0 1-2.506 1.113L18 14.854"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </Box>
          <svg
            aria-label="View Thread Details"
            color="#262626"
            fill="#262626"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
            cursor="pointer"
          >
            <circle
              cx="12.001"
              cy="12.005"
              fill="none"
              r="10.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></circle>
            <circle cx="11.819" cy="7.709" r="1.25"></circle>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="10.569"
              x2="13.432"
              y1="16.777"
              y2="16.777"
            ></line>
            <polyline
              fill="none"
              points="10.569 11.05 12 11.05 12 16.777"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></polyline>
          </svg>
        </Flex>
      </Flex>

      <Messages />

      <ChatInput />
    </Flex>
  );
};
export default RightComp;
