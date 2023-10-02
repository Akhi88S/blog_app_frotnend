import { Container, Divider, Heading, Input } from "@chakra-ui/react";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import PostList from "./postList.component";
export default function RootPostList() {
  const [searchValue, setSearchValue] = useState("");
  const timerRef = useRef(null);
  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);
  const searchHandler = (val) => {
    timerRef.current && clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setSearchValue(val);
    }, 500);
  };

  return (
    <Container maxW={"7xl"} p="12">
      <Heading as="h2" marginTop="5">
        Trending Blogs
      </Heading>
      <br></br>
      <Input
        type="text"
        placeholder="Search..."
        onChange={(e) => searchHandler(e.target.value)}
      />

      <Divider marginTop="5" />
      <PostList searchValue={searchValue} />
    </Container>
  );
}
