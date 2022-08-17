import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import OAuthButtons from "../../components/OAuthButtons";
import { auth } from "../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../firebase/errors";

type LoginPageProps = {};

const LoginPage: React.FC<LoginPageProps> = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [signInWithEmailAndPassword, user, userLoading, userError] =
    useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const userDisabled = !loginForm.email && !loginForm.password;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    signInWithEmailAndPassword(loginForm.email, loginForm.password);
    router.push("/");
  };

  // console.log(user);

  return (
    <>
      <Head>
        <title>Login • Instagram</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png"
        />
      </Head>

      <Flex justify="center">
        <Flex
          width={{ base: "100%", md: "350px" }}
          p="35px 0px"
          direction="column"
        >
          <Stack
            bg="white"
            width="100%"
            border="1px solid"
            borderColor="gray.200"
          >
            <Flex justify="center" width="100%">
              <Image
                src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
                alt=""
                maxH="100%"
                maxW="100%"
                p="36px 0px 12px 0px"
                objectFit="contain"
              />
            </Flex>

            <Stack width="100%" justify="center" p="0px 35px">
              <form onSubmit={onSubmit}>
                <Stack>
                  <Input
                    bg="rgb(250, 250, 250)"
                    borderRadius="3px"
                    placeholder="Phone Number, username, or email"
                    fontSize="10pt"
                    _placeholder={{ fontSize: "9pt" }}
                    _focus={{
                      outline: "none",
                      border: "1px solid black",
                    }}
                    focusBorderColor="none"
                    required
                    type="email"
                    name="email"
                    onChange={onChange}
                  />
                  <Input
                    bg="rgb(250, 250, 250)"
                    borderRadius="3px"
                    placeholder="Password"
                    fontSize="10pt"
                    _placeholder={{ fontSize: "9pt" }}
                    _focus={{
                      outline: "none",
                      border: "1px solid black",
                    }}
                    focusBorderColor="none"
                    required
                    type="password"
                    name="password"
                    onChange={onChange}
                  />
                  <Text textAlign="center" color="red" fontSize="10pt">
                    {
                      FIREBASE_ERRORS[
                        userError?.message as keyof typeof FIREBASE_ERRORS
                      ]
                    }
                  </Text>
                  <Button
                    height="30px"
                    type="submit"
                    mt={1}
                    isLoading={userLoading}
                    disabled={userDisabled}
                  >
                    Log In
                  </Button>
                </Stack>
              </form>

              <Flex align="center" p="10px 0px">
                <Divider />
                <Text
                  p="0px 20px"
                  fontWeight={600}
                  color="gray.500"
                  fontSize="11pt"
                >
                  OR
                </Text>
                <Divider />
              </Flex>

              <OAuthButtons login={true} />

              <Text fontSize="9pt" textAlign="center" p="8px 0px 20px 0px">
                Forgot password?
              </Text>
            </Stack>
          </Stack>

          <Flex
            mt={2}
            bg="white"
            width="100%"
            border="1px solid"
            borderColor="gray.200"
            justify="center"
            p="20px 0px"
          >
            <Text
              align="center"
              fontSize="11pt"
              mr={1}
            >{`Don't have an account?`}</Text>
            <Link href="/signup">
              <Text
                align="center"
                fontSize="11pt"
                color="brand.100"
                fontWeight={600}
                cursor="pointer"
              >
                Sign up
              </Text>
            </Link>
          </Flex>

          <Stack justify="center" p="20px 0px">
            <Text textAlign="center" fontSize="11pt">
              Get the app.
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
      </Flex>
    </>
  );
};
export default LoginPage;
