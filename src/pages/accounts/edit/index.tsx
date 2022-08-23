import {
  Avatar,
  Button,
  Checkbox,
  Flex,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { UserData } from "../../../atoms/userDataAtom";
import EditSidebar from "../../../components/EditSidebar";
import ProfileUploadModal from "../../../components/modals/ProfileUploadModal";
import { firestore } from "../../../firebase/clientApp";
import useUserData from "../../../hooks/useUserData";

const EditPage: React.FC = () => {
  const { userStateValue, setUserStateValue, loading } = useUserData();
  const userData = userStateValue?.userData;
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [updating, setUpdating] = useState(false);

  const onUpdateAccount = async () => {
    setUpdating(true);
    try {
      await updateDoc(doc(firestore, "users", userData.id), {
        fullname: name,
        username,
        email,
        bio: bio || "",
        phoneNumber: phoneNumber || "",
        website: website || "",
      });

      setUserStateValue((prev) => ({
        ...prev,
        userData: {
          ...prev.userData,
          fullname: name,
          username,
          email,
          bio: bio || "",
          phoneNumber: phoneNumber || "",
          website: website || "",
        },
      }));
    } catch (error) {
      console.log("onUpdateAccount Error", error);
    }
    setUpdating(false);
  };

  // console.log(userData);
  useEffect(() => {
    setName(userData.fullname);
    setUsername(userData.username);
    setEmail(userData.email);
    setBio(userData?.bio!);
    setWebsite(userData?.website!);
    setPhoneNumber(userData?.phoneNumber!);
  }, [userData]);

  if (loading) {
    return (
      <Flex h="calc(80vh - 60px)" justify="center" align="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand.100"
          size="lg"
        />
      </Flex>
    );
  }

  return (
    <>
      <Head>
        <title>Edit profile • Instagram</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png"
        />
      </Head>

      <Flex
        flexGrow={1}
        m="0px auto 30px"
        maxW="980px"
        p="30px 20px 0px"
        pb="40px"
      >
        <Flex
          bg={{ base: "transparent", md: "white" }}
          w="100%"
          border={{ base: "none", md: "1px solid" }}
          borderColor={{ md: "gray.200" }}
        >
          <EditSidebar />

          <Stack
            flex="0 0 75%"
            align={{ base: "left", md: "center" }}
            pt={{ base: "0px", md: "25px" }}
          >
            <Flex
              align="center"
              gap="20px"
              justify="flex-start"
              w="100%"
              pl={{ base: "0px", md: "155px" }}
            >
              <Avatar src={userData?.imageURL} w="38px" h="38px" />
              <Flex flexDir="column">
                <Text fontSize="14pt" fontWeight={500} color="black">
                  {userData?.username}
                </Text>
                <ProfileUploadModal userData={userData}>
                  <Text
                    fontSize="10pt"
                    color="brand.100"
                    fontWeight={600}
                    cursor="pointer"
                  >
                    {userData?.imageURL
                      ? "Change profile photo"
                      : "Add profile photo"}
                  </Text>
                </ProfileUploadModal>
              </Flex>
            </Flex>
            <Flex pt={4} flexDirection={{ base: "column", md: "row" }}>
              <Flex
                pr="30px"
                w="100px"
                justify={{ base: "left", md: "flex-end" }}
                mb={2}
              >
                <Text fontWeight={600} color="gray.600" fontSize="11pt">
                  Name
                </Text>
              </Flex>
              <Flex flexDir="column" maxW="355px">
                <Input
                  focusBorderColor="black"
                  borderRadius={3}
                  h="32px"
                  placeholder="Name"
                  _placeholder={{ fontSize: "11pt" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Text fontSize="9pt" mt={2} color="gray.500">
                  {
                    "Help people discover your account by using the name you're known by: either your full name, nickname, or business name."
                  }
                </Text>
                <Text fontSize="9pt" mt={3} color="gray.500">
                  You can only change your name twice within 14 days.
                </Text>
              </Flex>
            </Flex>
            <Flex pt={4} flexDirection={{ base: "column", md: "row" }}>
              <Flex
                pr="30px"
                w="100px"
                justify={{ base: "left", md: "flex-end" }}
                mb={2}
              >
                <Text fontWeight={600} color="gray.600" fontSize="11pt">
                  Username
                </Text>
              </Flex>
              <Flex flexDir="column" maxW="355px">
                <Input
                  focusBorderColor="black"
                  borderRadius={3}
                  h="32px"
                  placeholder="Username"
                  _placeholder={{ fontSize: "11pt" }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Text fontSize="9pt" mt={2} color="gray.500">
                  {
                    " In most cases, you'll be able to change your username back to itsabishiek for another 14 days. Learn more"
                  }
                </Text>
              </Flex>
            </Flex>
            <Flex pt={4} flexDirection={{ base: "column", md: "row" }}>
              <Flex
                pr="30px"
                w="100px"
                justify={{ base: "left", md: "flex-end" }}
                mb={2}
              >
                <Text fontWeight={600} color="gray.600" fontSize="11pt">
                  Website
                </Text>
              </Flex>
              <Input
                focusBorderColor="black"
                borderRadius={3}
                h="32px"
                w="355px"
                placeholder="Website"
                _placeholder={{ fontSize: "11pt" }}
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </Flex>
            <Flex pt={4} flexDirection={{ base: "column", md: "row" }}>
              <Flex
                pr="30px"
                w="100px"
                justify={{ base: "left", md: "flex-end" }}
                mb={2}
              >
                <Text fontWeight={600} color="gray.600" fontSize="11pt">
                  Bio
                </Text>
              </Flex>
              <Textarea
                focusBorderColor="black"
                borderRadius={3}
                w="355px"
                placeholder="Bio"
                _placeholder={{ fontSize: "11pt" }}
                fontSize="1rem"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </Flex>
            <Flex pt={4} flexDirection={{ base: "column", md: "row" }}>
              <Flex
                flexDirection="column"
                display={{ base: "flex", md: "none" }}
                mb={{ base: 3 }}
                m={{ md: "8px 0px" }}
              >
                <Text fontSize="9pt" mt={1} fontWeight={600} color="gray.500">
                  Personal information
                </Text>
                <Text fontSize="9pt" mt={2} mb={1} color="gray.500">
                  {`Provide your personal information, even if the account is used
                  for a business, a pet or something else. This won't be a part
                  of your public profile.`}
                </Text>
              </Flex>
              <Flex
                pr="30px"
                w="100px"
                justify={{ base: "left", md: "flex-end" }}
                mb={2}
                align="flex-end"
                pb={{ base: "0px", md: "5px" }}
              >
                <Text fontWeight={600} color="gray.600" fontSize="11pt">
                  Email
                </Text>
              </Flex>

              <Flex flexDir="column" maxW="355px">
                <Flex
                  flexDirection="column"
                  display={{ base: "none", md: "flex" }}
                >
                  <Text fontSize="9pt" mt={1} fontWeight={600} color="gray.500">
                    Personal information
                  </Text>
                  <Text fontSize="9pt" mt={2} mb={1} color="gray.500">
                    {`Provide your personal information, even if the account is used
                  for a business, a pet or something else. This won't be a part
                  of your public profile.`}
                  </Text>
                </Flex>

                <Flex flexDir="column" maxW="355px">
                  <Text fontSize="9pt" mt={2}></Text>
                  <Input
                    focusBorderColor="black"
                    borderRadius={3}
                    h="32px"
                    placeholder="Email"
                    _placeholder={{ fontSize: "11pt" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Flex>
              </Flex>
            </Flex>

            <Flex
              pt={{ base: 2, md: 4 }}
              flexDirection={{ base: "column", md: "row" }}
              m={{ md: "8px 0px" }}
            >
              <Flex
                pr="30px"
                w="100px"
                justify={{ base: "left", md: "flex-end" }}
                mb={2}
              >
                <Text
                  fontWeight={600}
                  color="gray.600"
                  fontSize="11pt"
                  whiteSpace="nowrap"
                >
                  Phone number
                </Text>
              </Flex>
              <Input
                focusBorderColor="black"
                borderRadius={3}
                h="32px"
                w="355px"
                placeholder="Phone number"
                _placeholder={{ fontSize: "11pt" }}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Flex>

            <Flex
              pt={{ base: 2, md: 4 }}
              flexDirection={{ base: "column", md: "row" }}
              m={{ md: "8px 0px" }}
            >
              <Flex
                pr="30px"
                w="100px"
                justify={{ base: "left", md: "flex-end" }}
                mb={2}
              >
                <Text fontWeight={600} color="gray.600" fontSize="11pt">
                  Gender
                </Text>
              </Flex>
              <Input
                focusBorderColor="black"
                borderRadius={3}
                h="32px"
                w="355px"
                placeholder="Gender"
                _placeholder={{ fontSize: "11pt" }}
              />
            </Flex>

            <Flex
              pt={{ base: 2, md: 4 }}
              flexDirection={{ base: "column", md: "row" }}
              m={{ md: "8px 0px" }}
            >
              <Flex
                pr="30px"
                w="100px"
                justify={{ base: "left", md: "flex-end" }}
              >
                <Text
                  fontWeight={600}
                  color="gray.600"
                  fontSize="11pt"
                  whiteSpace="nowrap"
                >
                  Account suggestions
                </Text>
              </Flex>
              <Flex maxW="355px" align="center">
                <Checkbox
                  borderRadius={3}
                  placeholder="Gender"
                  _placeholder={{ fontSize: "11pt" }}
                  type="checkbox"
                />
                <Text fontSize="9pt" ml={2} color="gray.500">
                  Include your account when recommending similar accounts people
                  might want to follow.
                </Text>
              </Flex>
            </Flex>

            <Flex
              align="center"
              justify="space-between"
              pt={5}
              pl={{ base: "0px", md: "100px" }}
            >
              <Button
                h="28px"
                mr="40px"
                isLoading={updating}
                onClick={onUpdateAccount}
              >
                Submit
              </Button>
              <Text
                fontSize={{ base: "9pt", md: "10pt" }}
                color="brand.100"
                fontWeight={600}
              >
                Temporarily deactivate my account
              </Text>
            </Flex>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
};
export default EditPage;
