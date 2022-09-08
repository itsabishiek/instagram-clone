import { Box } from "@chakra-ui/react";
import React from "react";

type ContainerProps = {
  animationDuration: number;
  isFinished: boolean;
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({
  animationDuration,
  isFinished,
  children,
}) => {
  return (
    <Box
      pointerEvents="none"
      style={{
        opacity: isFinished ? 0 : 1,
        transition: `opacity ${animationDuration}ms linear`,
      }}
    >
      {children}
    </Box>
  );
};
export default Container;
