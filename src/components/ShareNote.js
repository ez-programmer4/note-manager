// src/components/ShareNote.js

import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

const ShareNote = ({ noteId, isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleShare = async () => {
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `https://note-manager-backend-1.onrender.com/api/notes/${noteId}/share`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if needed
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) throw new Error("Failed to share note");

      setSuccess("Note shared successfully!");
      setEmail(""); // Clear the input
      setTimeout(onClose, 2000); // Automatically close after 2 seconds
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Share Note</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Share with Email</FormLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </FormControl>
          {error && (
            <Alert status="error" mt={2}>
              <AlertIcon />
              {error}
            </Alert>
          )}
          {success && (
            <Alert status="success" mt={2}>
              <AlertIcon />
              {success}
            </Alert>
          )}
          <Button mt={4} onClick={handleShare}>
            Share Note
          </Button>
          <Button mt={4} ml={2} onClick={onClose}>
            Cancel
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ShareNote;
