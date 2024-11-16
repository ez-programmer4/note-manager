import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  Alert,
  AlertIcon,
  VStack,
  useToast,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://note-manager-backend-1.onrender.com/api/users/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      login(response.data.accessToken);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Sign in failed");
      toast({
        title: "Error signing in.",
        description:
          error.response?.data?.message ||
          "Please check your username and password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      p={5}
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        p={8}
        borderRadius="md"
        boxShadow="lg"
        bg="gray.800"
        width={{ base: "90%", sm: "400px" }}
      >
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          <Heading textAlign="center" color="white">
            Log In
          </Heading>
          {error && (
            <Alert status="error" mt={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}
          <FormControl isRequired>
            <FormLabel color="whiteAlpha.800">Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              variant="outline"
              bg="gray.700"
              color="white"
              borderColor="whiteAlpha.600"
              _placeholder={{ color: "whiteAlpha.600" }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel color="whiteAlpha.800">Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                variant="outline"
                bg="gray.700"
                color="white"
                borderColor="whiteAlpha.600"
                _placeholder={{ color: "whiteAlpha.600" }}
              />
              <InputRightElement>
                <Button
                  variant="link"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            mt={4}
            colorScheme="blue"
            type="submit"
            width="full"
            isLoading={loading}
          >
            Log In
          </Button>
        </VStack>
        <Text mt={4} textAlign="center" color="whiteAlpha.800">
          Don't have an account?{" "}
          <Button variant="link" colorScheme="blue" as={Link} to="/register">
            Sign Up
          </Button>
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
