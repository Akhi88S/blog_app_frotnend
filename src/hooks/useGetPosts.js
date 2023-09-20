import { useEffect, useState } from "react";
import axios from "axios";
import { newPostObs, setNewPost } from "../utils/utils";
const BASE_URL = "http://127.0.0.1:3000";
const getPosts = (id) => {
  return axios
    .get(`${BASE_URL}/post/get${id ? `?id=${id}` : ""}`)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((err) => {
      return [];
    });
};
export function useGetPosts(id = null, setCurrentPost) {
  const [posts, setPosts] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    console.log("posts before", id);
    setLoading(true);

    function callGetPosts() {
      getPosts(id)
        .then((res) => {
          console.log("posts", res);
          if (id) setCurrentPost(res);
          else setPosts(res);
          setLoading(false);
        })
        .catch((err) => {
          if (id) setCurrentPost({});
          else setPosts([]);
          setLoading(false);
        });
    }
    callGetPosts();
    const obs = newPostObs?.subscribe((data) => {
      if (data) {
        callGetPosts();
        setNewPost(false);
      }
    });
    return () => {
      obs?.unsubscribe();
    };
  }, [id]);

  return { posts, isLoading };
}
