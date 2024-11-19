// src/components/CreateNote.js

import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Heading,
  Alert,
  AlertIcon,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RichTextEditor from "./RichTextEditor"; // Import the RichTextEditor

const CreateNote = () => {
  const [note, setNote] = useState({
    title: "",
    content: "",
    category: "personal", // Default category
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // State for success message
  const navigate = useNavigate();
  const editorRef = useRef(null); // Reference for the editor

  // Handle form submission to create a new note
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    setSuccess(null); // Reset success state
    setLoading(true); // Show loading state

    try {
      const token = localStorage.getItem("token");
      const tagsArray = note.tags.split(",").map((tag) => tag.trim());
      await axios.post(
        "https://note-manager-backend-1.onrender.com/api/notes", // Adjust to your API endpoint
        { ...note, tags: tagsArray },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess("Note created successfully!"); // Set success message
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      console.error("Error creating note:", err);
      setError("Failed to create note. Please try again.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  // Handle content change to adjust editor height
  const handleEditorChange = (content) => {
    setNote({ ...note, content });
    adjustEditorHeight();
  };

  const adjustEditorHeight = () => {
    if (editorRef.current) {
      editorRef.current.style.height = "auto"; // Reset height
      editorRef.current.style.height = `${editorRef.current.scrollHeight}px`; // Set new height
    }
  };

  // Loading state
  if (loading) {
    return <Spinner size="xl" color="teal.500" />;
  }

  // Error handling
  if (error) {
    return (
      <Alert status="error">
        <AlertIcon /> {error}
      </Alert>
    );
  }

  // Main rendering of the create note form
  return (
    <Box p={5} borderRadius="md" color="white" bg="gray.800">
      <Heading size="lg" mb={4}>
        Create Note
      </Heading>
      {success && (
        <Alert status="success" mb={4}>
          <AlertIcon /> {success}
        </Alert>
      )}
      <VStack as="form" onSubmit={handleSubmit} spacing={4} align="start">
        <FormControl isRequired>
          <FormLabel color="whiteAlpha.800">Title</FormLabel>
          <Input
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            required
            bg="gray.700"
            color="white"
            borderColor="whiteAlpha.600"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="whiteAlpha.800">Content</FormLabel>
          <Box width="100%" position="relative" marginBottom="16px">
            <RichTextEditor
              ref={editorRef} // Attach ref to the editor
              value={note.content}
              onChange={handleEditorChange} // Use the new handler
              style={{
                height: "150px", // Set an initial height
                width: "100%", // Use 100% to fill the parent Box
                overflow: "hidden", // Hide overflow for initial height
                zIndex: 10, // High z-index to ensure it is on top
                position: "relative", // Ensure it has a stacking context
              }}
              toolbarStyle={{
                zIndex: 20, // Ensure toolbar is above everything else
                position: "absolute", // Position it correctly
              }}
            />
          </Box>
        </FormControl>
        <FormControl isRequired marginTop={20}>
          <FormLabel color="whiteAlpha.800" mt={6}>
            Category
          </FormLabel>{" "}
          {/* Added margin top */}
          <Select
            value={note.category}
            onChange={(e) => setNote({ ...note, category: e.target.value })}
            placeholder="Select category"
            bg="gray.700" // Background color for the Select
            color="white" // Text color for the Select
            zIndex={8} // Lower than the RichTextEditor
            _focus={{ borderColor: "teal.400" }} // Focus border color
            _placeholder={{ color: "gray.400" }} // Placeholder text color
            sx={{
              option: {
                bg: "gray.800", // Background for options
                color: "white", // Text color for options
                _hover: {
                  bg: "teal.500", // Hover background color
                  color: "black", // Hover text color
                },
              },
            }}
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="study">Study</option>
            <option value="other">Other</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel color="whiteAlpha.800">Tags (comma separated)</FormLabel>
          <Input
            value={note.tags}
            onChange={(e) => setNote({ ...note, tags: e.target.value })}
            placeholder="Enter tags"
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Create Note
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateNote;
