import { Box } from "@chakra-ui/react";
import React from "react";

type BarProps = {
  animationDuration: number;
  progress: number;
};

const Bar: React.FC<BarProps> = ({ animationDuration, progress }) => {
  return (
    <Box
      bg="linear-gradient(45deg, rgb(43, 62, 167), rgb(255,230,0), #ffa600, rgb(255,0,128), #d4217b)"
      h={1}
      w="100%"
      pos="fixed"
      top={0}
      left={0}
      zIndex={10010}
      style={{
        marginLeft: `${(-1 + progress) * 100}%`,
        transition: `margin-left ${animationDuration}ms linear`,
      }}
    ></Box>
  );
};
export default Bar;
