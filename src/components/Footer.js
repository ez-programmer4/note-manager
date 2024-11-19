// src/components/Footer.js

import React from "react";
import { Box, Text, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      zIndex={2}
      width="100%"
      as="footer"
      py={4}
      textAlign="center"
      bg="gray.800"
      color="white"
      position="relative" // Ensures it is positioned correctly at the bottom
      mt="auto" // Pushes the footer to the bottom of the container
    >
      <Text fontSize="md" mb={1}>
        &copy; {new Date().getFullYear()} note-app
      </Text>
      <Text fontSize="sm">
        Created by{" "}
        <Link
          href="https://github.com/your-username"
          isExternal
          color="teal.300"
        >
          Ezedin Ebrahim
        </Link>{" "}
        - Full Stack Developer. All rights reserved.
      </Text>
      <Text fontSize="sm" mt={2}>
        Connect with me:{" "}
        <Link href="mailto:ezedinebrahim131@gmail.com" color="teal.300">
          ezedinebrahim131@gmail.com
        </Link>
      </Text>
    </Box>
  );
};

export default Footer;
