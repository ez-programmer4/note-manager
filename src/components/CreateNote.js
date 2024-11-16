// src/components/CreateNote.js

import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Alert,
  AlertIcon,
  VStack,
  Select,
  CloseButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { createNote } from "../api";
import RichTextEditor from "./RichTextEditor"; // Import the RichTextEditor

const CustomAlert = ({ status, message, onClose }) => (
  <Alert status={status} mt={4} borderRadius="md" variant="solid">
    <AlertIcon />
    {message}
    <CloseButton onClick={onClose} position="absolute" right="8px" top="8px" />
  </Alert>
);

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // Single content state
  const [category, setCategory] = useState("personal"); // Default category
  const [tags, setTags] = useState(""); // Tags as a string
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await createNote({
        title,
        content,
        category,
        tags,
      });
      if (response.status === 201) {
        setSuccess("Note created successfully!");
        setTimeout(() => navigate("/dashboard"), 2000); // Navigate after 2 seconds
      } else {
        setError("Failed to create note");
      }
    } catch (error) {
      setError("Failed to create note");
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
      <Box
        width={{ base: "90%", sm: "400px" }}
        bg="gray.800"
        borderRadius="lg"
        boxShadow="lg"
        p={6}
        borderWidth={1}
        borderColor="whiteAlpha.300"
      >
        <VStack spacing={4} align="start">
          <Heading size="lg" color="teal.400">
            Add New Note
          </Heading>
          {error && (
            <CustomAlert
              status="error"
              message={error}
              onClose={() => setError("")}
            />
          )}
          {success && (
            <CustomAlert
              status="success"
              message={success}
              onClose={() => setSuccess("")}
            />
          )}
          <FormControl as="form" onSubmit={handleSubmit} mt={4}>
            <FormLabel color="whiteAlpha.800">Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              required
              bg="gray.700"
              color="white"
              borderColor="whiteAlpha.600"
              _placeholder={{ color: "whiteAlpha.500" }}
            />
            <FormLabel mt={4} color="whiteAlpha.800">
              Content
            </FormLabel>
            <RichTextEditor
              value={content}
              onChange={setContent}
              style={{ height: "400px" }} // Set a specific height for better visibility
            />
            <Box
              mb={4}
              borderWidth={1}
              borderColor="whiteAlpha.600"
              borderRadius="md"
              overflow="hidden"
            ></Box>
            <FormLabel mt={4} color="whiteAlpha.800">
              Category
            </FormLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Select category"
              bg="gray.700" // Background color
              color="white" // Text color
              borderColor="whiteAlpha.600"
              _placeholder={{ color: "whiteAlpha.500" }}
              _focus={{ borderColor: "teal.400" }} // Change border color on focus
              _hover={{ borderColor: "teal.500" }} // Change border color on hover
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="study">Study</option>
              <option value="other">Other</option>
            </Select>
            <FormLabel mt={4} color="whiteAlpha.800">
              Tags (comma separated)
            </FormLabel>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter tags"
              bg="gray.700"
              color="white"
              borderColor="whiteAlpha.600"
              _placeholder={{ color: "whiteAlpha.500" }}
            />
            <Button
              mt={6}
              colorScheme="teal"
              type="submit"
              width="full"
              borderRadius="md"
              boxShadow="md"
            >
              Add Note
            </Button>
          </FormControl>
        </VStack>
      </Box>
    </Box>
  );
};

export default CreateNote;
