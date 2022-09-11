import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

type SearchInputProps = {};

const SearchInput: React.FC<SearchInputProps> = () => {
  const router = useRouter();

  return (
    <Flex
      flexGrow={1}
      mr={2}
      align="center"
      maxWidth="260px"
      margin={{ base: "0 10px", md: "0 15px" }}
      display={{ base: "none", md: "flex" }}
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none" mt={-0.5}>
          <svg
            aria-label="Search"
            color="#8e8e8e"
            fill="#8e8e8e"
            height="16"
            role="img"
            viewBox="0 0 24 24"
            width="16"
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
        </InputLeftElement>

        <Input
          placeholder="Search"
          _placeholder={{ color: "#8e8e8e", fontSize: "11pt" }}
          fontSize="11pt"
          bg="#efefef"
          border="none"
          _focus={{ outline: "none" }}
          focusBorderColor="none"
          h="36px"
          onFocus={() => router.push("/explore")}
        />
      </InputGroup>
    </Flex>
  );
};
export default SearchInput;
