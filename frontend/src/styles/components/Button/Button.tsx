import type { ComponentStyleConfig } from "@chakra-ui/theme";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    bg: "purple.500",

    _hover: {
      backgroundColor: "purple.400",
      color: "white",
      svg: {
        fill: "purple.500",
      },
    },
    _active: {
      backgroundColor: "purple.300",
      color: "white",
    },
    _focusVisible: {
      boxShadow: "3",
    },
    _disabled: {
      color: "gray.400",
      fontWeight: "bold",
      backgroundColor: "purple.900",
      span: {
        fill: "gray.400",
      },
      svg: {
        fill: "gray.400",
      },
      _hover: {
        color: "gray.400",
        backgroundColor: "purple.800",
        span: {
          fill: "gray.400",
        },
        svg: {
          fill: "gray.400",
        },
      },
    },
  },
  variants: {
    primary: {
      border: "0",
      color: "white",
      span: {
        fill: "white",
      },
      _active: {
        border: "none",
      },
      _hover: {
        border: "none",
      },
      _disabled: {
        border: "none",
        backgroundColor: "purple.900!important", // no way to override without !important
        color: "gray.400",
        opacity: "1!important", // no way to override without !important
        _hover: {
          border: "none",
        },
      },
    },
    secondary: {
      bg: "pink.700",
      _active: {
        bg: "pink.500",
      },
      _hover: {
        bg: "pink.600",
      },
    },
  },
  defaultProps: {
    variant: "primary",
  },
};
