import { DeleteIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Divider,
  Text,
  Image,
  Flex,
  Center,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useRef, useState } from "react";
import { UserData } from "../../atoms/userDataAtom";
import { firestore, storage } from "../../firebase/clientApp";
import useSelectedFile from "../../hooks/useSelectedFile";
import useUserData from "../../hooks/useUserData";

type ProfileUploadModalProps = {
  children: React.ReactNode;
  userData: UserData;
};

const ProfileUploadModal: React.FC<ProfileUploadModalProps> = ({
  children,
  userData,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setUserStateValue } = useUserData();
  const { onSelectFile, selectedFile, setSelectedFile } = useSelectedFile();
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const onUpdateImage = async () => {
    if (!selectedFile) return;
    setUploadingImage(true);
    try {
      const imageRef = ref(storage, `/users/${userData.uid}/profilePic`);
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(firestore, "users", userData.id), {
        imageURL: downloadURL,
      });

      setUserStateValue((prev) => ({
        ...prev,
        userData: {
          ...prev.userData,
          imageURL: downloadURL,
        },
      }));
    } catch (error) {
      console.log("onUpdateImage error", error);
    }
    setUploadingImage(false);
    onClose();
  };

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
        <ModalOverlay />
        <ModalContent borderRadius="xl">
          <Text
            textAlign="center"
            fontWeight={700}
            fontSize="20px"
            borderBottom="1px solid"
            borderColor="gray.200"
            p="20px 0px"
          >
            {userData?.imageURL ? "Change profile photo" : "Add profile photo"}
          </Text>
          <input
            id="file-upload"
            type="file"
            accept="image/x-png,image/gif,image/jpeg,image/jpg,image/png"
            hidden
            ref={selectedFileRef}
            onChange={onSelectFile}
          />
          {selectedFile ? (
            <>
              <Flex
                justify="center"
                p="15px 0px"
                borderBottom="1px solid"
                borderColor="gray.200"
              >
                <Image
                  pos="relative"
                  src={selectedFile}
                  alt=""
                  borderRadius="full"
                  boxSize="50px"
                  objectFit="cover"
                />
              </Flex>
              <Button
                p="15px 0px"
                textAlign="center"
                cursor="pointer"
                color="brand.100"
                fontWeight={600}
                fontSize="10.5pt"
                borderBottom="1px solid"
                borderColor="gray.200"
                variant="uploadButton"
                onClick={onUpdateImage}
                isLoading={uploadingImage}
              >
                Upload photo
              </Button>
              <Center
                pos="absolute"
                w="30px"
                h="30px"
                top="80px"
                right="10px"
                cursor="pointer"
                color="red"
                bg="white"
                border="1px solid"
                borderColor="gray.300"
                borderRadius="full"
                onClick={() => setSelectedFile("")}
              >
                <DeleteIcon />
              </Center>
            </>
          ) : (
            <Text
              p="15px 0px"
              textAlign="center"
              cursor="pointer"
              color="brand.100"
              fontWeight={600}
              fontSize="10.5pt"
              borderBottom="1px solid"
              borderColor="gray.200"
              onClick={() => selectedFileRef.current?.click()}
            >
              Upload photo
            </Text>
          )}

          {userData?.imageURL && (
            <Text
              p="15px 0px"
              textAlign="center"
              cursor="pointer"
              color="red"
              fontWeight={600}
              fontSize="10.5pt"
              borderBottom="1px solid"
              borderColor="gray.200"
            >
              Remove Current photo
            </Text>
          )}

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
export default ProfileUploadModal;
