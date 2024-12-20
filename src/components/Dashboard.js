// src/components/Dashboard.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Heading,
  VStack,
  Alert,
  AlertIcon,
  useColorMode,
} from "@chakra-ui/react";
import NoteList from "./NoteList";
import Footer from "./Footer"; // Import the Footer component

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const fetchNotes = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://note-manager-backend-1.onrender.com/api/notes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setError(error.response?.data?.message || "Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Box
      p={5}
      minH="100vh"
      bg={colorMode === "dark" ? "gray.800" : "white"}
      color={colorMode === "dark" ? "white" : "gray.800"}
    >
      <VStack spacing={4} align="start" flexGrow={1}>
        <Heading size="lg" color="teal.500">
          Dashboard
        </Heading>
        <Button
          as={Link}
          to="/add"
          colorScheme="teal"
          mb={4}
          display={{ base: "none", md: "inline-flex" }} // Hide on mobile, show on medium and larger screens
        >
          Create Note
        </Button>
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        {loading ? (
          <Box color={colorMode === "dark" ? "white" : "black"}>
            Loading notes...
          </Box>
        ) : (
          <NoteList notes={notes} setNotes={setNotes} />
        )}
      </VStack>
      <Footer /> {/* Add the Footer component here */}
    </Box>
  );
};

export default Dashboard;
