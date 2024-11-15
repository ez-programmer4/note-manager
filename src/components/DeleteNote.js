import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteNote = ({ noteId, setNotes, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure(); // Manage alert dialog state

  const handleDelete = async () => {
    setLoading(true);
    setError(null); // Reset error state

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
      navigate("/dashboard"); // Redirect to the dashboard after deletion
    } catch (err) {
      console.error("Error deleting note:", err);
      setError("Failed to delete note. Please try again.");
    } finally {
      setLoading(false);
      onClose(); // Close the dialog after the operation
    }
  };

  // Open the dialog when the component mounts and noteId is set
  React.useEffect(() => {
    if (noteId) {
      onOpen();
    }
  }, [noteId, onOpen]);

  return (
    <Box>
      {/* Show error alert if there's an error */}
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon /> {error}
        </Alert>
      )}

      {/* Confirmation Alert Dialog */}
      <AlertDialog isOpen={isOpen} onClose={onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Delete
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this note? This action cannot to
              be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                colorScheme="red"
                onClick={handleDelete}
                ml={3}
                isLoading={loading}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default DeleteNote;
