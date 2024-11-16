import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Flex, Spacer, Heading } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext"; // Import the Auth context

const Navbar = () => {
  const { accessToken, logout } = useAuth(); // Destructure auth from useAuth
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate("/"); // Redirect to homepage after logout
  };

  const isLoggedIn = Boolean(accessToken); // Check if the user is logged in

  return (
    <Box p={4} bg="teal.500">
      {" "}
      {/* Set background color */}
      <Flex alignItems="center">
        <Heading size="md" color="white" mr={8}>
          Note Manager
        </Heading>
        <Spacer />
        {!isLoggedIn ? (
          <>
            <Link to="/login">
              <Button colorScheme="teal" variant="outline" mr={4} size="md">
                {" "}
                {/* Standardize button size */}
                Log In
              </Button>
            </Link>
            <Link to="/register">
              <Button colorScheme="teal" variant="solid" size="md">
                {" "}
                {/* Standardize button size */}
                Register
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={handleLogout}
              size="md"
            >
              {" "}
              {/* Standardize button size */}
              Logout
            </Button>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
