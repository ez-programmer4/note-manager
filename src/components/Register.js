import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Alert,
  AlertIcon,
  VStack,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();
  const toast = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Start loading

    try {
      await axios.post(
        "https://note-manager-backend-1.onrender.com/api/users/register", // Ensure the correct endpoint
        { username, password }
      );
      toast({
        title: "Registration successful.",
        description: "You can now log in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      setError(message); // Set specific error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bgGradient="linear(to-r, teal.500, blue.500)"
      p={6}
    >
      <Box
        maxW="md"
        bg="white"
        borderRadius="lg"
        boxShadow="lg"
        p={8}
        textAlign="center"
      >
        <Heading mb={6} color="teal.600">
          Register
        </Heading>
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        <form onSubmit={handleRegister}>
          <VStack spacing={4} align="stretch">
            <FormControl isInvalid={!username && error}>
              <FormLabel color="gray.600">Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
                required
                bg="gray.50"
                _hover={{ bg: "gray.100" }}
                _focus={{
                  bg: "white",
                  borderColor: "teal.400",
                  boxShadow: "md",
                }}
              />
            </FormControl>
            <FormControl isInvalid={!password && error}>
              <FormLabel color="gray.600">Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
                bg="gray.50"
                _hover={{ bg: "gray.100" }}
                _focus={{
                  bg: "white",
                  borderColor: "teal.400",
                  boxShadow: "md",
                }}
              />
            </FormControl>
            <Button
              colorScheme="teal"
              type="submit"
              width="full"
              isLoading={loading}
            >
              {loading ? <Spinner size="sm" /> : "Register"}
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
