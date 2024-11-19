import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";
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
    const pdfContent = document.createElement("div");
    pdfContent.style.padding = "20px"; // Increased padding for better spacing
    pdfContent.style.backgroundColor = "#333"; // Match the background
    pdfContent.style.color = "#fff"; // Match the text color
    pdfContent.style.fontFamily = "Arial, sans-serif"; // Set a readable font
    pdfContent.style.fontSize = "14px"; // Set a base font size
    pdfContent.style.lineHeight = "1.5"; // Improve line height for readability

    pdfContent.innerHTML = `
      <h2 style="color: white; text-align: left; font-size:50px;">${
        note.title
      }</h2>
      <p style="color: white; margin-top:25px;"><strong>Content:</strong></p>
      <div style="color: white; text-align: left; margin-bottom: 20px; font-size:35px;">${
        note.content
      }</div>
      <p style="color: white; font-size:25px;"><strong>Category:</strong> ${
        note.category
      }</p>
      <p style="color: white; font-size:25px;"><strong>Tags:</strong> ${
        Array.isArray(note.tags) ? note.tags.join(", ") : "No tags"
      }</p>
    `;

    document.body.appendChild(pdfContent); // Append to body for rendering

    try {
      const canvas = await html2canvas(pdfContent, { useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 190; // Adjust width as needed
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`${note.title}.pdf`);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Failed to export PDF. Please check the console for details.");
    } finally {
      document.body.removeChild(pdfContent); // Clean up after rendering
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
      <VStack mt={4} spacing={4} align="stretch" width="100%">
        {" "}
        {/* Use VStack to stack buttons vertically */}
        <Button
          colorScheme="blue"
          onClick={handleEdit}
          leftIcon={<EditIcon />}
          width="100%" // Make button full width
        >
          Edit
        </Button>
        <Button
          colorScheme="green"
          onClick={exportToPDF}
          leftIcon={<DownloadIcon />}
          width="100%" // Make button full width
        >
          Export to PDF
        </Button>
        <Button
          colorScheme="gray"
          onClick={onClose}
          leftIcon={<CloseIcon />}
          width="100%" // Make button full width
        >
          Close
        </Button>
      </VStack>
    </Box>
  );
};

export default NoteDetail;
