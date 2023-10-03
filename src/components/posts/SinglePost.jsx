import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Avatar,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { useAuth } from "../../hooks/auths";
import { formatDistanceToNow } from "date-fns";
import { AiTwotoneHeart, AiOutlineHeart, AiFillDelete } from "react-icons/ai";
import { useDeletePost, useToggleLike } from "../../hooks/posts";
import { Link as routerLink } from "react-router-dom";

const SinglePost = ({ post }) => {
  const { user } = useAuth();
  const { id, likes, uId } = post;
  const [isLiked, setIsLiked] = useState(false);
  const { toggleLike, isLoading } = useToggleLike({
    id,
    isLiked,
    userId: user?.id,
    post,
    setIsLiked,
  });
  useEffect(() => {
    setIsLiked(likes.includes(user?.id));
  }, [post?.id,user?.id]);
  const { deletePost, isLoading: deleteLoading } = useDeletePost(id);
  return (
    <>
      <Box w="100%" key={post.id}>
        <Box borderRadius="lg" overflow="hidden">
          <Link
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
            as={routerLink}
            to={`/posts/${post?.id}`}
          >
            <Image
              transform="scale(1.0)"
              src={post.imageUrl}
              alt="some text"
              width="100%"
              objectFit="cover"
              height={"300px"}
              transition="0.3s ease-in-out"
              _hover={{
                transform: "scale(1.05)",
              }}
            />
          </Link>
        </Box>
        <Heading fontSize="xl" marginTop="2">
          <Link
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
            as={routerLink}
            to={`/posts/${post?.id}`}
          >
            {post.title}
          </Link>
        </Heading>
        <Text as="p" fontSize="md" marginTop="2">
          {post.desc.substring(0, 150)}...
        </Text>
        <Box mt={"10px"}>
          <Flex align={"center"}>
            <Avatar name={user?.name} size={"sm"} />
            <Text casing={"capitalize"}>
              <span style={{ paddingLeft: "10px" }}>
                {formatDistanceToNow(post.date)} ago
              </span>
            </Text>
            {user?.id && (
              <>
                <IconButton
                  colorScheme="red"
                  onClick={toggleLike}
                  isLoading={isLoading}
                  size="md"
                  icon={isLiked ? <AiTwotoneHeart /> : <AiOutlineHeart />}
                  isRound
                  variant="ghost"
                />
                <Text> {likes.length}</Text>
              </>
            )}
            {user?.id === uId && (
              <IconButton
                colorScheme="red"
                size="lg"
                icon={<AiFillDelete />}
                isRound
                onClick={deletePost}
                isLoading={deleteLoading}
                variant="ghost"
              />
            )}
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default SinglePost;
