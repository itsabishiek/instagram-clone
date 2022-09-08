import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { theme } from "../chakra/theme";
import Layout from "../components/layout/Layout";
import "../../styles/globals.css";
import { useRouter } from "next/router";
import Progress from "../components/progress/Progress";

function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true);
    };
    const handleStop = () => {
      setIsAnimating(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === undefined) {
    return <></>;
  } else {
    return (
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <Layout>
            <Progress isAnimating={isAnimating} />
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </RecoilRoot>
    );
  }
}

export default MyApp;

// https://voonze.com/wp-content/uploads/2021/11/Lite.jpg
