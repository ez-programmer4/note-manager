import React from "react";
import { Box, Button, Heading, Text, VStack, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import your AuthContext
import { AddIcon, ViewIcon } from "@chakra-ui/icons"; // Import icons from Chakra UI

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Get the currentUser from AuthContext

  const handleCreateNote = () => {
    if (currentUser) {
      navigate("/add"); // Navigate to create note if authenticated
    } else {
      navigate("/login"); // Navigate to login if not authenticated
    }
  };

  const handleViewNotes = () => {
    if (currentUser) {
      navigate("/notelist"); // Navigate to note list if authenticated
    } else {
      navigate("/login"); // Navigate to login if not authenticated
    }
  };

  return (
    <Box
      p={5}
      minH="100vh"
      bg="gray.900"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={6} align="center">
        <Heading size="2xl" color="teal.400">
          Welcome to Note Manager
        </Heading>
        <Text fontSize="lg" color="whiteAlpha.800" textAlign="center">
          Organize your notes efficiently. Create, edit, and manage your notes
          with ease.
        </Text>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="teal"
          onClick={handleCreateNote}
          size="lg"
        >
          Create a New Note
        </Button>
        <Button
          leftIcon={<ViewIcon />}
          colorScheme="teal"
          onClick={handleViewNotes}
          size="lg"
        >
          View My Notes
        </Button>
      </VStack>
    </Box>
  );
};

export default HomePage;
