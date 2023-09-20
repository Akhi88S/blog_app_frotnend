import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Container,
  Divider,
  Grid,
  GridItem,
  IconButton,
  Stack,
  Wrap,
  WrapItem,
  Button,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link as routerLink, useParams } from "react-router-dom";
import { db } from "../../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { AiOutlineRollback } from "react-icons/ai";
import { ROOT } from "../../lib/routes";
import Navbar from "./Navbar";
import Newpost from "../posts/NewPost";
import { useGetPosts } from "../../hooks/useGetPosts";
import { useDeletePost } from "../../hooks/posts";

function CurrentPost() {
  const { postId } = useParams();
  const [currentPost, setCurrentPost] = useState([]);
  const [showUpdateBox, setShowUpdateBox] = useState(false);
  const { postData, isLoading } = useGetPosts(postId, setCurrentPost);
  const { deletePost } = useDeletePost(postId);

  useEffect(() => {
    setCurrentPost({ ...postData });
  }, [postData]);

  const handleEditClick = () => {
    setShowUpdateBox(true);
  };

  const handleDeleteClick = () => {
    deletePost(postId);
  };
  const onModalClose = () => {
    setShowUpdateBox(false);
  };
  if (isLoading)
    return (
      <Container height="100vh" p="12">
        <Box pos="absolute" top="50%" left="50%">
          <Spinner size="xl" />
        </Box>
      </Container>
    );

  return (
    <>
      <Navbar />
      {/* Modal */}
      <Modal
        closeOnOverlayClick={true}
        isOpen={showUpdateBox}
        onClose={onModalClose}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={12}>
            <Newpost
              onModalClose={onModalClose}
              isEdit={true}
              formData={currentPost}
              setCurrentPost={setCurrentPost}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Modal end */}

      <motion.div layout>
        <Container maxW={"7xl"} p="12">
          <motion.button
            whileHover={{
              scale: 1.2,
              transition: { duration: 1 },
            }}
            whileTap={{ scale: 0.9 }}
          >
            <IconButton
              colorScheme="#319594"
              as={routerLink}
              to={ROOT}
              size="lg"
              icon={<AiOutlineRollback />}
              isRound
              variant="ghost"
            />
          </motion.button>
          <Flex justifyContent="flex-end" alignItems="flex-end">
            <Stack direction="column">
              <Wrap spacing={4}>
                <WrapItem>
                  <Button colorScheme="blue" onClick={handleEditClick}>
                    Edit
                  </Button>
                </WrapItem>
                <WrapItem>
                  <Link
                    textDecoration="none"
                    _hover={{ textDecoration: "none" }}
                    as={routerLink}
                    to={`/`}
                  >
                    <Button colorScheme="red" onClick={handleDeleteClick}>
                      Delete
                    </Button>
                  </Link>
                </WrapItem>
              </Wrap>
            </Stack>
          </Flex>
          <Heading as="h2">{currentPost.title}</Heading>

          <Divider marginTop="5" />
          <Grid
            templateColumns="repeat(auto-fill, minmax(100%, 1fr))"
            gap={6}
            marginTop="5"
          >
            <GridItem>
              <Box w="100%">
                <Box borderRadius="lg" overflow="hidden">
                  <Link
                    textDecoration="none"
                    _hover={{ textDecoration: "none" }}
                  >
                    <Image
                      transform="scale(1.0)"
                      src={currentPost.imageUrl}
                      alt="blog image here"
                      width="100%"
                      height={"60vh"}
                      objectFit="cover"
                      transition="0.3s ease-in-out"
                      _hover={{
                        transform: "scale(1.05)",
                      }}
                    />
                  </Link>
                </Box>
                <Text as="p" fontSize="md" marginTop="2">
                  {currentPost.desc}
                </Text>
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </motion.div>
    </>
  );
}

export default CurrentPost;
