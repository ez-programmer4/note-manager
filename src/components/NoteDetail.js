import React from "react";
import { Box, Heading, Text, Button, VStack, Divider } from "@chakra-ui/react";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import ShareNote from "./ShareNote";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const NoteDetail = ({ note, onClose }) => {
  const navigate = useNavigate(); // Initialize navigate

  const handleEdit = () => {
    navigate(`/edit/${note._id}`); // Navigate to the edit page with the note ID
  };

  return (
    <Box
      p={6}
      bg="gray.700"
      borderRadius="md"
      boxShadow="lg"
      marginTop={10}
      maxW="600px"
      mx="auto"
    >
      <Heading size="lg" mb={4} color="white">
        Note Details
      </Heading>
      <VStack spacing={4} align="start">
        <Text fontSize="lg" fontWeight="bold" color="white">
          <strong>Title:</strong> {note.title}
        </Text>
        <Divider borderColor="whiteAlpha.300" />
        <Text fontSize="md" color="white">
          <strong>Content:</strong>
        </Text>
        <Box
          dangerouslySetInnerHTML={{ __html: note.content }}
          mb={4}
          fontSize="md"
          lineHeight="1.5"
          color="gray.300"
          maxH="300px" // Set a maximum height
          overflowY="auto" // Enable vertical scrolling
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 10, // Limit to 10 lines (adjust as needed)
          }}
        />
        <Divider borderColor="whiteAlpha.300" />
        <Text fontSize="md" color="white">
          <strong>Category:</strong> {note.category}
        </Text>
        <Text fontSize="md" color="white">
          <strong>Tags:</strong>{" "}
          {Array.isArray(note.tags) ? note.tags.join(", ") : "No tags"}
        </Text>
      </VStack>
      <ShareNote noteId={note._id} />
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button
          colorScheme="blue"
          onClick={handleEdit} // Edit button functionality
          leftIcon={<EditIcon />}
          mr={2} // Margin right for spacing
        >
          Edit
        </Button>
        <Button colorScheme="gray" onClick={onClose} leftIcon={<CloseIcon />}>
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default NoteDetail;
