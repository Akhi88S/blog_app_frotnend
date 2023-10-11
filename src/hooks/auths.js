import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth, db } from "../lib/firebase";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { LOGIN, ROOT } from "../lib/routes";
import isUsernameExists from "../utils/isUsernameExists";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// This code is for fatching User data
export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleUserStorage = (evt) => {
      const userDetails = JSON.parse(
        localStorage.getItem("userDetail") || "{}"
      );
      if (userDetails?.email) {
        setUser(userDetails);
      }
    };

    handleUserStorage();
  }, [localStorage.getItem("userDetail")]);

  return { user };
}

// This code is for Login functionlity
export function useLogin() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function login({ email, password, redirectTo = ROOT }) {
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/post/login`, {
        email,
        password,
      });
      console.log("res data", res?.data?.userData);
      setToLocalStorage("userDetail", { ...res?.data?.userData });
      navigate(redirectTo);
      toast({
        title: "You are logged in",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Logging in failed",
        description: error?.response?.data?.message || "Unautorized",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return { login, isLoading };
}

// This code is for logout functionlity
export function useLogout() {
  const toast = useToast();
  const navigate = useNavigate();

  async function logout() {
    localStorage.removeItem("userDetail");
    toast({
      title: "Successfully logged out",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });
    navigate(LOGIN);
  }

  return { logout };
}

// This code is for user register functionlity
export function useRegister() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function register({
    username,
    email,
    password,
    redirectTo = DASHBOARD,
  }) {
    setLoading(true);

    const usernameExists = await isUsernameExists(username);

    if (usernameExists) {
      toast({
        title: "Username already exists",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
    } else {
      try {
        const res = await axios.post(`${BASE_URL}/user/signup`, {
          name: username,
          email,
          password,
        });

        toast({
          title: "Account created",
          description: "You are logged in",
          status: "success",
          isClosable: true,
          position: "top",
          duration: 5000,
        });

        setToLocalStorage("userDetail", {
          email,
          username,
          id: res?.data?.user?.id,
        });
        navigate(redirectTo);
      } catch (error) {
        toast({
          title: "Signing Up failed",
          description: error?.response?.data?.message,
          status: "error",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    }
  }

  return { register, isLoading };
}

export const setToLocalStorage = (key, userData) => {
  console.log("key, userdata", key);
  localStorage.setItem("userDetail", JSON.stringify(userData));
};

export const removeDataFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};
