import React from "react";
import { Box, Heading, Text, Button, VStack, Divider } from "@chakra-ui/react";
import { CloseIcon, EditIcon, DownloadIcon } from "@chakra-ui/icons";
import ShareNote from "./ShareNote";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const NoteDetail = ({ note, onClose }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${note._id}`);
  };

  const exportToPDF = async () => {
    const element = document.getElementById(`note-detail-${note._id}`);
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`${note.title}.pdf`);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Failed to export PDF. Please check the console for details.");
    }
  };

  return (
    <Box
      id={`note-detail-${note._id}`}
      p={6}
      bg="gray.700"
      borderRadius="md"
      boxShadow="lg"
      marginTop={10}
      maxW="600px"
      mx="auto"
    >
      <Heading size="lg" mb={4} color="white">
        Note Details
      </Heading>
      <VStack spacing={4} align="start">
        <Text fontSize="lg" fontWeight="bold" color="white">
          <strong>Title:</strong> {note.title}
        </Text>
        <Divider borderColor="whiteAlpha.300" />
        <Text fontSize="md" color="white">
          <strong>Content:</strong>
        </Text>
        <Box
          dangerouslySetInnerHTML={{ __html: note.content }}
          mb={4}
          fontSize="md"
          lineHeight="1.5"
          color="gray.300"
          maxH="300px"
          overflowY="auto"
          whiteSpace="pre-wrap"
          wordBreak="break-word"
        />
        <Divider borderColor="whiteAlpha.300" />
        <Text fontSize="md" color="white">
          <strong>Category:</strong> {note.category}
        </Text>
        <Text fontSize="md" color="white">
          <strong>Tags:</strong>{" "}
          {Array.isArray(note.tags) ? note.tags.join(", ") : "No tags"}
        </Text>
      </VStack>
      <ShareNote noteId={note._id} />
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button
          colorScheme="blue"
          onClick={handleEdit}
          leftIcon={<EditIcon />}
          mr={2}
        >
          Edit
        </Button>
        <Button
          colorScheme="green"
          onClick={exportToPDF}
          leftIcon={<DownloadIcon />}
          mr={2}
        >
          Export to PDF
        </Button>
        <Button colorScheme="gray" onClick={onClose} leftIcon={<CloseIcon />}>
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default NoteDetail;
