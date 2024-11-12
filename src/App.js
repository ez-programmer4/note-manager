import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import { ChakraProvider } from "@chakra-ui/react"; // Import ChakraProvider
import theme from "./theme"; // Import your custom theme
import { useColorMode, IconButton } from "@chakra-ui/react"; // Correct import
import { MoonIcon, SunIcon } from "@chakra-ui/icons"; // Import icons for the toggle
import Navbar from "./components/Navbar";

import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CreateNote from "./components/CreateNote"; // Correct spelling
import UpdateNote from "./components/UpdateNote"; // Component for editing notes
import NoteList from "./components/NoteList"; // Component for displaying notes
import HomePage from "./components/HomePage"; // Import the HomePage component

const App = () => {
  const { colorMode, toggleColorMode } = useColorMode(); // Correctly use useColorMode

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Home page route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notelist" element={<NoteList />} />
          <Route path="/add" element={<CreateNote />} />
          <Route path="/edit/:id" element={<UpdateNote />} />
        </Routes>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
