import {
  Box,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

type DiscardModalProps = {
  children: React.ReactNode;
  setSelectedFile: (data: string) => void;
};

const DiscardModal: React.FC<DiscardModalProps> = ({
  children,
  setSelectedFile,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              Discard Post?
            </Text>
            <Text
              fontSize="10pt"
              color="gray.500"
            >{`If you leave, your edits won't be saved.`}</Text>
          </Flex>
          <Text
            p="15px 0px"
            textAlign="center"
            cursor="pointer"
            color="red"
            fontWeight={600}
            fontSize="10.5pt"
            borderBottom="1px solid"
            borderColor="gray.200"
            onClick={() => setSelectedFile("")}
          >
            Discard
          </Text>

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
export default DiscardModal;
