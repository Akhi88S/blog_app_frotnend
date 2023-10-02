import { useToast } from "@chakra-ui/react";
import { uuidv4 } from "@firebase/util";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../lib/firebase";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import axios from "axios";
import { useGetPosts } from "./useGetPosts";
import { setNewPost } from "../utils/utils";

const BASE_URL = "http://localhost:3000";

export function useAddUpdatePost() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function addUpdatePost(post) {
    setLoading(true);
    if (post?.isEdit) {
      await axios.patch(`${BASE_URL}/post/update?id=${post?.id}`, {
        ...post,
        date: Date.now(),
        likes: post?.likes || [],
      });
    } else {
      await axios.post(`${BASE_URL}/post/add`, {
        ...post,
        date: Date.now(),
        likes: [],
      });
      setNewPost(true);
    }
    toast({
      title: `${
        post?.isEdit ? "Post updated successfully!" : "Post added successfully!"
      }`,
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });
    setLoading(false);
  }

  return { addUpdatePost, isLoading };
}

export function usePosts(uid = null) {
  const q = uid
    ? query(
        collection(db, "posts"),
        orderBy("date", "desc"),
        where("uid", "==", uid)
      )
    : query(collection(db, "posts"), orderBy("date", "desc"));
  const [posts, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  console.log("posts", posts, isLoading);
  return { posts, isLoading };
}

export function useToggleLike({ id, isLiked, uid, post, setIsLiked }) {
  const [isLoading, setLoading] = useState(false);

  async function toggleLike() {
    setLoading(true);
    await axios.patch(`${BASE_URL}/post/update?id=${id}`, {
      ...post,
      likes: !isLiked
        ? [...post?.likes, uid]
        : post?.likes.filter((item) => item !== uid),
    });

    setLoading(false);
    setIsLiked((prev) => !prev);
    setNewPost(true);
  }

  return { toggleLike, isLoading };
}

export function useDeletePost(id) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function deletePost() {
    const res = window.confirm("Are you sure you want to delete this post?");

    if (res) {
      setLoading(true);

      console.log("deleted res", res, id);
      await axios
        .delete(`${BASE_URL}/post/delete?id=${id}`)
        .then((data) => {
          console.log("deleted res", data);
        })
        .catch((err) => {
          console.error(err);
        });
      toast({
        title: "Post deleted!",
        status: "info",
        isClosable: true,
        position: "top",
        duration: 5000,
      });

      setLoading(false);
    }
  }

  return { deletePost, isLoading };
}
