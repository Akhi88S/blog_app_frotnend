import {
  Box,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Text,
  Wrap,
  WrapItem,
  Center,
} from "@chakra-ui/react";
import { motion, LayoutGroup } from "framer-motion";
import React from "react";
import { usePosts } from "../../hooks/posts";
import { useGetPosts } from "../../hooks/useGetPosts";
import SinglePost from "../posts/SinglePost";
import { useUser } from "../../hooks/user";
export default function PostList() {
  const { posts, isLoading } = useGetPosts();
  if (isLoading)
    return (
      <Container height="100vh" p="12">
        <Box pos="absolute" top="50%" left="50%">
          <Spinner size="xl" />
        </Box>
      </Container>
    );

  return (
    <Container maxW={"7xl"} p="12">
      <Heading as="h2" marginTop="5">
        Trending Blogs
      </Heading>
      <Divider marginTop="5" />
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
    </Container>
  );
}
