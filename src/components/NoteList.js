import React, { useEffect, useState, useRef } from "react";
import { getNotes } from "../api";
import {
  Box,
  Alert,
  AlertIcon,
  Heading,
  Grid,
  GridItem,
  Input,
  HStack,
  useDisclosure,
  Spinner,
  Tooltip,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  AddIcon,
  HamburgerIcon,
  SearchIcon,
  EditIcon,
  DeleteIcon,
  ViewIcon,
  ExternalLinkIcon,
  ArrowUpIcon,
  CalendarIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import { motion } from "framer-motion";
import NoteDetail from "./NoteDetail";
import DeleteNote from "./DeleteNote";

// Star Icons
const StarOutlineIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width="20"
    height="20"
    {...props}
  >
    <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-9.19-.1L12 2 10.19 9.14 1 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const StarIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="20"
    height="20"
    {...props}
  >
    <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-9.19-.1L12 2 10.19 9.14 1 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

// Note List Component
const NoteList = ({ token }) => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("title");
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [heading, setHeading] = useState("Your Notes");
  const [selectedFilter, setSelectedFilter] = useState("Sort by Title");
  const [searchVisible, setSearchVisible] = useState(false);
  const [showAddIcon, setShowAddIcon] = useState(true); // State to manage visibility of the add icon
  const navigate = useNavigate();
  const noteDetailRef = useRef(null);
  const footerRef = useRef(null); // Reference for the footer

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await getNotes();
      setNotes(response.data);
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      } else {
        setError("Failed to fetch notes.");
        console.error("Failed to fetch notes:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [token]);

  // Scroll event listener to manage the visibility of the Add Icon
  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        const footerPosition = footerRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        setShowAddIcon(footerPosition > windowHeight); // Hide if the footer is visible
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleEdit = (noteId) => {
    navigate(`/edit/${noteId}`);
  };

  const handleDelete = (id) => {
    setSelectedNoteId(id);
  };

  const handleShowDetails = (note) => {
    setSelectedNote(note);
    setShowFilters(false);
    setHeading(note.title);
  };

  const handleShareNote = (note) => {
    if (navigator.share) {
      navigator
        .share({
          title: note.title,
          text: note.content,
          url: `${window.location.href}/notes/${note._id}`,
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Share is not supported in this browser.");
    }
  };

  const toggleFavorite = async (noteId) => {
    const note = notes.find((n) => n._id === noteId);
    if (!note) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://note-manager-backend-1.onrender.com/api/notes/${noteId}/favorite`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to update favorite status");

      const updatedNote = await response.json();
      setNotes((prevNotes) =>
        prevNotes.map((n) => (n._id === noteId ? updatedNote : n))
      );
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedNotes = filteredNotes.sort((a, b) => {
    switch (sortOrder) {
      case "title":
        return a.title.localeCompare(b.title);
      case "date":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "modified":
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      default:
        return 0;
    }
  });

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const truncateContent = (content, maxLength = 100) => {
    const plainText = stripHtml(content);
    return plainText.length > maxLength
      ? `${plainText.substring(0, maxLength)}...`
      : plainText;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box
      p={5}
      borderRadius="md"
      color="white"
      width="100%"
      position="relative"
      bg="gray.800"
      overflow="hidden"
    >
      <Heading
        size="lg"
        mb={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {heading}
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<HamburgerIcon />}
            aria-label="Menu"
            variant="outline"
            colorScheme="teal"
            position="absolute"
            top={4}
            right={4}
            bg="white"
          />
          <MenuList bg="white" borderColor="gray.700">
            <MenuItem
              onClick={() => {
                setSortOrder("title");
                setSelectedFilter("Sort by Title");
              }}
              color="black"
              icon={<ArrowUpIcon />}
            >
              Sort by Title
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSortOrder("date");
                setSelectedFilter("Sort by Creation Date");
              }}
              color="black"
              icon={<CalendarIcon />}
            >
              Sort by Creation Date
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSortOrder("modified");
                setSelectedFilter("Sort by Last Modified Date");
              }}
              color="black"
              icon={<TimeIcon />}
            >
              Sort by Last Modified Date
            </MenuItem>
          </MenuList>
        </Menu>
      </Heading>

      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon /> {error}
        </Alert>
      )}

      {loading ? (
        <Spinner size="xl" color="teal.500" />
      ) : (
        <>
          {showFilters && (
            <HStack
              mb={4}
              spacing={4}
              width="100%"
              bg="black"
              p={2}
              borderRadius="md"
            >
              <IconButton
                icon={<SearchIcon />}
                aria-label="Search"
                onClick={() => setSearchVisible((prev) => !prev)}
                display={{ base: "flex", md: "none" }}
                color="white"
              />
              <Input
                placeholder="Search by title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                bg="gray.700"
                color="white"
                borderColor="whiteAlpha.600"
                _placeholder={{ color: "whiteAlpha.600" }}
                flex={{ base: searchVisible ? "1" : "0", md: "auto" }}
                transition="all 0.3s"
                mt={searchVisible ? 2 : 0}
                display={{
                  base: searchVisible ? "block" : "none",
                  md: "block",
                }}
                size={searchVisible ? "lg" : "md"}
              />
              <Text color="white" ml={2}>
                {selectedFilter}
              </Text>
            </HStack>
          )}

          {selectedNote ? (
            <NoteDetail
              note={selectedNote}
              ref={noteDetailRef}
              onClose={() => {
                setSelectedNote(null);
                setShowFilters(true);
                setHeading("Your Notes");
              }}
            />
          ) : (
            <>
              {sortedNotes.length === 0 ? (
                <Alert status="info" width="100%">
                  <AlertIcon />
                  No notes found.
                </Alert>
              ) : (
                <Grid
                  templateColumns={{
                    base: "1fr",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                  }}
                  gap={4}
                >
                  {sortedNotes.map((note) => (
                    <GridItem
                      id={`note-${note._id}`}
                      p={4}
                      borderWidth="1px"
                      borderRadius="md"
                      bg="gray.700"
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                      overflow="hidden"
                      key={note._id}
                    >
                      <Box position="relative">
                        <Box
                          position="absolute"
                          top={2}
                          right={2}
                          color="gray.400"
                          fontSize="sm"
                        >
                          {formatDate(note.createdAt)}
                        </Box>
                        <Heading size="sm" isTruncated>
                          {note.title}
                        </Heading>
                        <Box>
                          <small>Category: {note.category}</small> <br />
                          <small>
                            Tags:{" "}
                            {Array.isArray(note.tags)
                              ? note.tags.join(", ")
                              : "No tags"}
                          </small>
                        </Box>
                        <Box mt={2} color="gray.300" isTruncated>
                          {truncateContent(note.content)}
                        </Box>
                      </Box>
                      <HStack spacing={2} mt={4} alignItems="center">
                        <Tooltip
                          label="Toggle Favorite"
                          aria-label="Toggle Favorite"
                        >
                          <motion.div whileTap={{ scale: 1.2 }}>
                            <IconButton
                              icon={
                                note.favorite ? (
                                  <StarIcon />
                                ) : (
                                  <StarOutlineIcon />
                                )
                              }
                              colorScheme={note.favorite ? "yellow" : "gray"}
                              onClick={() => toggleFavorite(note._id)}
                              aria-label="Favorite"
                              size="sm"
                            />
                          </motion.div>
                        </Tooltip>
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            icon={<HamburgerIcon />}
                            aria-label="Options"
                            bg="white"
                          />
                          <MenuList bg="white" borderColor="gray.700">
                            <MenuItem
                              onClick={() => handleShowDetails(note)}
                              color="black"
                              icon={<ViewIcon />}
                            >
                              View Details
                            </MenuItem>
                            <MenuItem
                              onClick={() => handleEdit(note._id)}
                              color="black"
                              icon={<EditIcon />}
                            >
                              Edit
                            </MenuItem>
                            <MenuItem
                              onClick={() => handleShareNote(note)}
                              color="black"
                              icon={<ExternalLinkIcon />}
                            >
                              Share
                            </MenuItem>
                            <MenuItem
                              onClick={() => handleDelete(note._id)}
                              color="black"
                              icon={<DeleteIcon />}
                            >
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </HStack>
                    </GridItem>
                  ))}
                </Grid>
              )}
            </>
          )}
        </>
      )}

      {selectedNoteId && (
        <DeleteNote
          noteId={selectedNoteId}
          setNotes={setNotes}
          onCancel={() => setSelectedNoteId(null)}
        />
      )}

      <Box ref={footerRef} as="footer" mt={10} padding={4}>
        {/* Footer Content */}
      </Box>

      <IconButton
        icon={<AddIcon />}
        zIndex={10}
        colorScheme="teal"
        aria-label="Create Note"
        position="fixed"
        bottom={4}
        right={4}
        onClick={() => navigate("/add")}
        size="lg"
        borderRadius="full"
        boxShadow="lg"
        _hover={{ boxShadow: "xl" }}
        display={showAddIcon ? { base: "flex", md: "none" } : "none"} // Toggle visibility based on state
      />
    </Box>
  );
};

export default NoteList;
