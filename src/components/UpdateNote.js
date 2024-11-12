import React, { useEffect, useState } from "react";
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
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import RichTextEditor from "./RichTextEditor"; // Import the RichTextEditor

const UpdateNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // State for success message
  const navigate = useNavigate();

  // Fetch the note based on the ID
  useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:5000/api/notes/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setNote({ ...response.data, tags: response.data.tags.join(", ") });
      } catch (err) {
        console.error("Error fetching note:", err);
        setError("Failed to fetch note. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  // Handle form submission to update the note
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    setSuccess(null); // Reset success state

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/notes/${id}`,
        { ...note, tags: note.tags.split(",").map((tag) => tag.trim()) },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess("Note updated successfully!"); // Set success message
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      console.error("Error updating note:", err);
      setError("Failed to update note. Please try again.");
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

  // Main rendering of the update note form
  return (
    <Box p={5} borderRadius="md" color="white" bg="gray.800">
      <Heading size="lg" mb={4}>
        Update Note
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
          <RichTextEditor
            value={note.content}
            onChange={(content) => setNote({ ...note, content })}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="whiteAlpha.800">Category</FormLabel>
          <Select
            value={note.category}
            onChange={(e) => setNote({ ...note, category: e.target.value })}
            placeholder="Select category"
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
          Update Note
        </Button>
      </VStack>
    </Box>
  );
};

export default UpdateNote;
