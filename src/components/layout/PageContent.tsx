import { Box, Flex } from "@chakra-ui/react";
import React from "react";

type PageContentProps = {
  children: React.ReactNode;
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <Flex
      justify="center"
      p={{ base: "0px 0px 16px 0px ", md: "30px 0px 16px 0px" }}
    >
      <Flex justify="center" w="100%" maxWidth="821px">
        {/* Left Content */}
        <Flex
          direction="column"
          w={{ base: "100%", md: "60%" }}
          mr={{ base: 0, md: 6 }}
        >
          {children && children[0 as keyof typeof children]}
        </Flex>
        {/* Right Content */}
        <Box
          display={{ base: "none", md: "none", lg: "flex" }}
          w={{ base: "100%", md: "40%" }}
          flexDirection="column"
          flexGrow={1}
        >
          {children && children[1 as keyof typeof children]}
        </Box>
      </Flex>
    </Flex>
  );
};
export default PageContent;
