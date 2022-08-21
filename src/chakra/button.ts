import type { ComponentStyleConfig } from "@chakra-ui/theme";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "3px",
    fontSize: "10pt",
    fontWeight: 700,
    _focus: {
      boxShadow: "none",
    },
  },
  sizes: {
    sm: {
      fontSize: "8pt",
    },
    md: {
      fontSize: "10pt",
      // height: "28px",
    },
  },
  variants: {
    solid: {
      color: "white",
      bg: "#0095f6",
      _hover: {
        bg: "blue.400",
      },
    },
    outline: {
      color: "#0095f6",
      cursor: "pointer",
    },
    uploadButton: {
      color: "inherit",
    },
  },
};
