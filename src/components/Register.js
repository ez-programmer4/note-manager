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
} from "@chakra-ui/react";
import axios from "axios"; // Import axios for API calls

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // Update the API call to the local URL
      await axios.post("http://localhost:5000/api/users/register", {
        username,
        password,
      });
      alert("Registration successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <Heading mb={4}>Register</Heading>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <form onSubmit={handleRegister}>
        <FormControl mb={4}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        <Button colorScheme="teal" type="submit" width="full">
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
