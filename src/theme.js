// src/theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.100", // Light mode background
        color: "gray.800", // Light mode text color
      },
      // Dark mode styles
      'html[data-theme="dark"]': {
        body: {
          bg: "gray.800", // Dark mode background
          color: "white", // Dark mode text color
        },
      },
    },
  },
});

export default theme;
