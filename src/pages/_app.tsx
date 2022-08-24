import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { theme } from "../chakra/theme";
import Layout from "../components/layout/Layout";
import "../../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);

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
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </RecoilRoot>
    );
  }
}

export default MyApp;

// https://voonze.com/wp-content/uploads/2021/11/Lite.jpg
