import {
  Box,
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Post } from "../../atoms/postsAtom";

type DeletePostModalProps = {
  children: React.ReactNode;
  post: Post;
  onDeletePost: (post: Post) => Promise<boolean>;
};

const DeletePostModal: React.FC<DeletePostModalProps> = ({
  children,
  post,
  onDeletePost,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDeletePost(post);
      onClose();
    } catch (error: any) {
      console.log("handleDelete Error", error);
    }
    setDeleting(false);
  };

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={{ base: "xs", md: "sm" }}
      >
        <ModalOverlay />
        <ModalContent borderRadius="xl" outline="none">
          <Flex
            flexDir="column"
            textAlign="center"
            align="center"
            justify="center"
            p="25px 0px"
            borderBottom="1px solid"
            borderColor="gray.200"
          >
            <Text fontWeight={600} mb={1} fontSize="18px">
              Delete Post?
            </Text>
            <Text
              fontSize="10pt"
              color="gray.500"
            >{`Are you sure you want to delete this post?`}</Text>
          </Flex>
          <Button
            variant="shareButton"
            p="15px 0px"
            textAlign="center"
            cursor="pointer"
            color="red"
            fontWeight={600}
            fontSize="10.5pt"
            borderBottom="1px solid"
            borderColor="gray.200"
            isLoading={deleting}
            onClick={handleDelete}
          >
            Delete
          </Button>

          <Text
            p="15px 0px"
            textAlign="center"
            cursor="pointer"
            fontSize="10.5pt"
            onClick={onClose}
          >
            Cancel
          </Text>
        </ModalContent>
      </Modal>
    </>
  );
};
export default DeletePostModal;
