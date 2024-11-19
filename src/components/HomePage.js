import React from "react";
import { Box, Button, Heading, Text, VStack, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import your AuthContext
import { AddIcon, ViewIcon } from "@chakra-ui/icons"; // Import icons from Chakra UI
import Footer from "./Footer";

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleCreateNote = () => {
    if (currentUser) {
      navigate("/add");
    } else {
      navigate("/login");
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
      flexDirection="column" // Ensure vertical layout
      alignItems="center"
      justifyContent="center"
      textAlign="center" // Center text in the box
    >
      <VStack spacing={8} align="center">
        <Heading size="2xl" color="teal.400" fontWeight="bold">
          Welcome to Note Manager
        </Heading>
        <Text fontSize="lg" color="whiteAlpha.800" maxW="600px">
          Organize your notes efficiently. Create, edit, and manage your notes
          with ease.
        </Text>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="teal"
          onClick={handleCreateNote}
          size="lg"
          variant="solid" // Solid button variant for better visibility
          width="200px" // Fixed width for consistency
        >
          Create a New Note
        </Button>
        <Button
          leftIcon={<ViewIcon />}
          colorScheme="teal"
          onClick={handleViewNotes}
          size="lg"
          variant="outline" // Outline variant for a different style
          width="200px" // Fixed width for consistency
        >
          View My Notes
        </Button>
      </VStack>
      <Footer />
    </Box>
  );
};

export default HomePage;
