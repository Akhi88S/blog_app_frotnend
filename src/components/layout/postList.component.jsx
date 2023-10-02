import {
  Box,
  Container,
  Grid,
  GridItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { motion, LayoutGroup } from "framer-motion";
import React from "react";
import { useGetPosts } from "../../hooks/useGetPosts";
import SinglePost from "../posts/SinglePost";

export default function PostList({ searchValue }) {
  const { posts, isLoading } = useGetPosts(null, null, searchValue);
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
      <Grid
        templateColumns="repeat(auto-fill, minmax(300px, 2fr))"
        gap={6}
        marginTop="5"
      >
        {!posts?.length ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <Text fontWeight="bold" fontSize="xl">
              No Posts At the moment
            </Text>
          </Box>
        ) : (
          <>
            {posts?.map((post) => (
              <GridItem key={post.id}>
                <motion.div layout>
                  <SinglePost post={post} />
                </motion.div>
              </GridItem>
            ))}
          </>
        )}
      </Grid>
    </>
  );
}
