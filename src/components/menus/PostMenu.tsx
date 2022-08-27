import {
  Menu,
  MenuButton,
  Icon,
  MenuList,
  MenuItem,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";

type PostMenuProps = {
  userIsCreator: boolean;
};

const PostMenu: React.FC<PostMenuProps> = ({ userIsCreator }) => {
  return (
    <Menu>
      <MenuButton borderRadius={4}>
        <Flex p="8px 10px">
          <svg
            aria-label="More options"
            color="#262626"
            fill="#262626"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <circle cx="12" cy="12" r="1.5"></circle>
            <circle cx="6" cy="12" r="1.5"></circle>
            <circle cx="18" cy="12" r="1.5"></circle>
          </svg>
        </Flex>
      </MenuButton>
      {userIsCreator && (
        <MenuList p={0}>
          <MenuItem
            _hover={{ bg: "gray.200" }}
            p="10px"
            borderBottom="1px solid"
            borderColor="gray.200"
            borderRadius={4}
          >
            <Flex align="center">
              {false ? (
                <Spinner size="sm" ml={3} />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} fontSize={20} mr={2} pb={1} />
                  <Text fontWeight={600} fontSize="10pt">
                    Delete Post
                  </Text>
                </>
              )}
            </Flex>
          </MenuItem>
          <MenuItem _hover={{ bg: "gray.200" }} p="10px">
            <Flex align="center">
              <Icon as={FiMoreHorizontal} fontSize={20} mr={2} pb={1} />
              <Text fontWeight={600} fontSize="10pt">
                More Options
              </Text>
            </Flex>
          </MenuItem>
        </MenuList>
      )}
    </Menu>
  );
};
export default PostMenu;